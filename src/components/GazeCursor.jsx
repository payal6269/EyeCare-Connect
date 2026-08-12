import { motion } from 'framer-motion'

export default function GazeCursor({ gaze, dwellProgress, active }) {
  const x = gaze.x * window.innerWidth
  const y = gaze.y * window.innerHeight
  const r = 22
  const circ = 2 * Math.PI * r

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <motion.div
        animate={{ x: x - 30, y: y - 30 }}
        transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.4 }}
        style={{ position: 'absolute', width: 60, height: 60 }}
      >
        <svg width="60" height="60" style={{ position: 'absolute' }}>
          <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2.5" />
          <circle
            cx="30" cy="30" r={r}
            fill="none"
            stroke={active ? '#2563eb' : '#94a3b8'}
            strokeWidth="2.5"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - dwellProgress)}
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
          />
        </svg>
        <motion.div
          animate={{ scale: active ? 1.3 : 1 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 10, height: 10, borderRadius: '50%',
            background: active ? '#2563eb' : '#64748b',
            boxShadow: active ? '0 0 8px #2563eb99' : '0 0 4px rgba(0,0,0,0.2)',
          }}
        />
      </motion.div>
    </div>
  )
}
