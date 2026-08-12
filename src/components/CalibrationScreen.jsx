import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 9 calibration points spread across the screen (percent positions)
const POINTS = [
  { x: 10, y: 10 }, { x: 50, y: 10 }, { x: 90, y: 10 },
  { x: 10, y: 50 }, { x: 50, y: 50 }, { x: 90, y: 50 },
  { x: 10, y: 90 }, { x: 50, y: 90 }, { x: 90, y: 90 },
]

export default function CalibrationScreen({ onComplete }) {
  const [current, setCurrent]   = useState(0)
  const [clicks,  setClicks]    = useState(0)   // clicks per point (need 3)
  const [done,    setDone]      = useState(false)

  const needed = 3   // clicks per point before moving on

  const handleClick = () => {
    const next = clicks + 1
    setClicks(next)
    if (next >= needed) {
      if (current + 1 >= POINTS.length) {
        setDone(true)
        setTimeout(onComplete, 1200)
      } else {
        setCurrent(c => c + 1)
        setClicks(0)
      }
    }
  }

  const pt = POINTS[current]

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center"
      style={{ cursor: 'crosshair' }}
    >
      {/* Instructions */}
      <div className="absolute top-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Eye Tracking Calibration</h2>
        <p className="text-slate-300 text-sm">
          Look at each dot and <strong>click it {needed} times</strong>.&nbsp;
          Point {current + 1} of {POINTS.length}
        </p>
        {/* Progress bar */}
        <div className="mt-3 h-2 w-64 bg-slate-700 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${((current * needed + clicks) / (POINTS.length * needed)) * 100}%` }}
          />
        </div>
      </div>

      {/* Calibration dot */}
      <AnimatePresence mode="wait">
        {!done && (
          <motion.button
            key={current}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={handleClick}
            style={{
              position: 'absolute',
              left: `${pt.x}%`,
              top:  `${pt.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
          >
            {/* Outer pulse ring */}
            <span className="absolute w-10 h-10 rounded-full bg-cyan-400/30 animate-ping" />
            {/* Inner filled dot */}
            <span
              className="relative w-6 h-6 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
              style={{
                background: `conic-gradient(#22d3ee ${(clicks / needed) * 360}deg, #155e75 0deg)`,
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Done message */}
      {done && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold">Calibration Complete!</h3>
          <p className="text-slate-300 mt-2">Starting eye tracking...</p>
        </motion.div>
      )}
    </div>
  )
}
