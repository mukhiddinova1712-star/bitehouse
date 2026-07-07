"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FiArrowRight, FiPhone, FiMail } from "react-icons/fi";
import { FaTiktok, FaTelegram, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com/bitehouse.uz" },
  { icon: FaFacebook, href: "https://facebook.com/BiteHouseRestaurant" },
  { icon: FaTiktok, href: "https://tiktok.com/@bitehouse.uz" },
  { icon: FaTelegram, href: "https://t.me/BiteHouseUz" },
  { icon: FaWhatsapp, href: "https://wa.me/998901234567" },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("To'g'ri email manzil kiriting!", {
        style: { background: "#112052", color: "#f0f0f0" },
      });
      return;
    }
    toast.success("Obuna bo'ldingiz!", {
      style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212,175,55,0.3)" },
    });
    setEmail("");
  };

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#menu", label: t.nav.menu },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#reservation", label: t.nav.reservation },
    { href: "#order", label: t.nav.order },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-navy-950 border-t border-gold-500/10">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] hover:drop-shadow-[0_0_18px_rgba(212,175,55,0.8)] transition-all duration-500">
                <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="fg1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37"/>
                      <stop offset="50%" stopColor="#f2e09e"/>
                      <stop offset="100%" stopColor="#b8941e"/>
                    </linearGradient>
                    <linearGradient id="fg2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a2f60"/>
                      <stop offset="100%" stopColor="#0a1628"/>
                    </linearGradient>
                  </defs>
                  <path d="M28 28 L35 16 L43 24 L50 13 L57 24 L65 16 L72 28 Z" fill="url(#fg1)"/>
                  <rect x="26" y="26" width="48" height="4" rx="1" fill="url(#fg1)"/>
                  <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="url(#fg2)"/>
                  <path d="M18 32 L18 72 Q18 90 50 102 Q82 90 82 72 L82 32 Z" fill="none" stroke="url(#fg1)" strokeWidth="2"/>
                  <path d="M24 36 L24 71 Q24 85 50 95 Q76 85 76 71 L76 36 Z" fill="none" stroke="url(#fg1)" strokeWidth="0.7" opacity="0.5"/>
                  <text x="50" y="73" fontFamily="Georgia,serif" fontSize="30" fontWeight="900" fill="url(#fg1)" textAnchor="middle" letterSpacing="2">BH</text>
                  <line x1="36" y1="79" x2="64" y2="79" stroke="url(#fg1)" strokeWidth="0.8" opacity="0.6"/>
                  <circle cx="50" cy="79" r="1.5" fill="url(#fg1)"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-lg font-bold tracking-widest text-gold-gradient">BITEHOUSE</div>
                <div className="text-xs tracking-[0.2em] text-silver-500 uppercase">{t.footer.tagline}</div>
              </div>
            </button>
            <p className="text-silver-500 text-sm font-sans leading-relaxed mb-6">{t.footer.desc}</p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-silver-400 hover:text-gold-500 hover:border-gold-500/60 transition-all"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-500 text-sm tracking-widest uppercase mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-silver-500 hover:text-gold-500 text-sm font-sans transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-500 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Hours */}
          <div>
            <h4 className="font-display text-gold-500 text-sm tracking-widest uppercase mb-6">{t.footer.workHours}</h4>
            <div className="space-y-4">
              <div>
                <p className="text-silver-400 text-xs font-sans tracking-wider uppercase mb-1">{t.contact.weekdays}</p>
                <p className="text-white font-sans text-sm">10:00 – 23:00</p>
              </div>
              <div>
                <p className="text-silver-400 text-xs font-sans tracking-wider uppercase mb-1">{t.contact.weekend}</p>
                <p className="text-white font-sans text-sm">10:00 – 00:00</p>
              </div>
              <div className="pt-2 border-t border-silver-800/30">
                <p className="text-silver-500 text-xs font-sans flex items-center gap-1.5">
                  <FiPhone size={10} className="text-gold-500" /> +998 90 123 45 67
                </p>
                <p className="text-silver-500 text-xs font-sans mt-1 flex items-center gap-1.5">
                  <FiMail size={10} className="text-gold-500" /> contact@bitehouse.uz
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-gold-500 text-sm tracking-widest uppercase mb-6">{t.footer.newsletter}</h4>
            <p className="text-silver-500 text-sm font-sans leading-relaxed mb-4">{t.footer.newsletterDesc}</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                className="input-luxury flex-1 px-3 py-2.5 rounded-lg text-xs"
                placeholder={t.footer.emailPlaceholder}
              />
              <button
                onClick={handleSubscribe}
                className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 rounded-lg flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all"
              >
                <FiArrowRight size={14} />
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-silver-800/30 space-y-1.5">
              <p className="text-silver-500 text-xs font-sans flex items-center gap-1.5">
                <span className="text-gold-500 font-bold">15+</span> filial — butun O'zbekiston
              </p>
              <p className="text-silver-500 text-xs font-sans">
                Tez yetkazib berish xizmati mavjud
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-silver-800/20">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-silver-600 text-xs font-sans">
            © 2024 BiteHouse. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <button className="text-silver-600 hover:text-silver-400 text-xs font-sans transition-colors">{t.footer.privacy}</button>
            <button className="text-silver-600 hover:text-silver-400 text-xs font-sans transition-colors">{t.footer.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
