"use client";
import { useState } from "react";

interface MenuItemImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

// Kategoriyaga mos gradient ranglar
const categoryColors: Record<string, { from: string; to: string; icon: string }> = {
  chef:       { from: "#1a3a6e", to: "#0a1628", icon: "👨‍🍳" },
  appetizers: { from: "#2a1a0e", to: "#0a1628", icon: "🥗" },
  soups:      { from: "#1a2a3e", to: "#0a1628", icon: "🥣" },
  salads:     { from: "#0a2a0e", to: "#0a1628", icon: "🥬" },
  mains:      { from: "#2a1a1a", to: "#0a1628", icon: "🍗" },
  steaks:     { from: "#3a1a0a", to: "#0a1628", icon: "🥩" },
  grill:      { from: "#3a1a00", to: "#0a1628", icon: "🔥" },
  seafood:    { from: "#0a2a3a", to: "#0a1628", icon: "🐟" },
  sides:      { from: "#2a2a0a", to: "#0a1628", icon: "🍚" },
  desserts:   { from: "#3a0a2a", to: "#0a1628", icon: "🍰" },
  drinks:     { from: "#0a1a3a", to: "#0a1628", icon: "🍹" },
  coffee:     { from: "#2a1a00", to: "#0a1628", icon: "☕" },
};

export default function MenuItemImage({ src, alt, category, className = "" }: MenuItemImageProps) {
  const [imgError, setImgError] = useState(false);
  const colors = categoryColors[category] || { from: "#1e3570", to: "#0a1628", icon: "🍽️" };

  if (imgError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-2 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
        }}
      >
        <span className="text-3xl">{colors.icon}</span>
        <span
          className="text-xs text-center px-2 font-sans tracking-wide"
          style={{ color: "rgba(212,175,55,0.5)" }}
        >
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setImgError(true)}
    />
  );
}
