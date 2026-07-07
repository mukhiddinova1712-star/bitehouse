"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", category: "interior", label: "VIP Zal" },
  { id: 4, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", category: "interior", label: "Asosiy Zal" },
  { id: 9, src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80", category: "interior", label: "Yoritilgan Zal" },
  { id: 13, src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=600&q=80", category: "interior", label: "Premium Muhit" },
  { id: 14, src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=600&q=80", category: "interior", label: "Bar Maydoni" },
  { id: 15, src: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=600&q=80", category: "interior", label: "Xususiy Kabina" },
  { id: 2, src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", category: "food", label: "Wagyu Steak" },
  { id: 3, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", category: "food", label: "Premium Taomlar" },
  { id: 10, src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80", category: "food", label: "Baliq Taomi" },
  { id: 11, src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80", category: "food", label: "Shirinliklar" },
  { id: 16, src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80", category: "food", label: "Grill Kabob" },
  { id: 17, src: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80", category: "food", label: "Sezar Salat" },
  { id: 18, src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", category: "food", label: "Maxsus Cocktail" },
  { id: 19, src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80", category: "food", label: "Cappuccino" },
  { id: 5, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80", category: "events", label: "Xususiy Tadbir" },
  { id: 8, src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80", category: "events", label: "Bayram Kechasi" },
  { id: 12, src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80", category: "events", label: "To'y Ziyofati" },
  { id: 20, src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80", category: "events", label: "Korporativ Kecha" },
  { id: 21, src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=600&q=80", category: "events", label: "VIP Tadbir" },
  { id: 22, src: "https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&w=800&q=80", category: "events", label: "Maxsus Kecha" },
];

type TabType = "all" | "interior" | "food" | "events";
const tabs: TabType[] = ["all", "interior", "food", "events"];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeTab === "all" ? galleryItems : galleryItems.filter(i => i.category === activeTab);
  const navigate = (dir: number) => {
    if (lightbox === null) return;
    const idx = filtered.findIndex(i => i.id === lightbox);
    const newIdx = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[newIdx].id);
  };
  const currentImg = filtered.find(i => i.id === lightbox);

  return (
    <section id="gallery" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.gallery.badge}</span>
          </div>
          <h2 className="section-title text-gold-gradient">{t.gallery.title}</h2>
          <div className="ornament mt-4 mb-6" />
          <p className="text-silver-400 font-sans max-w-xl mx-auto">{t.gallery.subtitle}</p>
        </div>
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map(tab => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} style={{ position: "relative", zIndex: 20 }}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${activeTab === tab ? "bg-gold-500 text-navy-900 shadow-gold" : "border border-silver-700/50 text-silver-400 hover:border-gold-500/50 hover:text-gold-500"}`}>
              {t.gallery.tabs[tab]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group h-52 bg-gradient-to-br from-navy-700 to-navy-900" onClick={() => setLightbox(item.id)}>
                <img src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-gold-500 flex items-center justify-center text-gold-500"><FiZoomIn size={16} /></div>
                  <span className="text-white text-xs font-sans bg-navy-900/70 px-3 py-1 rounded-full">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {lightbox !== null && currentImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gold-500/30 text-gold-500 flex items-center justify-center hover:bg-gold-500/10 transition-colors z-10"><FiX size={18} /></button>
            <button type="button" onClick={e => { e.stopPropagation(); navigate(-1); }} className="absolute left-4 md:left-8 w-10 h-10 rounded-full border border-gold-500/30 text-gold-500 flex items-center justify-center hover:bg-gold-500/10 transition-colors z-10"><FiChevronLeft size={20} /></button>
            <motion.div key={currentImg.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-4xl w-full rounded-2xl overflow-hidden shadow-luxury" onClick={e => e.stopPropagation()}>
              <img src={currentImg.src} alt={currentImg.label} className="w-full max-h-[80vh] object-contain" />
              <div className="bg-navy-900 px-4 py-2 text-center"><span className="text-gold-400 text-sm font-sans">{currentImg.label}</span></div>
            </motion.div>
            <button type="button" onClick={e => { e.stopPropagation(); navigate(1); }} className="absolute right-4 md:right-8 w-10 h-10 rounded-full border border-gold-500/30 text-gold-500 flex items-center justify-center hover:bg-gold-500/10 transition-colors z-10"><FiChevronRight size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
