"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FiAward, FiStar, FiBook, FiShield } from "react-icons/fi";

const features = [
  { icon: FiAward, keyLabel: "feature1", keyDesc: "feature1Desc" },
  { icon: FiStar, keyLabel: "feature2", keyDesc: "feature2Desc" },
  { icon: FiBook, keyLabel: "feature3", keyDesc: "feature3Desc" },
  { icon: FiShield, keyLabel: "feature4", keyDesc: "feature4Desc" },
];

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="container-custom" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.about.badge}</span>
          </div>
          <h2 className="section-title text-gold-gradient">{t.about.title}</h2>
          <div className="ornament mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 relative bg-navy-800">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
                    alt="Restaurant interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={e => (e.target as HTMLImageElement).style.display = "none"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 relative bg-navy-800">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                    alt="Premium food"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={e => (e.target as HTMLImageElement).style.display = "none"}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden h-32 relative bg-navy-800">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80"
                    alt="Chef cooking"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={e => (e.target as HTMLImageElement).style.display = "none"}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 relative bg-navy-800">
                  <img
                    src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=400&q=80"
                    alt="Luxury dining"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    onError={e => (e.target as HTMLImageElement).style.display = "none"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-transparent" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-dark rounded-2xl px-6 py-4 text-center shadow-gold"
            >
              <div className="text-gold-500 font-display text-2xl font-bold">2010</div>
              <div className="text-silver-400 text-xs tracking-wider uppercase font-sans">Since</div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-silver-300 font-sans leading-relaxed text-lg">{t.about.desc1}</p>
            <p className="text-silver-400 font-sans leading-relaxed">{t.about.desc2}</p>
            <p className="text-silver-400 font-sans leading-relaxed">{t.about.desc3}</p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map(({ icon: Icon, keyLabel, keyDesc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="glass rounded-xl p-4 hover:border-gold-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center mb-3 group-hover:bg-gold-500/20 transition-colors">
                    <Icon className="text-gold-500" size={18} />
                  </div>
                  <div className="text-white font-sans font-semibold text-sm mb-1">
                    {t.about[keyLabel as keyof typeof t.about]}
                  </div>
                  <div className="text-silver-500 text-xs font-sans leading-relaxed">
                    {t.about[keyDesc as keyof typeof t.about]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
