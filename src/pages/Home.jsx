import { useRef, useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { patients } from '../data/patients'
import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard'
import WebcamPanel from '../components/WebcamPanel'
import GazeCursor from '../components/GazeCursor'
import SelectionAlert from '../components/SelectionAlert'
import { PatientAvatar, IconHeart, IconLung, IconTherm, IconBP } from '../components/Icons'
import { useEyeTracking } from '../hooks/useEyeTracking'
import { useDwellSelection } from '../hooks/useDwellSelection'

// ── Patient request buttons ───────────────────────────────────────────────────
const services = [
  { title: 'Need Water',      emoji: '💧', message: 'Patient needs water immediately.',        stripe: 'bg-blue-400',   iconBg: 'bg-blue-50',   ring: 'rgba(59,130,246,0.4)',  ringColor: '#93c5fd', dotActive: 'bg-blue-100 text-blue-500' },
  { title: 'Pain Medicine',   emoji: '💊', message: 'Patient needs pain medicine.',             stripe: 'bg-rose-400',   iconBg: 'bg-rose-50',   ring: 'rgba(244,63,94,0.4)',   ringColor: '#fda4af', dotActive: 'bg-rose-100 text-rose-500' },
  { title: 'Emergency',       emoji: '🚨', message: 'Emergency assistance needed urgently!',    stripe: 'bg-red-500',    iconBg: 'bg-red-50',    ring: 'rgba(239,68,68,0.5)',   ringColor: '#fca5a5', dotActive: 'bg-red-100 text-red-600' },
  { title: 'Call Nurse',      emoji: '👩‍⚕️', message: 'Patient is calling the nurse.',            stripe: 'bg-emerald-400',iconBg: 'bg-emerald-50',ring: 'rgba(52,211,153,0.4)',  ringColor: '#6ee7b7', dotActive: 'bg-emerald-100 text-emerald-600' },
  { title: 'Meet Family',     emoji: '👨‍👩‍👧', message: 'Patient wants to meet family.',             stripe: 'bg-violet-400', iconBg: 'bg-violet-50', ring: 'rgba(167,139,250,0.4)', ringColor: '#c4b5fd', dotActive: 'bg-violet-100 text-violet-500' },
  { title: 'Need Doctor',     emoji: '🩺', message: 'Patient needs doctor assistance.',         stripe: 'bg-orange-400', iconBg: 'bg-orange-50', ring: 'rgba(251,146,60,0.4)',  ringColor: '#fdba74', dotActive: 'bg-orange-100 text-orange-500' },
  { title: 'Feel Cold',       emoji: '🥶', message: 'Patient feels cold, needs blanket.',       stripe: 'bg-sky-400',    iconBg: 'bg-sky-50',    ring: 'rgba(56,189,248,0.4)',  ringColor: '#7dd3fc', dotActive: 'bg-sky-100 text-sky-500' },
  { title: 'Need Toilet',     emoji: '🚻', message: 'Patient needs toilet assistance.',         stripe: 'bg-teal-400',   iconBg: 'bg-teal-50',   ring: 'rgba(45,212,191,0.4)',  ringColor: '#5eead4', dotActive: 'bg-teal-100 text-teal-500' },
  { title: 'Feeling Dizzy',   emoji: '😵', message: 'Patient is feeling dizzy or nauseous.',    stripe: 'bg-yellow-400', iconBg: 'bg-yellow-50', ring: 'rgba(234,179,8,0.4)',   ringColor: '#fde047', dotActive: 'bg-yellow-100 text-yellow-600' },
  { title: 'Breathe Problem', emoji: '😮‍💨', message: 'Patient has difficulty breathing.',        stripe: 'bg-indigo-400', iconBg: 'bg-indigo-50', ring: 'rgba(99,102,241,0.4)',  ringColor: '#a5b4fc', dotActive: 'bg-indigo-100 text-indigo-500' },
  { title: 'Adjust Position', emoji: '🛏️', message: 'Patient needs position adjusted.',         stripe: 'bg-pink-400',   iconBg: 'bg-pink-50',   ring: 'rgba(236,72,153,0.4)',  ringColor: '#f9a8d4', dotActive: 'bg-pink-100 text-pink-500' },
  { title: 'Thank You',       emoji: '🙏', message: 'Patient says thank you.',                  stripe: 'bg-green-400',  iconBg: 'bg-green-50',  ring: 'rgba(74,222,128,0.4)',  ringColor: '#86efac', dotActive: 'bg-green-100 text-green-600' },
]

// ── Doctor quick-action panel ─────────────────────────────────────────────────
const doctorActions = [
  { label: 'View Vitals',      icon: '📊', color: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Add Note',         icon: '📝', color: 'bg-slate-600 hover:bg-slate-700' },
  { label: 'Call Family',      icon: '📞', color: 'bg-green-600 hover:bg-green-700' },
  { label: 'Request Scan',     icon: '🧲', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Medication Log',   icon: '💉', color: 'bg-rose-600 hover:bg-rose-700' },
  { label: 'Discharge Plan',   icon: '📋', color: 'bg-orange-600 hover:bg-orange-700' },
]

export default function Home() {
  const { id } = useParams()
  const navigate = useNavigate()
  // Find patient by id, fallback to first patient
  const patient = patients.find(p => p.id === Number(id)) || patients[0]

  const videoRef = useRef(null)
  const cardRefs = useRef(Array.from({ length: services.length }, () => null))
  const [activeAlert, setActiveAlert]         = useState(null)
  const [trackingEnabled, setTrackingEnabled] = useState(false)
  const [log, setLog]                         = useState([])
  const [activeTab, setActiveTab]             = useState('patient')
  const [toast, setToast]                     = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const eyeVideoRef = trackingEnabled ? videoRef : { current: null }
  const { gaze, rawIris, blink, tracking } = useEyeTracking(eyeVideoRef)

  const handleSelect = useCallback((service) => {
    window.speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(service.message)
    speech.lang = 'en-US'
    window.speechSynthesis.speak(speech)
    setActiveAlert(service)
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setLog(prev => [{ ...service, time }, ...prev].slice(0, 20))
  }, [])

  const { gazedIndex, dwellProgress } = useDwellSelection(
    gaze, blink, cardRefs.current, services, handleSelect
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Navbar patient={patient} onBack={() => navigate('/')} />

      {/* ── Sub-header ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {['patient', 'doctor'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'patient' ? '🛏 Patient Panel' : '👨‍⚕️ Doctor Panel'}
            </button>
          ))}
        </div>

        {/* Eye tracking toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            {!trackingEnabled && 'Head-movement control off'}
            {trackingEnabled && !tracking && '⏳ Starting camera...'}
            {trackingEnabled && tracking && '✅ Head tracking active — tilt head to move cursor, blink to select'}
          </span>
          <button
            onClick={() => setTrackingEnabled(v => !v)}
            className={`px-4 py-1.5 rounded-xl font-semibold text-sm transition-all text-white ${
              trackingEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {trackingEnabled ? '⏹ Stop Tracking' : '👁 Start Head Tracking'}
          </button>
        </div>
      </div>

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar — activity log */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 p-4 gap-3 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity Log</p>
          {log.length === 0 && (
            <p className="text-xs text-slate-300 text-center mt-4">No activity yet</p>
          )}
          {log.map((entry, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{entry.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{entry.title}</p>
                  <p className="text-xs text-slate-400">{entry.time}</p>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Center content */}
        <main className="flex-1 overflow-y-auto p-5">

          {/* ── PATIENT TAB ── */}
          {activeTab === 'patient' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-700">Patient Requests</h2>
                  <p className="text-xs text-slate-400">Click a button or use eye tracking to send a request</p>
                </div>
                {trackingEnabled && tracking && (
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600">
                    👁 Look at a card for 1.5s or blink to select
                  </div>
                )}
              </div>

              {/* Cards grid — 2 cols on md, 3 on lg, 4 on xl */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {services.map((service, i) => (
                  <div key={i} ref={el => { cardRefs.current[i] = el }}>
                    <ServiceCard
                      service={service}
                      isGazed={trackingEnabled && tracking && gazedIndex === i}
                      dwellProgress={trackingEnabled && tracking && gazedIndex === i ? dwellProgress : 0}
                      onActivate={handleSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DOCTOR TAB ── */}
          {activeTab === 'doctor' && (
            <div className="space-y-5">
              {/* Quick actions */}
              <div>
                <h2 className="text-base font-bold text-slate-700 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {doctorActions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => showToast(`${a.icon} ${a.label} — feature coming soon`)}
                      className={`${a.color} text-white rounded-xl px-4 py-3 flex items-center gap-3 font-semibold text-sm transition-all shadow-sm`}
                    >
                      <span className="text-xl">{a.icon}</span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient info card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-3 text-sm">Patient Overview</h3>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                  <PatientAvatar gender={patient.gender} size={56} />
                  <div>
                    <p className="font-bold text-slate-800 text-base">{patient.name}</p>
                    <p className="text-sm text-slate-400">{patient.age} yrs · {patient.gender} · {patient.bed}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Name',      patient.name],
                    ['Age',       `${patient.age} years`],
                    ['Diagnosis', patient.diagnosis],
                    ['Admitted',  patient.admitted],
                    ['Doctor',    patient.doctor],
                    ['Nurse',     patient.nurse],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-slate-50 rounded-xl px-3 py-2">
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="font-semibold text-slate-700">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vitals */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-3 text-sm">Last Recorded Vitals</h3>
                <div className="grid grid-cols-4 gap-3 text-center text-sm">
                  {[
                    { label: 'Heart Rate', value: patient.vitals.hr,   icon: <IconHeart size={28}/>, color: 'text-red-500'    },
                    { label: 'SpO₂',       value: patient.vitals.spo2, icon: <IconLung  size={28}/>, color: 'text-blue-500'   },
                    { label: 'Temp',       value: patient.vitals.temp, icon: <IconTherm size={28}/>, color: 'text-orange-500' },
                    { label: 'BP',         value: patient.vitals.bp,   icon: <IconBP    size={28}/>, color: 'text-purple-500' },
                  ].map(v => (
                    <div key={v.label} className="bg-slate-50 rounded-xl py-3 text-center">
                      <div className="flex justify-center mb-1">{v.icon}</div>
                      <div className={`font-bold ${v.color}`}>{v.value}</div>
                      <div className="text-xs text-slate-400">{v.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-700 mb-3 text-sm">Eye Tracking Workflow</h3>
                <div className="space-y-2">
                  {[
                    '1. Webcam captures patient face and eye movement in real time.',
                    '2. MediaPipe AI detects iris position and blink events.',
                    '3. Gaze cursor moves on screen following eye direction.',
                    '4. Hold gaze on a card for 1.5s or blink to trigger request.',
                    '5. Voice alert fires and staff are notified immediately.',
                  ].map((step, i) => (
                    <p key={i} className="text-sm text-slate-500 flex gap-2">
                      <span className="text-blue-400 font-bold flex-shrink-0">{i + 1}.</span>
                      <span>{step.slice(3)}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right sidebar — alert history / info */}
        <aside className="hidden xl:flex flex-col w-60 bg-white border-l border-slate-200 p-4 gap-4 overflow-y-auto">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">System Status</p>
            <div className="space-y-2">
              {[
                { label: 'Eye Tracking', status: trackingEnabled && tracking ? 'Active' : trackingEnabled ? 'Loading' : 'Off', ok: trackingEnabled && tracking },
                { label: 'Voice Alert',  status: 'Ready',   ok: true },
                { label: 'Camera Feed',  status: trackingEnabled ? 'On' : 'Off', ok: trackingEnabled },
                { label: 'AI Model',     status: tracking ? 'Loaded' : 'Standby', ok: tracking },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2">
                  <span className="text-slate-500">{s.label}</span>
                  <span className={`font-semibold ${s.ok ? 'text-green-600' : 'text-slate-400'}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Instructions</p>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>👁 Enable eye tracking from the top bar.</p>
              <p>🎯 Look at any card for 1.5 seconds to trigger it.</p>
              <p>😉 Blink once to instantly activate the focused card.</p>
              <p>🔊 Voice alert plays automatically for staff.</p>
              <p>🖱 Cards can also be clicked manually.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Hidden video for MediaPipe */}

      {/* Hidden video for MediaPipe head tracking */}
      <video
        ref={videoRef}
        autoPlay playsInline muted
        style={{ position: 'fixed', bottom: 0, right: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />

      {trackingEnabled && <WebcamPanel tracking={tracking} blink={blink} gaze={gaze} rawIris={rawIris} />}      {trackingEnabled && tracking && (
        <GazeCursor gaze={gaze} dwellProgress={gazedIndex >= 0 ? dwellProgress : 0} active={gazedIndex >= 0} />
      )}
      <SelectionAlert service={activeAlert} onDismiss={() => setActiveAlert(null)} />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-slate-800 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white text-lg leading-none">×</button>
        </div>
      )}
    </div>
  )
}
