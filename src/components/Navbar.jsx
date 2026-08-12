import { PatientAvatar } from './Icons'

export default function Navbar({ patient, onBack }) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: back button + logo */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-xl transition-all font-medium"
          >
            ← Back
          </button>
        )}
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg font-black shadow">
          👁
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800 leading-tight">EyeCare Connect</h1>
          <p className="text-xs text-slate-400">Patient Communication Panel</p>
        </div>
      </div>

      {/* Center: patient info */}
      {patient && (
        <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <PatientAvatar gender={patient.gender} size={36} />
            <strong className="text-slate-700">{patient.name}</strong>
            <span className="text-slate-400">· {patient.age} yrs</span>
          </div>
          <span className="text-slate-300">|</span>
          <span>{patient.bed} · {patient.room} · {patient.ward}</span>
          <span className="text-slate-300">|</span>
          <span className="text-rose-600 font-medium">{patient.diagnosis}</span>
        </div>
      )}

      {/* Right: status */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
        <span className="text-green-700 font-semibold text-sm">Monitoring Active</span>
      </div>
    </div>
  )
}
