export default function Workflow() {
  return (
    <div className="mt-14 bg-white/5 border border-slate-800 rounded-[30px] p-8">
      <h2 className="text-3xl font-bold text-cyan-300 mb-6">
        Eye Tracking Workflow
      </h2>

      <div className="space-y-5 text-lg">
        <p>1. Webcam captures patient face and eye movement.</p>
        <p>2. AI detects iris position using MediaPipe.</p>
        <p>3. Cursor moves according to eye rotation.</p>
        <p>4. Blink or focus selection activates request.</p>
      </div>
    </div>
  )
}
