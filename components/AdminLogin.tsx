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
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-gold-gradient tracking-widest">BITEHOUSE</h2>
            <p className="text-silver-500 text-xs font-sans tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>
          <div className="luxury-divider mb-8">
            <span className="text-gold-500 text-xs font-sans tracking-widest uppercase">Kirish</span>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60"><FiUser size={16} /></div>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} className="input-luxury w-full pl-11 pr-4 py-3.5 rounded-xl text-sm" placeholder="Login" autoComplete="off" />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60"><FiLock size={16} /></div>
              <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="input-luxury w-full pl-11 pr-12 py-3.5 rounded-xl text-sm" placeholder="Parol" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-500 hover:text-gold-500 transition-colors">
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-sans text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2">
                ❌ {error}
              </motion.p>
            )}
            <button onClick={handleLogin} disabled={loading} className="btn-gold w-full py-3.5 rounded-xl text-sm tracking-widest mt-2 flex items-center justify-center gap-2">
              {loading ? (<><div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />Tekshirilmoqda...</>) : (<><FiLock size={14} />Kirish</>)}
            </button>
          </div>
          <button onClick={onClose} className="w-full mt-4 text-silver-500 hover:text-silver-300 text-xs font-sans tracking-wider uppercase transition-colors">Bekor qilish</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
