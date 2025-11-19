import Wizard from "./components/Wizard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/flame-icon.svg"
                alt="Flames"
                className="w-24 h-24 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              />
            </div>

            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
              Flames Blue Repair Dashboard
            </h1>

            <p className="text-base md:text-lg text-blue-200 mb-2">
              Guidance for Android 14–16 on Qualcomm, MediaTek, and Exynos
            </p>
            <p className="text-sm text-blue-300/80 mb-0">
              Uses official methods only. No automated flashing is performed.
            </p>
          </div>

          <div className="space-y-6">
            <Wizard />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-blue-300/60">Use at your own risk. Follow OEM documentation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
