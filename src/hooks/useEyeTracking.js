import { useEffect, useRef, useState, useCallback } from 'react'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'

// Nose tip & forehead landmarks for head pose
const NOSE_TIP   = 1
const FOREHEAD   = 10
const CHIN       = 152
const LEFT_CHEEK = 234
const RIGHT_CHEEK= 454

// Eye landmarks for blink
const L_TOP = 159, L_BOT = 145, L_L = 33,  L_R = 133
const R_TOP = 386, R_BOT = 374, R_L = 362, R_R = 263

function eyeAR(lm, top, bot, l, r) {
  return Math.abs(lm[top].y - lm[bot].y) / (Math.abs(lm[l].x - lm[r].x) || 1e-6)
}

export function useEyeTracking(videoRef) {
  const [gaze,     setGaze]     = useState({ x: 0.5, y: 0.5 })
  const [rawIris,  setRawIris]  = useState({ x: 0.5, y: 0.5 })
  const [blink,    setBlink]    = useState(false)
  const [tracking, setTracking] = useState(false)

  // Calibration baseline (centre head position)
  const baselineRef = useRef(null)
  const smoothRef   = useRef({ x: 0.5, y: 0.5 })
  const blinkRef    = useRef(false)
  const frameRef    = useRef(0)

  const calibrate = useCallback((lm) => {
    baselineRef.current = {
      noseX: lm[NOSE_TIP].x,
      noseY: lm[NOSE_TIP].y,
    }
  }, [])

  const onResults = useCallback((results) => {
    if (!results.multiFaceLandmarks?.length) return
    const lm = results.multiFaceLandmarks[0]

    // Auto-calibrate on first 30 frames (average head position)
    frameRef.current++
    if (frameRef.current < 30) {
      if (frameRef.current === 1) baselineRef.current = { noseX: lm[NOSE_TIP].x, noseY: lm[NOSE_TIP].y }
      else {
        baselineRef.current.noseX = baselineRef.current.noseX * 0.9 + lm[NOSE_TIP].x * 0.1
        baselineRef.current.noseY = baselineRef.current.noseY * 0.9 + lm[NOSE_TIP].y * 0.1
      }
      return
    }

    const base = baselineRef.current
    if (!base) return

    // Head movement delta from centre
    const dx = lm[NOSE_TIP].x - base.noseX   // -ve = head moved left,  +ve = right
    const dy = lm[NOSE_TIP].y - base.noseY   // -ve = head moved up,    +ve = down

    // Sensitivity: how many units of head movement = full screen width
    const SENS_X = 0.08
    const SENS_Y = 0.06

    // Map delta to screen 0-1
    // Head moves right → cursor right → but webcam is mirrored, so flip X
    const rawX = 0.5 - (dx / SENS_X)   // flip: head right = lower x in frame = cursor right
    const rawY = 0.5 + (dy / SENS_Y)

    const screenX = Math.max(0, Math.min(1, rawX))
    const screenY = Math.max(0, Math.min(1, rawY))

    // Smooth
    const ALPHA = 0.12
    smoothRef.current = {
      x: smoothRef.current.x + ALPHA * (screenX - smoothRef.current.x),
      y: smoothRef.current.y + ALPHA * (screenY - smoothRef.current.y),
    }
    setGaze({ ...smoothRef.current })

    // Raw nose position for webcam dot (flip X for mirrored preview)
    setRawIris({ x: lm[NOSE_TIP].x, y: lm[NOSE_TIP].y })

    // Blink
    const ear = (eyeAR(lm, L_TOP, L_BOT, L_L, L_R) + eyeAR(lm, R_TOP, R_BOT, R_L, R_R)) / 2
    if (ear < 0.18 && !blinkRef.current) {
      blinkRef.current = true
      setBlink(true)
      setTimeout(() => { setBlink(false); blinkRef.current = false }, 700)
    }
  }, [])

  useEffect(() => {
    if (!videoRef?.current) return

    const faceMesh = new FaceMesh({
      locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${f}`,
    })
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: false,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    })
    faceMesh.onResults(onResults)

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) await faceMesh.send({ image: videoRef.current })
      },
      width: 640, height: 480,
    })

    camera.start().then(() => setTracking(true)).catch(console.error)

    return () => { camera.stop(); faceMesh.close(); setTracking(false) }
  }, [videoRef, onResults])

  return { gaze, rawIris, blink, tracking }
}
