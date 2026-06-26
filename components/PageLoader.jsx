import React from "react";

export default function PageLoader({ visible }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="relative w-72 h-72 flex items-center justify-center">
        
        {/* Wave pulses */}
        <span className="absolute w-24 h-24 rounded-full bg-white/10 animate-ping" />
        <span className="absolute w-40 h-40 rounded-full bg-white/5 animate-ping [animation-delay:250ms]" />
        <span className="absolute w-56 h-56 rounded-full bg-white/5 animate-ping [animation-delay:500ms]" />

        {/* Center logo */}
        <img
          src="/beyin.png"
          alt="Loading"
          className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-2xl"
        />

        {/* Text */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white text-sm font-semibold tracking-wide">
            Yükleniyor...
          </p>
          <p className="text-white/50 text-xs mt-1">
            Sayfa değiştiriliyor
          </p>
        </div>
      </div>
    </div>
  );
}
