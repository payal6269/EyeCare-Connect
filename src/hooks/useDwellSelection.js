import { useRef, useState, useEffect, useCallback } from 'react'

const DWELL_MS = 1500   // ms to hold gaze before triggering
const COOLDOWN_MS = 2000 // ms before same card can trigger again

export function useDwellSelection(gaze, blink, cardRefs, services, onSelect) {
  const [gazedIndex,   setGazedIndex]   = useState(-1)
  const [dwellProgress, setDwellProgress] = useState(0)

  const dwellStartRef  = useRef(null)
  const lastIndexRef   = useRef(-1)
  const triggeredRef   = useRef(false)
  const cooldownRef    = useRef(false)

  // Find which card DOM element the gaze point is over
  const findCard = useCallback((gx, gy) => {
    const px = gx * window.innerWidth
    const py = gy * window.innerHeight
    for (let i = 0; i < cardRefs.length; i++) {
      const el = cardRefs[i]
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
        return i
      }
    }
    return -1
  }, [cardRefs])

  // Track gaze position → dwell progress
  useEffect(() => {
    const idx = findCard(gaze.x, gaze.y)
    setGazedIndex(idx)

    if (idx !== lastIndexRef.current) {
      // Moved to different card — reset dwell
      lastIndexRef.current = idx
      dwellStartRef.current = idx >= 0 ? Date.now() : null
      triggeredRef.current = false
      setDwellProgress(0)
      return
    }

    if (idx >= 0 && dwellStartRef.current && !triggeredRef.current && !cooldownRef.current) {
      const elapsed  = Date.now() - dwellStartRef.current
      const progress = Math.min(elapsed / DWELL_MS, 1)
      setDwellProgress(progress)

      if (progress >= 1) {
        triggeredRef.current = true
        cooldownRef.current  = true
        onSelect(services[idx])
        setTimeout(() => {
          cooldownRef.current  = false
          triggeredRef.current = false
          dwellStartRef.current = Date.now()
          setDwellProgress(0)
        }, COOLDOWN_MS)
      }
    }
  }, [gaze, findCard, services, onSelect])

  // Blink = instant selection of gazed card
  useEffect(() => {
    if (blink && gazedIndex >= 0 && !triggeredRef.current && !cooldownRef.current) {
      triggeredRef.current = true
      cooldownRef.current  = true
      onSelect(services[gazedIndex])
      setTimeout(() => {
        cooldownRef.current  = false
        triggeredRef.current = false
      }, COOLDOWN_MS)
    }
  }, [blink, gazedIndex, services, onSelect])

  return { gazedIndex, dwellProgress }
}
