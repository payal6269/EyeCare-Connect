export default function EmergencyBanner() {
  return (
    <div className="mt-14 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-[35px] p-10">
      <h2 className="text-4xl font-black mb-4">
        Smart Paralysis Patient Communication System
      </h2>

      <p className="text-xl text-slate-200">
        Patients can communicate using only eye movement and webcam-based AI tracking.
      </p>

      <button className="mt-8 bg-red-600 hover:bg-red-700 px-10 py-5 rounded-3xl text-2xl font-bold animate-pulse">
        🚨 Emergency Alert
      </button>
    </div>
  )
}
