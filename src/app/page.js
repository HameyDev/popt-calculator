import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center text-center px-6 pt-48 overflow-hidden">
      {/* 🌆 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/house.jpg')",
          filter: "brightness(1.1) blur(1px)", // bright background
          zIndex: -1,
        }}
      ></div>

      {/* 🖤 Light Overlay */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundColor: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* 🌟 Hero Section */}
      <div className="relative flex flex-col items-center justify-center z-10 max-w-4xl text-gray-800 animate-fadeIn mt-10">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-10 leading-tight">
          Welcome to{" "}
          <span className="text-orange-600 drop-shadow-[0_0_10px_rgba(255,140,0,0.3)]">
            POPT Calculator
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-5">
          The ultimate{" "}
          <span className="text-gray-800 font-semibold">
            Property Optimization Tool
          </span>{" "}
          — calculate, compare, and optimize insulation performance with
          precision.
        </p>
      </div>

      {/* 🧊 Enhanced Floating Info Cards */}
<div className="relative z-10 grid gap-8 mt-6 max-w-6xl w-full px-6 sm:grid-cols-2 lg:grid-cols-3">
  {/* Card — IWI */}
  <div className="group bg-white/85 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 focus-within:scale-[1.01]">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-3 bg-gradient-to-br from-orange-50 to-orange-100 ring-1 ring-orange-100">
          {/* icon */}
          <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">🧱 IWI POPT</h3>
          <p className="text-sm text-slate-600 mt-0.5">Internal wall insulation — fast area & POPT calculations.</p>
        </div>
      </div>

      {/* badge / quick stat */}
      <div className="hidden sm:inline-flex flex-col items-end">
        <span className="text-xs text-slate-500">Avg result</span>
        <strong className="text-lg text-orange-600">78%</strong>
      </div>
    </div>

    {/* features */}
    <ul className="mt-4 space-y-2 text-sm text-slate-600">
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-orange-50 text-orange-600 text-xs">✓</span>
        Auto area calc from drawn walls
      </li>
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-orange-50 text-orange-600 text-xs">✓</span>
        Export annotated image & report
      </li>
    </ul>

    {/* CTA */}
    <div className="mt-5 flex items-center justify-between gap-4">
      <a
        href="/iwi"
        aria-label="Open IWI POPT"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        Open IWI
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <span className="text-sm text-slate-500">Real-time • instant</span>
    </div>
  </div>

  {/* Card — EWI */}
  <div className="group bg-white/85 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 focus-within:scale-[1.01]">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-3 bg-gradient-to-br from-purple-50 to-purple-100 ring-1 ring-purple-100">
          <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">🏠 EWI POPT</h3>
          <p className="text-sm text-slate-600 mt-0.5">External wall optimization & performance insights.</p>
        </div>
      </div>

      <div className="hidden sm:inline-flex flex-col items-end">
        <span className="text-xs text-slate-500">Trusted</span>
        <strong className="text-lg text-purple-600">4.8★</strong>
      </div>
    </div>

    <ul className="mt-4 space-y-2 text-sm text-slate-600">
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-purple-50 text-purple-600 text-xs">✓</span>
        Visualize thermal gains & losses
      </li>
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-purple-50 text-purple-600 text-xs">✓</span>
        Template export for reports
      </li>
    </ul>

    <div className="mt-5 flex items-center justify-between gap-4">
      <a
        href="/ewi"
        aria-label="Open EWI POPT"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-sm font-semibold shadow hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        Open EWI
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <span className="text-sm text-slate-500">Export ready</span>
    </div>
  </div>

  {/* Card — Cavity */}
  <div className="group bg-white/85 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 focus-within:scale-[1.01]">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 ring-1 ring-emerald-100">
          <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 7h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">🏗️ CAVITY POPT</h3>
          <p className="text-sm text-slate-600 mt-0.5">Cavity wall analysis and convert-to-IWI planning tools.</p>
        </div>
      </div>

      <div className="hidden sm:inline-flex flex-col items-end">
        <span className="text-xs text-slate-500">Speed</span>
        <strong className="text-lg text-emerald-600">Fast</strong>
      </div>
    </div>

    <ul className="mt-4 space-y-2 text-sm text-slate-600">
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-50 text-emerald-600 text-xs">✓</span>
        Quick cavity area detection
      </li>
      <li className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-50 text-emerald-600 text-xs">✓</span>
        Convert cavity → solid comparisons
      </li>
    </ul>

    <div className="mt-5 flex items-center justify-between gap-4">
      <a
        href="/cavity"
        aria-label="Open Cavity POPT"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Open Cavity
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <span className="text-sm text-slate-500">Detailed</span>
    </div>
  </div>
</div>



    </div>
  );
}
