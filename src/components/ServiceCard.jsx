import { motion } from 'framer-motion'
import { serviceIcons } from './Icons'

export default function ServiceCard({ service, isGazed, dwellProgress, onActivate }) {

  const handleClick = () => {
    window.speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(service.message)
    speech.lang = 'en-US'
    window.speechSynthesis.speak(speech)
    if (onActivate) onActivate(service)
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={{
        scale: isGazed ? 1.03 : 1,
        y: isGazed ? -4 : 0,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="relative w-full text-left rounded-3xl overflow-hidden bg-white shadow-soft hover:shadow-float transition-all duration-300"
      style={{
        border: isGazed ? `2px solid ${service.ringColor}` : '2px solid transparent',
      }}
    >
      {/* Animated gradient background overlay when gazed */}
      {isGazed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${service.ringColor}40, ${service.ringColor}10)` }}
        />
      )}

      {/* Top accent bar */}
      <div className="relative">
        <div className={`h-1.5 w-full ${service.stripe} relative overflow-hidden`}>
          {/* Dwell progress */}
          {isGazed && dwellProgress > 0 && (
            <motion.div
              className="absolute inset-0 bg-white/40"
              style={{ width: `${dwellProgress * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          )}
        </div>
      </div>

      <div className="px-6 py-5 flex items-center gap-4">
        {/* Icon with subtle animation */}
        <motion.div
          className="flex-shrink-0"
          animate={{ scale: isGazed ? 1.1 : 1, rotate: isGazed ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          {serviceIcons[service.title]}
        </motion.div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-900 text-base leading-tight mb-1">{service.title}</p>
          <p className="text-sm text-slate-500 truncate">{service.message}</p>
        </div>

        {/* Status indicator */}
        <div className="flex-shrink-0">
          {isGazed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center ${service.dotActive} shadow-sm`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" fill="currentColor" opacity="0.3"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </motion.div>
          ) : (
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Gaze pulse ring */}
      {isGazed && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl border-2 pointer-events-none"
          style={{ borderColor: service.ringColor }}
        />
      )}
    </motion.button>
  )
}
