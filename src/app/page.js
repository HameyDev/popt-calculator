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
          <span className="text-emerald-600 drop-shadow-[0_0_10px_rgba(255,140,0,0.3)]">
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

      {/* Simple attractive cards */}
<div className="relative z-10 grid gap-6 mt-6 max-w-5xl w-full px-6 sm:grid-cols-3 font-sans">
  {/* IWI */}
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-extrabold text-orange-600 tracking-tight">IWI</h3>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <span className="text-orange-700 font-bold">I</span>
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-600 leading-relaxed font-medium">
      Internal Wall Insulation — quickly draw insulated walls and get instant area calculations.
    </p>
  </div>

  {/* EWI */}
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-extrabold text-purple-600 tracking-tight">EWI</h3>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        <span className="text-purple-700 font-bold">E</span>
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-600 leading-relaxed font-medium">
      External Wall Insulation — plan exterior insulation and export annotated floorplans.
    </p>
  </div>

  {/* CWI */}
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-extrabold text-emerald-600 tracking-tight">CWI</h3>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
        <span className="text-emerald-700 font-bold">C</span>
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-600 leading-relaxed font-medium">
      Cavity Wall Insulation — analyze cavity areas and produce clean reports.
    </p>
  </div>
</div>





    </div>
  );
}
