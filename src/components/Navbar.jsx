"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/iwi", label: "IWI POPT" },
    { href: "/ewi", label: "EWI POPT" },
    { href: "/cavity", label: "CWI POPT" },
  ];

  return (
    <>
      {/* Centered glass navbar */}
      <nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2
                   bg-white/70 backdrop-blur-md border border-red-200/30
                   text-red-600 px-6 py-2 rounded-full shadow-sm
                   flex items-center justify-between gap-6 z-50 max-w-3xl w-[calc(100%-2rem)]"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="p-1 rounded-md bg-gradient-to-r from-emerald-400 to-emerald-600
                       text-transparent bg-clip-text font-extrabold text-lg"
            title="POPT"
          >
            🏠 <span className="ml-1">POPT</span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-2 py-1 rounded-md transition
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/40
                  ${active ? "text-emerald-600 font-semibold" : "text-gray-500 font-semibold hover:text-emerald-600/90"}`}
                aria-current={active ? "page" : undefined}
              >
                <span>{l.label}</span>
                {/* underline indicator */}
                <span
                  className={`absolute left-0 -bottom-2 h-0.5 rounded-full transition-all
                    ${active ? "w-full bg-emerald-400" : "w-0 bg-transparent"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right actions: mobile menu button */}
        <div className="flex items-center gap-2">
          {/* optional quick action (e.g., export) - keep for future */}
          {/* <button className="hidden sm:inline-flex px-3 py-1 bg-emerald-600 rounded-md text-sm">Export</button> */}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex text-black items-center justify-center p-2 rounded-md bg-white/8 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
            title="Toggle menu"
          >
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu (centered panel) */}
      <div
        id="mobile-menu"
        className={`fixed top-20 left-1/2 text-black transform -translate-x-1/2 z-40 w-[90%] max-w-sm
                    bg-white/6 backdrop-blur-md border border-white/10 rounded-xl shadow-lg
                    transition-all duration-200 overflow-hidden ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="flex flex-col divide-y divide-white/6 p-3">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-md text-left transition
                  ${active ? "text-emerald-300 font-semibold bg-bg-emerald" : "text-black hover:bg-emerald-400"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="px-4 py-3">
            <a
              href="#"
              className="block text-sm text-black hover:text-emerald-400 transition"
            >
              Need help?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
