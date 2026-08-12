import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function WebcamPanel({ tracking, blink, gaze, rawIris }) {
  const previewRef = useRef(null)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    let ms = null
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => { ms = s; setStream(s) })
      .catch(() => {})
    return () => { if (ms) ms.getTracks().forEach(t => t.stop()) }
  }, [])

  useEffect(() => {
    if (previewRef.current && stream) previewRef.current.srcObject = stream
  }, [stream])

  // Video preview dimensions
  const VW = 180, VH = 130

  // rawIris is in MediaPipe un-mirrored space (0-1).
  // The <video> is rendered scaleX(-1), so to place the dot ON the pupil
  // we must also flip X: dotX = (1 - rawIris.x) * VW
  const dotX = rawIris ? (1 - rawIris.x) * VW : VW / 2
  const dotY = rawIris ? rawIris.y * VH        : VH / 2

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-1/2 z-50 bg-white border border-slate-200 shadow-lg rounded-b-2xl overflow-hidden"
      style={{ transform: 'translateX(-50%)', width: VW }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-600">📷 Eye Cam</span>
        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
          tracking ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
        }`}>
          {tracking ? '● Live' : '◌ Init'}
        </span>
      </div>

      {/* Video + pupil overlay */}
      <div className="relative bg-black" style={{ width: VW, height: VH }}>
        <video
          ref={previewRef}
          autoPlay playsInline muted
          style={{
            width: VW,
            height: VH,
            objectFit: 'cover',
            transform: 'scaleX(-1)',   // mirror for natural feel
            display: 'block',
          }}
        />

        {/* Blink flash */}
        {blink && (
          <motion.div
            initial={{ opacity: 0.6 }} animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-cyan-400/40 pointer-events-none"
          />
        )}

        {/* Pupil dot — positioned in MIRRORED video space so it sits on the eye */}
        {tracking && rawIris && (
          <div
            style={{
              position: 'absolute',
              left: dotX,
              top:  dotY,
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: '2px solid #22d3ee',
              background: 'rgba(34,211,238,0.35)',
              boxShadow: '0 0 6px rgba(34,211,238,0.9)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Blink label */}
        <div className={`absolute bottom-1 right-1 text-xs font-bold px-1.5 py-0.5 rounded ${
          blink ? 'bg-cyan-500 text-white' : 'bg-black/40 text-slate-300'
        }`}>
          {blink ? 'BLINK' : 'open'}
        </div>
      </div>

      {/* Gaze coords */}
      {tracking && (
        <div className="px-3 py-1 text-xs text-slate-400 font-mono flex justify-between bg-white">
          <span>x {(gaze.x * 100).toFixed(0)}%</span>
          <span>y {(gaze.y * 100).toFixed(0)}%</span>
        </div>
      )}
    </motion.div>
  )
}
