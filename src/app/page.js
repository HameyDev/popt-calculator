import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative text-center px-6 pt-48 overflow-hidden">
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
      <div className="relative flex items-center justify-center z-10 max-w-4xl text-gray-800 animate-fadeIn mt-10">
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

      {/* 🧊 Floating Info Cards */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-2 max-w-6xl w-full px-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,165,0,0.25)] transition-all transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold text-orange-700 mb-3">
            🧱 IWI POPT
          </h2>
          <p className="text-gray-700 text-sm">
            Calculate internal wall insulation areas accurately and optimize
            energy performance in minutes.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">
            🏠 EWI POPT
          </h2>
          <p className="text-gray-700 text-sm">
            Optimize external walls and improve property insulation with our EWI
            performance tools.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold text-green-700 mb-3">
            🏗️ CAVITY POPT
          </h2>
          <p className="text-gray-700 text-sm">
            Analyze and manage cavity wall insulation efficiently with detailed
            reports and insights.
          </p>
        </div>
      </div>


    </div>
  );
}
