import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { patients as seedPatients } from '../data/patients'
import { motion, AnimatePresence } from 'framer-motion'
import { PatientAvatar, IconHospital, IconStethoscope, IconEye, IconShield, IconHeart, IconLung, IconTherm, IconBP } from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import { doctors } from '../data/doctors'

const statusConfig = {
  critical:    { label: 'Critical',    bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500',    text: 'text-red-600',    glow: 'shadow-red-100'    },
  stable:      { label: 'Stable',      bg: 'bg-emerald-50',border: 'border-emerald-200',dot: 'bg-emerald-500',text: 'text-emerald-600',glow: 'shadow-emerald-100'},
  observation: { label: 'Observation', bg: 'bg-amber-50',  border: 'border-amber-200',  dot: 'bg-amber-400',  text: 'text-amber-600',  glow: 'shadow-amber-100'  },
}

const empty = {
  name: '', age: '', gender: 'Male', bed: '', room: '', ward: '',
  diagnosis: '', admitted: '', doctor: '', nurse: '', status: 'stable',
  vitals: { hr: '', spo2: '', temp: '', bp: '' },
}

function Field({ label, children, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all placeholder-slate-300'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [patientList, setPatientList] = useState(seedPatients)
  const [search, setSearch]           = useState('')
  const [filter, setFilter]           = useState('all')
  const [showModal, setShowModal]     = useState(false)
  const [form, setForm]               = useState(empty)
  const [errors, setErrors]           = useState({})
  const [deleteId, setDeleteId]       = useState(null)
  const [editPatient, setEditPatient] = useState(null)
  const [editForm, setEditForm]       = useState({})
  const [view, setView]               = useState('patients')  // 'patients' | 'doctors'

  const filtered = patientList.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(q) ||
                        p.diagnosis.toLowerCase().includes(q) ||
                        p.ward.toLowerCase().includes(q)
    return matchSearch && (filter === 'all' || p.status === filter)
  })

  const counts = {
    all:         patientList.length,
    critical:    patientList.filter(p => p.status === 'critical').length,
    stable:      patientList.filter(p => p.status === 'stable').length,
    observation: patientList.filter(p => p.status === 'observation').length,
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const setVital = (key, val) => setForm(f => ({ ...f, vitals: { ...f.vitals, [key]: val } }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())      e.name      = 'Required'
    if (!form.age || isNaN(form.age)) e.age = 'Enter valid age'
    if (!form.bed.trim())       e.bed       = 'Required'
    if (!form.room.trim())      e.room      = 'Required'
    if (!form.ward.trim())      e.ward      = 'Required'
    if (!form.diagnosis.trim()) e.diagnosis = 'Required'
    if (!form.admitted.trim())  e.admitted  = 'Required'
    if (!form.doctor.trim())    e.doctor    = 'Required'
    if (!form.nurse.trim())     e.nurse     = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setPatientList(prev => [{
      ...form, id: Date.now(), age: Number(form.age),
      vitals: {
        hr: form.vitals.hr || '— bpm', spo2: form.vitals.spo2 || '—%',
        temp: form.vitals.temp || '—°C', bp: form.vitals.bp || '—/—',
      },
    }, ...prev])
    setShowModal(false); setForm(empty); setErrors({})
  }

  const handleDelete = (id) => { setPatientList(prev => prev.filter(p => p.id !== id)); setDeleteId(null) }

  const openEdit = (patient) => {
    setEditPatient(patient)
    setEditForm({ name: patient.name, doctor: patient.doctor })
  }

  const saveEdit = () => {
    if (!editForm.name.trim() || !editForm.doctor.trim()) return
    setPatientList(prev => prev.map(p =>
      p.id === editPatient.id ? { ...p, name: editForm.name.trim(), doctor: editForm.doctor.trim() } : p
    ))
    setEditPatient(null)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0f2fe 50%, #f0fdf4 100%)' }}>

      {/* ── Header ── */}
      <div className="sticky top-0 z-40 glass border-b border-white/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
              <IconEye size={28} />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">EyeCare Connect</h1>
              <p className="text-xs text-slate-400">Doctor Dashboard</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-2 shadow-soft border border-white">
              <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#3B82F6"/><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#93C5FD"/></svg>
              </div>
              <span className="font-semibold text-slate-700">{user?.name || 'Dr. Sarah Khan'}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{user?.department || 'Neurology ICU'}</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              <span className="text-emerald-700 font-semibold text-sm">System Online</span>
            </div>
            <button onClick={() => { logout(); navigate('/login') }}
              className="flex items-center gap-2 bg-white/80 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 px-4 py-2 rounded-2xl text-sm font-semibold transition-all shadow-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Hero stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <IconHospital size={44}/>, label: 'Total Patients', value: patientList.length, sub: 'Currently admitted', color: 'from-blue-50 to-blue-100/50', border: 'border-blue-100' },
            { icon: <IconStethoscope size={44}/>, label: 'Critical Cases', value: counts.critical, sub: 'Need immediate care', color: 'from-red-50 to-red-100/50', border: 'border-red-100' },
            { icon: <IconEye size={44}/>, label: 'Eye Tracking', value: 'AI Active', sub: 'Powered by MediaPipe', color: 'from-indigo-50 to-indigo-100/50', border: 'border-indigo-100' },
            { icon: <IconShield size={44}/>, label: 'Under Observation', value: counts.observation, sub: 'Monitoring required', color: 'from-amber-50 to-amber-100/50', border: 'border-amber-100' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`rounded-3xl bg-gradient-to-br ${s.color} border ${s.border} p-5 shadow-soft flex items-center gap-4`}
            >
              {s.icon}
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none mb-1">{s.value}</p>
                <p className="text-sm font-bold text-slate-700">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Controls row ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 flex-wrap">
          {/* View toggle */}
          <div className="flex bg-white/80 border border-white/60 p-1 rounded-2xl shadow-soft self-start">
            {[
              { key: 'patients', label: 'Patients' },
              { key: 'doctors',  label: 'Doctors'  },
            ].map(v => (
              <button key={v.key} onClick={() => setView(v.key)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  view === v.key ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>
                {v.label}
              </button>
            ))}
          </div>

          {view === 'patients' && (
            <>
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, diagnosis or ward..."
                  className="w-full bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl pl-11 pr-5 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-soft"
                />
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {[
                  { key: 'all',         label: 'All',         count: counts.all,         active: 'bg-slate-800 text-white' },
                  { key: 'critical',    label: 'Critical',    count: counts.critical,    active: 'bg-red-500 text-white'   },
                  { key: 'stable',      label: 'Stable',      count: counts.stable,      active: 'bg-emerald-500 text-white'},
                  { key: 'observation', label: 'Watch',       count: counts.observation, active: 'bg-amber-500 text-white' },
                ].map(s => (
                  <button key={s.key} onClick={() => setFilter(s.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border transition-all shadow-soft ${
                      filter === s.key ? s.active + ' border-transparent' : 'bg-white/80 text-slate-600 border-white/60 hover:bg-white'
                    }`}>
                    <span className="font-black">{s.count}</span><span>{s.label}</span>
                  </button>
                ))}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setForm(empty); setErrors({}); setShowModal(true) }}
                  className="flex items-center gap-2 gradient-primary text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  Add Patient
                </motion.button>
              </div>
            </>
          )}
        </div>
        {/* Patient cards grid */}
        {view === 'patients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((patient, i) => {
            const s = statusConfig[patient.status]
            return (
              <motion.div key={patient.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`group relative rounded-3xl bg-white border-2 ${s.border} shadow-soft hover:shadow-float transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1`}
              >
                {/* Gradient top bar based on status */}
                <div className={`h-1.5 w-full ${patient.status === 'critical' ? 'bg-gradient-to-r from-red-400 to-red-600' : patient.status === 'stable' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} />

                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0" onClick={() => navigate(`/patient/${patient.id}`)}>
                      <PatientAvatar gender={patient.gender} size={52} />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-base leading-tight truncate">{patient.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{patient.age} yrs · {patient.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} inline-block`}></span>
                        {s.label}
                      </span>
                      <button onClick={e => { e.stopPropagation(); setDeleteId(patient.id) }}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg leading-none">×</button>
                      <button onClick={e => { e.stopPropagation(); openEdit(patient) }}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="space-y-2 mb-4" onClick={() => navigate(`/patient/${patient.id}`)}>
                    <div className="flex items-center gap-2 text-sm bg-slate-50 rounded-xl px-3 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#94A3B8" strokeWidth="2"/><path d="M3 10h18" stroke="#94A3B8" strokeWidth="2"/></svg>
                      <span className="text-slate-500 text-xs">{patient.ward} · {patient.bed} · {patient.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-slate-50 rounded-xl px-3 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span className="text-slate-700 text-xs font-medium truncate">{patient.diagnosis}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-slate-50 rounded-xl px-3 py-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#94A3B8" strokeWidth="2"/><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#94A3B8" strokeWidth="2"/></svg>
                      <span className="text-slate-500 text-xs">{patient.doctor}</span>
                    </div>
                  </div>

                  {/* Vitals strip */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100" onClick={() => navigate(`/patient/${patient.id}`)}>
                    {[[<IconHeart size={16}/>, patient.vitals.hr, 'text-red-500'], [<IconLung size={16}/>, patient.vitals.spo2, 'text-blue-500'], [<IconTherm size={16}/>, patient.vitals.temp, 'text-orange-500'], [<IconBP size={16}/>, patient.vitals.bp, 'text-purple-500']].map(([icon, val, color], j) => (
                      <div key={j} className="bg-slate-50 rounded-xl p-2 text-center">
                        <div className="flex justify-center mb-1">{icon}</div>
                        <div className={`font-bold text-[10px] leading-tight ${color}`}>{val}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                    className="mt-3 w-full gradient-primary text-white rounded-2xl py-2.5 text-sm font-bold shadow-sm hover:shadow-blue-200 transition-all"
                  >
                    Open Communication Panel →
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
        )}

        {view === 'patients' && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#CBD5E1" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <p className="font-bold text-slate-500 text-lg">No patients found</p>
            <p className="text-sm text-slate-400 mt-1">Try a different search term or add a new patient</p>
          </div>
        )}

        {/* ── Doctors grid ── */}
        {view === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {doctors.map((doc, i) => {
              const patientCount = patientList.filter(p => p.doctor === doc.name).length
              return (
                <motion.div key={doc.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-3xl border-2 border-slate-100 shadow-soft hover:shadow-float hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-indigo-500" />
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="16" r="9" fill={doc.gender === 'Female' ? '#FECACA' : '#FDB57D'}/>
                          <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" fill={doc.gender === 'Female' ? '#EC4899' : '#3B82F6'}/>
                          <rect x="20" y="12" width="8" height="3" rx="1.5" fill="white"/>
                          <rect x="22.5" y="10" width="3" height="8" rx="1.5" fill="white"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 text-base leading-tight">{doc.name}</p>
                        <p className="text-xs text-blue-600 font-semibold mt-0.5">{doc.specialty}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{doc.department}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {[
                        { icon: 'M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', label: doc.qualification },
                        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: `${doc.experience} experience` },
                        { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: doc.schedule },
                        { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: doc.phone },
                      ].map((item, j) => (
                        <div key={j} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                            <path d={item.icon} stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-xs text-slate-600 truncate">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Patient count + filter button */}
                    <button
                      onClick={() => { setView('patients'); setSearch(doc.name) }}
                      className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-100 text-blue-700 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all group"
                    >
                      <span>{patientCount} patient{patientCount !== 1 ? 's' : ''} assigned</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-3xl z-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Add New Patient</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Fill in patient details to add them to the system</p>
                </div>
                <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xl transition-all">×</button>
              </div>

              <div className="px-6 py-5 space-y-5">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Personal Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Full Name" required>
                      <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Muhammad Ali" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </Field>
                    <Field label="Age" required>
                      <input className={inputCls} type="number" min="0" max="120" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 54" />
                      {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
                    </Field>
                    <Field label="Gender">
                      <select className={inputCls} value={form.gender} onChange={e => set('gender', e.target.value)}>
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </Field>
                    <Field label="Status">
                      <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value)}>
                        <option value="stable">Stable</option><option value="critical">Critical</option><option value="observation">Observation</option>
                      </select>
                    </Field>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Hospital Location</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Field label="Bed" required>
                      <input className={inputCls} value={form.bed} onChange={e => set('bed', e.target.value)} placeholder="e.g. Bed 4" />
                      {errors.bed && <p className="text-xs text-red-500 mt-1">{errors.bed}</p>}
                    </Field>
                    <Field label="Room" required>
                      <input className={inputCls} value={form.room} onChange={e => set('room', e.target.value)} placeholder="e.g. Room 201" />
                      {errors.room && <p className="text-xs text-red-500 mt-1">{errors.room}</p>}
                    </Field>
                    <Field label="Ward" required>
                      <input className={inputCls} value={form.ward} onChange={e => set('ward', e.target.value)} placeholder="e.g. Neurology ICU" />
                      {errors.ward && <p className="text-xs text-red-500 mt-1">{errors.ward}</p>}
                    </Field>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Medical Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Diagnosis" required>
                      <input className={inputCls} value={form.diagnosis} onChange={e => set('diagnosis', e.target.value)} placeholder="e.g. Locked-in Syndrome" />
                      {errors.diagnosis && <p className="text-xs text-red-500 mt-1">{errors.diagnosis}</p>}
                    </Field>
                    <Field label="Admitted Date" required>
                      <input className={inputCls} value={form.admitted} onChange={e => set('admitted', e.target.value)} placeholder="e.g. 03 Jun 2026" />
                      {errors.admitted && <p className="text-xs text-red-500 mt-1">{errors.admitted}</p>}
                    </Field>
                    <Field label="Assigned Doctor" required>
                      <input className={inputCls} value={form.doctor} onChange={e => set('doctor', e.target.value)} placeholder="e.g. Dr. Sarah Khan" />
                      {errors.doctor && <p className="text-xs text-red-500 mt-1">{errors.doctor}</p>}
                    </Field>
                    <Field label="Assigned Nurse" required>
                      <input className={inputCls} value={form.nurse} onChange={e => set('nurse', e.target.value)} placeholder="e.g. Nurse Ayesha" />
                      {errors.nurse && <p className="text-xs text-red-500 mt-1">{errors.nurse}</p>}
                    </Field>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Initial Vitals <span className="text-slate-400 font-normal normal-case">(optional)</span></p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Field label="Heart Rate"><input className={inputCls} value={form.vitals.hr} onChange={e => setVital('hr', e.target.value)} placeholder="82 bpm" /></Field>
                    <Field label="SpO2"><input className={inputCls} value={form.vitals.spo2} onChange={e => setVital('spo2', e.target.value)} placeholder="97%" /></Field>
                    <Field label="Temperature"><input className={inputCls} value={form.vitals.temp} onChange={e => setVital('temp', e.target.value)} placeholder="37.1C" /></Field>
                    <Field label="Blood Pressure"><input className={inputCls} value={form.vitals.bp} onChange={e => setVital('bp', e.target.value)} placeholder="118/76" /></Field>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-3xl">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Cancel</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white gradient-primary shadow-lg hover:shadow-blue-200 transition-all">Add Patient</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit Patient Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {editPatient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setEditPatient(null) }}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Edit Patient</h3>
                  <p className="text-xs text-slate-400">Update patient name and assigned doctor</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Patient Name</label>
                  <input
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    value={editForm.name}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Patient full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Assigned Doctor</label>
                  <input
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    value={editForm.doctor}
                    onChange={e => setEditForm(f => ({ ...f, doctor: e.target.value }))}
                    placeholder="e.g. Dr. Sarah Khan"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditPatient(null)}
                  className="flex-1 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">
                  Cancel
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={saveEdit}
                  className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold text-white gradient-primary shadow-lg transition-all">
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h4 className="font-bold text-slate-800 text-xl mb-2">Remove Patient?</h4>
              <p className="text-sm text-slate-400 mb-6">This will remove the patient from the system. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
