import { motion, AnimatePresence } from 'framer-motion'

export default function SelectionAlert({ service, onDismiss }) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed top-20 left-1/2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4"
          style={{ transform: 'translateX(-50%)', minWidth: 320, maxWidth: 420 }}
        >
          <div className="text-4xl">{service.emoji}</div>
          <div className="flex-1">
            <p className="font-bold text-slate-800">{service.title}</p>
            <p className="text-sm text-slate-500 mt-0.5">{service.message}</p>
            <p className="text-xs text-blue-500 mt-1 font-medium">🔊 Speaking alert to staff...</p>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
