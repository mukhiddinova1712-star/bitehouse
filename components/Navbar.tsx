"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Locale } from "@/lib/i18n";

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "uz", label: "UZ", flag: "🇺🇿" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { count, cart, total } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-lang-dropdown]")) setLangOpen(false);
      if (!target.closest("[data-cart-dropdown]")) setCartOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const isDark = true;

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#menu", label: t.nav.menu },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-navy py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 group">
            <div className="relative w-16 h-16 flex-shrink-0 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.9)] transition-all duration-500">
              <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="ng1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37"/>
                    <stop offset="50%" stopColor="#f2e09e"/>
                    <stop offset="100%" stopColor="#b8941e"/>
                  </linearGradient>
                  <linearGradient id="ng2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2f60"/>
                    <stop offset="100%" stopColor="#0a1628"/>
                  </linearGradient>
                </defs>
                <path d="M28 28 L35 16 L43 24 L50 13 L57 24 L65 16 L72 28 Z" fill="url(#ng1)"/>
                <rect x="26" y="26" width="48" height="4" rx="1" fill="url(#ng1)"/>
                <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="url(#ng2)"/>
                <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="none" stroke="url(#ng1)" strokeWidth="2"/>
                <path d="M24 36 L24 71 Q24 85 50 95 Q76 85 76 71 L76 36 Z" fill="none" stroke="url(#ng1)" strokeWidth="0.7" opacity="0.5"/>
                <text x="50" y="73" fontFamily="Georgia,serif" fontSize="30" fontWeight="900" fill="url(#ng1)" textAnchor="middle" letterSpacing="2">BH</text>
                <line x1="36" y1="79" x2="64" y2="79" stroke="url(#ng1)" strokeWidth="0.8" opacity="0.6"/>
                <circle cx="50" cy="79" r="1.5" fill="url(#ng1)"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-xl font-bold tracking-widest text-gold-gradient leading-none group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-500">
                BITEHOUSE
              </div>
              <div className="text-xs tracking-[0.25em] text-silver-400 font-sans uppercase">
                Premium &amp; Luxury
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-silver-300 hover:text-gold-500 font-sans text-sm tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative" data-lang-dropdown>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded border border-gold-500/30 text-gold-500 text-xs font-sans tracking-wider uppercase hover:border-gold-500 transition-all"
              >
                {LANGS.find(l => l.code === locale)?.flag}
                <span className="ml-1">{locale.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 glass-dark rounded-lg overflow-hidden shadow-luxury min-w-[100px]"
                  >
                    {LANGS.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-xs font-sans tracking-wider uppercase transition-colors
                          ${locale === lang.code ? "text-gold-500 bg-gold-500/10" : "text-silver-300 hover:text-gold-500 hover:bg-white/5"}`}
                      >
                        <span>{lang.flag}</span> {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle - disabled */}

            {/* Cart */}
            <div className="relative" data-cart-dropdown>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gold-500/30 text-gold-500 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
              >
                <FiShoppingCart size={16} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed right-4 top-20 w-80 glass-dark rounded-2xl shadow-luxury border border-gold-500/20 overflow-hidden z-[55]"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gold-500/10">
                      <span className="font-display text-gold-500 text-sm flex items-center gap-2">
                        <FiShoppingCart size={14} /> {t.order.cart}
                        {count > 0 && <span className="w-5 h-5 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>}
                      </span>
                      <button onClick={() => setCartOpen(false)} className="text-silver-500 hover:text-silver-300 transition-colors">
                        <FiX size={14} />
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <FiShoppingCart size={32} className="text-silver-600 mx-auto mb-2" />
                        <p className="text-silver-500 text-xs font-sans">Savat bo&apos;sh</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto px-4 py-3 space-y-3">
                          {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-navy-800">
                                <img src={item.image} alt="" className="w-full h-full object-cover"
                                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-sans font-semibold truncate">
                                  {locale === "en" ? item.nameEn : locale === "ru" ? item.nameRu : item.nameUz}
                                </p>
                                <p className="text-gold-500 text-xs">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so&apos;m</p>
                              </div>
                              <span className="text-silver-400 text-xs">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-gold-500/10">
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-silver-400 font-sans text-xs">{t.order.total}:</span>
                            <span className="text-gold-500 font-bold text-xs">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so&apos;m</span>
                          </div>
                          <button
                            onClick={() => { setCartOpen(false); scrollTo("#order"); }}
                            className="btn-gold w-full py-2.5 rounded-xl text-xs tracking-widest"
                          >
                            {t.order.checkout}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reserve Button (desktop) */}
            <button
              onClick={() => scrollTo("#reservation")}
              className="hidden lg:block btn-gold px-5 py-2 rounded text-xs tracking-widest"
            >
              {t.nav.reservation}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-gold-500"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-2xl font-display text-silver-200 hover:text-gold-500 transition-colors tracking-widest uppercase"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                onClick={() => scrollTo("#reservation")}
                className="btn-gold px-6 py-3 rounded text-sm tracking-widest mt-4 text-center"
              >
                {t.nav.reservation}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
