export default function Features() {
  return (
    <div className="mt-14 bg-white/5 border border-slate-800 rounded-[30px] p-8">
      <h2 className="text-3xl font-bold text-pink-300 mb-6">
        Future AI Features
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl">🎤 Voice Alerts</div>
        <div className="bg-slate-900 p-5 rounded-2xl">📱 SMS Notifications</div>
        <div className="bg-slate-900 p-5 rounded-2xl">🧠 Emotion Detection</div>
        <div className="bg-slate-900 p-5 rounded-2xl">🏥 Nurse Dashboard</div>
      </div>
    </div>
  )
}
