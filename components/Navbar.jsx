"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { createPortal } from "react-dom";

  export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const CustomNavLink = ({ to, children }) => {
    const isActive = pathname === to;
    return (
      <Link
        href={to}
        className={`text-sm font-medium transition-colors relative group ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
      >
        {children}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
        />
      </Link>
    );
  };

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e) => e.key === "Escape" && closeMenu();
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  // Sade/modern mobil item
  const MobileItem = ({ to, children }) => {
    const isActive = pathname === to;
    return (
    <Link
      href={to}
      onClick={closeMenu}
      className={[
          "flex items-center justify-between rounded-2xl px-4 py-3.5",
          "transition-colors duration-200",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/80 hover:text-white hover:bg-white/5",
        ].join(" ")}
    >
      <span className="text-[15px] font-medium tracking-tight">
        {children}
      </span>
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-white" : "bg-white/30",
        ].join(" ")}
      />
    </Link>
  )};

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="relative group" onClick={closeMenu}>
                <img
                  src="/MFO Creative.png"
                  alt="MFO Creative"
                  className="h-14 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-2xl cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </Link>

              <div className="h-12 w-[2px] bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-lg" />

              <a
                href="https://acdigital.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img
                  src="/A&C@3x-8-2.png"
                  alt="A&C Digital"
                  className="h-14 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-2xl cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </a>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <CustomNavLink to="/hakkimizda">Hakkımızda</CustomNavLink>
              <CustomNavLink to="/hizmetler">Hizmetler</CustomNavLink>
              <CustomNavLink to="/portfoy">Portföy</CustomNavLink>
              <CustomNavLink to="/blog">Blog</CustomNavLink>

              <Link
                href="/iletisim"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                İletişim
              </Link>
            </div>

            {/* Mobile button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 cursor-pointer"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== Mobil Yarım Ekran Drawer (PORTAL) ===== */}
      {mounted ? createPortal(
        <div
          className={[
            "md:hidden fixed inset-0 z-[2147483647]",
            "transition-opacity duration-300 ease-out",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {/* Overlay (fade) */}
          <div
            onClick={closeMenu}
            className={[
              "absolute inset-0",
              "transition-opacity duration-300 ease-out",
              isMenuOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          />

          {/* Drawer (slide) */}
          <div
            className={[
              "absolute right-0 top-0 h-full",
              "w-[78%] max-w-[420px] sm:w-[60%]",
              "transition-transform duration-300 ease-out",
              isMenuOpen ? "translate-x-0" : "translate-x-full",
            ].join(" ")}
            style={{
              backgroundColor: "#070A12",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-24px 0 60px rgba(0,0,0,0.45)",
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-base font-semibold tracking-tight">
                      Menü
                    </div>
                    <div className="text-white/55 text-xs mt-1">
                      Hızlı erişim
                    </div>
                  </div>

                  <button
                    onClick={closeMenu}
                    className="h-10 w-10 rounded-2xl bg-white/5 hover:bg-white/10 transition grid place-items-center text-white"
                    aria-label="Kapat"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Minimal accent line */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>

              {/* Nav */}
              <div className="px-5 flex-1 overflow-y-auto pb-6">
                <div className="flex flex-col gap-2">
                  <MobileItem to="/hakkimizda">Hakkımızda</MobileItem>
                  <MobileItem to="/hizmetler">Hizmetler</MobileItem>
                  <MobileItem to="/portfoy">Portföy</MobileItem>
                  <MobileItem to="/blog">Blog</MobileItem>
                </div>

                {/* CTA (sade/premium) */}
                <div className="mt-6 rounded-2xl p-4 bg-white/5 border border-white/10">
                  <div className="text-white text-sm font-semibold">
                    Bir proje mi var?
                  </div>
                  <div className="text-white/55 text-xs mt-1">
                    Kısa bir mesaj bırak, dönüş yapalım.
                  </div>

                  <Link
                    href="/iletisim"
                    onClick={closeMenu}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3
                               bg-white text-black font-semibold text-sm
                               hover:opacity-90 transition"
                  >
                    İletişim
                  </Link>
                </div>

                {/* Partner (minimal) */}
                <a
                  href="https://acdigital.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-xs text-white/50 hover:text-white/70 transition"
                >
                  Partner: A&C Digital →
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
      {/* ===== /Mobil Drawer ===== */}
    </>
  );
}
