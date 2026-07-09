"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useOrders } from "@/context/OrderContext";
import { FiUser, FiPhone, FiMail, FiX, FiLogIn } from "react-icons/fi";

const stats = [
  { value: "14+", keyUz: "stat1" },
  { value: "120+", keyUz: "stat2" },
  { value: "50K+", keyUz: "stat3" },
  { value: "15+", keyUz: "stat4" },
];

export default function Hero() {
  const { t, locale } = useLanguage();
  const { addCustomer, customers, login } = useOrders();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  const scrollTo = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      setError(locale === "en" ? "Name and phone are required!" : locale === "ru" ? "Имя и телефон обязательны!" : "Ism va telefon majburiy!");
      return;
    }
    const existing = customers.find(c => c.phone.replace(/\s/g, "") === form.phone.replace(/\s/g, ""));
    if (existing) {
      login(existing);
      setShowLogin(false);
      setForm({ name: "", phone: "", email: "" });
      setError("");
      return;
    }
    const newCustomer = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      orders: 0,
      total: 0,
      status: "Yangi",
    };
    addCustomer(newCustomer);
    login(newCustomer);
    setShowLogin(false);
    setForm({ name: "", phone: "", email: "" });
    setError("");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/30" />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">{t.hero.title}</span><br />
            <span className="gold-shimmer">{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-silver-400 font-sans text-lg leading-relaxed mb-10 max-w-2xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            {/* Kirish tugmasi — asosiy */}
            <button
              onClick={() => setShowLogin(true)}
              className="btn-gold px-8 py-4 rounded text-sm tracking-widest flex items-center gap-2 group"
            >
              <FiLogIn className="group-hover:translate-x-1 transition-transform" />
              {locale === "en" ? "Sign In" : locale === "ru" ? "Войти" : "Kirish"}
            </button>
            <button
              onClick={() => scrollTo("#menu")}
              className="btn-outline-gold px-8 py-4 rounded text-sm tracking-widest"
            >
              {t.hero.btnMenu}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="font-display text-3xl font-bold text-gold-gradient mb-1">{stat.value}</div>
                <div className="text-silver-500 text-xs font-sans tracking-wider uppercase">
                  {t.hero[stat.keyUz as keyof typeof t.hero]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" />
      </motion.div>

      {/* Kirish modali */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="glass-dark rounded-3xl p-8 w-full max-w-md border border-gold-500/20 shadow-luxury"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl text-gold-gradient font-bold tracking-widest">
                    {locale === "en" ? "Sign In" : locale === "ru" ? "Войти" : "Kirish"}
                  </h2>
                  <p className="text-silver-500 text-xs font-sans mt-1">
                    {locale === "en" ? "Enter your details to continue" : locale === "ru" ? "Введите ваши данные" : "Ma'lumotlaringizni kiriting"}
                  </p>
                </div>
                <button
                  onClick={() => setShowLogin(false)}
                  className="w-8 h-8 rounded-full border border-silver-700/30 flex items-center justify-center text-silver-400 hover:text-white transition-colors"
                >
                  <FiX size={14} />
                </button>
              </div>

              <div className="luxury-divider mb-6">
                <span className="text-gold-500/60 text-xs font-sans tracking-widest uppercase">BiteHouse</span>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <FiUser size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" />
                  <input
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    placeholder={locale === "en" ? "Full name *" : locale === "ru" ? "Полное имя *" : "To'liq ismingiz *"}
                  />
                </div>
                <div className="relative">
                  <FiPhone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" />
                  <input
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    placeholder="+998 90 123 45 67 *"
                  />
                </div>
                <div className="relative">
                  <FiMail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" />
                  <input
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-luxury w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    placeholder={locale === "en" ? "Email (optional)" : locale === "ru" ? "Email (необязательно)" : "Email (ixtiyoriy)"}
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs font-sans bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                  >
                    ❌ {error}
                  </motion.p>
                )}
                <button
                  onClick={handleSubmit}
                  className="btn-gold w-full py-3 rounded-xl text-sm tracking-widest flex items-center justify-center gap-2"
                >
                  <FiLogIn size={14} />
                  {locale === "en" ? "Continue" : locale === "ru" ? "Продолжить" : "Davom etish"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
