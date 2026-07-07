"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function AdminLogin({ onSuccess, onClose }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "2013") {
        onSuccess();
      } else {
        setError("Login yoki parol noto'g'ri!");
        setLoading(false);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <div className="glass-dark rounded-3xl p-10 shadow-luxury border border-gold-500/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4">
              <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="al1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37"/>
                    <stop offset="50%" stopColor="#f2e09e"/>
                    <stop offset="100%" stopColor="#b8941e"/>
                  </linearGradient>
                  <linearGradient id="al2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2f60"/>
                    <stop offset="100%" stopColor="#0a1628"/>
                  </linearGradient>
                </defs>
                <path d="M28 28 L35 16 L43 24 L50 13 L57 24 L65 16 L72 28 Z" fill="url(#al1)"/>
                <rect x="26" y="26" width="48" height="4" rx="1" fill="url(#al1)"/>
                <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="url(#al2)"/>
                <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="none" stroke="url(#al1)" strokeWidth="2"/>
                <path d="M24 36 L24 71 Q24 85 50 95 Q76 85 76 71 L76 36 Z" fill="none" stroke="url(#al1)" strokeWidth="0.7" opacity="0.5"/>
                <text x="50" y="73" fontFamily="Georgia,serif" fontSize="30" fontWeight="900" fill="url(#al1)" textAnchor="middle" letterSpacing="2">BH</text>
                <line x1="36" y1="79" x2="64" y2="79" stroke="url(#al1)" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="50" cy="79" r="1.5" fill="url(#al1)"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-gold-gradient tracking-widest">BITEHOUSE</h2>
            <p className="text-silver-500 text-xs font-sans tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>

          {/* Divider */}
          <div className="luxury-divider mb-8">
            <span className="text-gold-500 text-xs font-sans tracking-widest uppercase">Kirish</span>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60">
                <FiUser size={16} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input-luxury w-full pl-11 pr-4 py-3.5 rounded-xl text-sm"
                placeholder="Login"
                autoComplete="off"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60">
                <FiLock size={16} />
              </div>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input-luxury w-full pl-11 pr-12 py-3.5 rounded-xl text-sm"
                placeholder="Parol"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-500 hover:text-gold-500 transition-colors"
                aria-label={showPass ? "Parolni yashirish" : "Parolni ko'rsatish"}
              >
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-sans text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2"
              >
                ❌ {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl text-sm tracking-widest mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <FiLock size={14} />
                  Kirish
                </>
              )}
            </button>
          </div>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-silver-500 hover:text-silver-300 text-xs font-sans tracking-wider uppercase transition-colors"
          >
            Bekor qilish
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
