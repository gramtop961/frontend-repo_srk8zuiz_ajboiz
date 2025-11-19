import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function Wizard() {
  const [soc, setSoc] = useState("qualcomm");
  const [method, setMethod] = useState("fastboot");
  const [model, setModel] = useState("");
  const [androidVersion, setAndroidVersion] = useState("15");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSteps([]);
    try {
      const res = await fetch(`${BACKEND_URL}/api/wizard/steps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soc, method, model, android_version: androidVersion }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setSteps(data.steps || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Update Guidance Wizard</h2>
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-blue-200 text-sm mb-1">SoC</label>
          <select value={soc} onChange={(e) => setSoc(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2">
            <option value="qualcomm">Qualcomm</option>
            <option value="mtk">MediaTek</option>
            <option value="exynos">Exynos</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2">
            <option value="fastboot">Fastboot</option>
            <option value="adb_sideload">ADB Sideload</option>
            <option value="odin">Odin (Samsung)</option>
            <option value="oneui_recovery">One UI Recovery</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Model</label>
          <input value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2" placeholder="e.g., Pixel 9 Pro or SM-S921B" />
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Android Version</label>
          <select value={androidVersion} onChange={(e) => setAndroidVersion(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2">
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
          </select>
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
            {loading ? "Preparing steps..." : "Generate Steps"}
          </button>
          {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
      </form>

      {steps.length > 0 && (
        <ol className="mt-6 list-decimal list-inside text-blue-100 space-y-2">
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      )}

      <p className="mt-4 text-xs text-blue-300/60">
        This wizard provides guidance only and does not execute any flashing operations.
      </p>
    </div>
  );
}
