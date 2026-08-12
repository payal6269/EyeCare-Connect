import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { patients } from '../data/patients'
import { doctors } from '../data/doctors'
import { IconEye } from '../components/Icons'

export default function Login() {
  const navigate   = useNavigate()
  const { login }  = useAuth()

  const [tab, setTab]         = useState('doctor')   // 'doctor' | 'patient'
  const [name, setName]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      if (tab === 'doctor') {
        const doctor = doctors.find(
          d => d.name.toLowerCase() === name.trim().toLowerCase() && d.password === password
        )
        if (doctor) {
          login({ name: doctor.name, role: 'doctor', specialty: doctor.specialty, department: doctor.department })
          navigate('/')
        } else {
          setError('Invalid doctor name or password.')
        }

      } else {
        // Patient login: name + admitted date as password
        const patient = patients.find(
          p => p.name.toLowerCase() === name.trim().toLowerCase() &&
               p.admitted.toLowerCase() === password.trim().toLowerCase()
        )
        if (patient) {
          login({ name: patient.name, role: 'patient', patientId: patient.id })
          navigate(`/patient/${patient.id}`)
        } else {
          setError('Patient not found. Check name and admission date.')
        }
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0f2fe 50%, #f0fdf4 100%)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 25 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <IconEye size={36} />
            </div>
            <h1 className="text-2xl font-black text-white">EyeCare Connect</h1>
            <p className="text-blue-200 text-sm mt-1">AI Eye Tracking · Patient Communication</p>
          </div>

          <div className="px-8 py-6">
            {/* Tab selector */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
              {[
                { key: 'doctor',  label: 'Doctor / Staff' },
                { key: 'patient', label: 'Patient' },
              ].map(t => (
                <button key={t.key} onClick={() => { setTab(t.key); setError(''); setName(''); setPassword('') }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    tab === t.key ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  {tab === 'doctor' ? 'Doctor Name' : 'Patient Full Name'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#94A3B8" strokeWidth="2"/>
                      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)} required
                    placeholder={tab === 'doctor' ? 'e.g. Dr. Sarah Khan' : 'e.g. Muhammad Ali'}
                    className="w-full border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all placeholder-slate-300"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  {tab === 'doctor' ? 'Password' : 'Admission Date (as password)'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="10" width="14" height="11" rx="2" stroke="#94A3B8" strokeWidth="2"/>
                      <path d="M8 10V6a4 4 0 018 0v4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder={tab === 'doctor' ? 'Enter password' : 'e.g. 28 May 2026'}
                    className="w-full border border-slate-200 rounded-2xl pl-10 pr-12 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all placeholder-slate-300"
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M10.5 10.68A3 3 0 0013.32 13.5M6.5 6.6C4.6 7.9 3 10 2 12c2 4 5.5 7 10 7 1.8 0 3.5-.5 5-1.4M9 5.1C9.9 5 10.9 5 12 5c4.5 0 8 3 10 7-.6 1.2-1.4 2.3-2.3 3.2" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 12c2-4 5.5-7 10-7s8 3 10 7c-2 4-5.5 7-10 7S4 16 2 12z" stroke="#94A3B8" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="#94A3B8" strokeWidth="1.5"/></svg>
                    }
                  </button>
                </div>
                {tab === 'patient' && (
                  <p className="text-xs text-slate-400 mt-1.5 ml-1">Enter your admission date exactly as shown (e.g. 28 May 2026)</p>
                )}
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg transition-all"
                style={{ background: loading ? '#93C5FD' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" opacity="0.3"/><path d="M12 3a9 9 0 019 9" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    Signing in...
                  </span>
                ) : `Sign In as ${tab === 'doctor' ? 'Doctor' : 'Patient'}`}
              </motion.button>
            </form>

            {/* Hint box */}
            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-600 space-y-1">
              {tab === 'doctor' ? (
                <>
                  <p className="font-bold text-blue-700 mb-2">Demo Doctor Credentials:</p>
                  {doctors.map(d => (
                    <p key={d.id}><strong>{d.name}</strong> · <span className="text-slate-500">{d.specialty}</span> · pw: <strong>{d.password}</strong></p>
                  ))}
                </>
              ) : (
                <>
                  <p className="font-bold text-blue-700 mb-1">Patient Login — use admission date as password:</p>
                  <p>Name: <strong>Muhammad Ali</strong> · Date: <strong>28 May 2026</strong></p>
                  <p>Name: <strong>Fatima Zahra</strong> · Date: <strong>01 Jun 2026</strong></p>
                  <p>Name: <strong>Ahmed Raza</strong> · Date: <strong>25 May 2026</strong></p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">EyeCare Connect · AI-Powered Patient Communication</p>
      </motion.div>
    </div>
  )
}
