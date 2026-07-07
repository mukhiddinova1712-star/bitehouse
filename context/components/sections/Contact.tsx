"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useForm } from "react-hook-form";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import { FaTiktok, FaTelegram, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com/bitehouse.uz", label: "@bitehouse.uz", color: "hover:text-pink-400" },
  { icon: FaFacebook, href: "https://facebook.com/BiteHouseRestaurant", label: "BiteHouse Restaurant", color: "hover:text-blue-400" },
  { icon: FaTiktok, href: "https://tiktok.com/@bitehouse.uz", label: "@bitehouse.uz", color: "hover:text-white" },
  { icon: FaTelegram, href: "https://t.me/BiteHouseUz", label: "@BiteHouseUz", color: "hover:text-sky-400" },
  { icon: FaWhatsapp, href: "https://wa.me/998901234567", label: "+998 90 123 45 67", color: "hover:text-green-400" },
];

export default function Contact() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    toast.success("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.", {
      style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212,175,55,0.3)" },
    });
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.contact.badge}</span>
          </div>
          <h2 className="section-title text-gold-gradient">{t.contact.title}</h2>
          <div className="ornament mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info cards */}
            {[
              {
                icon: FiMapPin,
                title: t.contact.address,
                lines: ["Toshkent shahri, Amir Temur ko'chasi 25"],
              },
              {
                icon: FiPhone,
                title: t.contact.phone,
                lines: ["+998 90 123 45 67", "+998 71 123 45 67"],
              },
              {
                icon: FiMail,
                title: t.contact.email,
                lines: ["contact@bitehouse.uz"],
              },
              {
                icon: FiClock,
                title: t.contact.hours,
                lines: [`${t.contact.weekdays}: 10:00 – 23:00`, `${t.contact.weekend}: 10:00 – 00:00`],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-gold-500" size={18} />
                </div>
                <div>
                  <h4 className="text-silver-400 text-xs font-sans tracking-wider uppercase mb-1">{item.title}</h4>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-white font-sans text-sm">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div>
              <h4 className="text-silver-400 text-xs font-sans tracking-wider uppercase mb-4">{t.contact.followUs}</h4>
              <div className="space-y-2">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-silver-400 ${social.color} transition-colors group`}
                  >
                    <social.icon size={16} />
                    <span className="text-sm font-sans group-hover:text-current">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden h-48 border border-gold-500/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2797!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sAmir%20Temur%20Ave%2C%20Tashkent!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BiteHouse Location"
              />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-dark rounded-2xl p-8">
              <h3 className="font-display text-xl text-gold-500 mb-6">{t.contact.sendMessage}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">
                      {t.contact.yourName}
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className={`input-luxury w-full px-4 py-3 rounded-xl text-sm ${errors.name ? "border-red-400/60" : ""}`}
                      placeholder={t.contact.yourName}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">Majburiy maydon</p>}
                  </div>
                  <div>
                    <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">
                      {t.contact.yourEmail}
                    </label>
                    <input
                      {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                      type="email"
                      className={`input-luxury w-full px-4 py-3 rounded-xl text-sm ${errors.email ? "border-red-400/60" : ""}`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">To'g'ri email kiriting</p>}
                  </div>
                </div>
                <div>
                  <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">
                    {t.contact.subject}
                  </label>
                  <input
                    {...register("subject", { required: true })}
                    className={`input-luxury w-full px-4 py-3 rounded-xl text-sm ${errors.subject ? "border-red-400/60" : ""}`}
                    placeholder={locale === "en" ? "Subject" : locale === "ru" ? "Тема" : "Mavzu"}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">Majburiy maydon</p>}
                </div>
                <div>
                  <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    rows={6}
                    className={`input-luxury w-full px-4 py-3 rounded-xl text-sm resize-none ${errors.message ? "border-red-400/60" : ""}`}
                    placeholder={locale === "en" ? "Write your message..." : locale === "ru" ? "Напишите ваше сообщение..." : "Xabaringizni yozing..."}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">Majburiy maydon</p>}
                </div>
                <button
                  type="submit"
                  className="btn-gold w-full py-3 rounded-xl text-sm tracking-widest flex items-center justify-center gap-2"
                >
                  <FiSend size={14} />
                  {t.contact.send}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
