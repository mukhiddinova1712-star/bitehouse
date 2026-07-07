"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { menuItems, MenuItem } from "@/lib/menuData";
import { FiPlus, FiStar, FiZap, FiThermometer, FiAward, FiCoffee, FiX, FiShoppingCart } from "react-icons/fi";
import { GiMeat, GiFishingHook, GiCampCookingPot, GiGrapes, GiKnifeFork, GiFire, GiBread, GiFruitBowl } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import toast from "react-hot-toast";

const categoryIconComponents: Record<string, React.ElementType> = {
  all: MdOutlineRestaurantMenu, chef: FiAward, appetizers: GiBread, soups: GiCampCookingPot,
  salads: GiFruitBowl, mains: GiKnifeFork, steaks: GiMeat, grill: GiFire,
  seafood: GiFishingHook, sides: GiGrapes, desserts: GiFruitBowl, drinks: GiGrapes, coffee: FiCoffee,
};

const categoryKeys = ["all", "chef", "appetizers", "soups", "salads", "mains", "steaks", "grill", "seafood", "sides", "desserts", "drinks"];

export default function Menu() {
  const { t, locale } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const getName = (item: typeof menuItems[0]) => { if (locale === "en") return item.nameEn; if (locale === "ru") return item.nameRu; return item.nameUz; };
  const getDesc = (item: typeof menuItems[0]) => { if (locale === "en") return item.descEn; if (locale === "ru") return item.descRu; return item.descUz; };
  const filtered = activeCategory === "all" ? menuItems : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart(item);
    toast.success(`${getName(item)} savatga qo'shildi!`, { icon: "🛒", style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212, 175, 55, 0.3)" } });
  };

  const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";

  return (
    <>
      <section id="menu" className="section-padding bg-navy-900 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-gold-500/5 blur-3xl -translate-y-1/2" />
        <div className="container-custom" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
              <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.menu.badge}</span>
            </div>
            <h2 className="section-title text-gold-gradient">{t.menu.title}</h2>
            <div className="ornament mt-4 mb-6" />
            <p className="text-silver-400 font-sans max-w-2xl mx-auto">{t.menu.subtitle}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mb-12">
            <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {categoryKeys.map(cat => {
                const CatIcon = categoryIconComponents[cat];
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeCategory === cat ? "bg-gold-500 text-navy-900 font-bold shadow-gold" : "border border-silver-700/50 text-silver-400 hover:border-gold-500/50 hover:text-gold-500"}`}>
                    {CatIcon && <CatIcon size={13} />}
                    {t.menu.categories[cat as keyof typeof t.menu.categories]}
                  </button>
                );
              })}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-5xl mb-4">🍽️</div>
                  <p className="text-silver-500 font-sans">Bu kategoriyada taomlar mavjud emas</p>
                </div>
              ) : filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 flex flex-col items-center justify-center gap-2">
                      {(() => { const Icon = categoryIconComponents[item.category] || MdOutlineRestaurantMenu; return <Icon size={40} className="text-gold-500/30" />; })()}
                    </div>
                    <img src={item.image} alt={getName(item)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {item.tags.includes("popular") && <span className="flex items-center gap-1 px-2 py-0.5 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full"><FiStar size={8} /> {t.menu.popular}</span>}
                      {item.tags.includes("new") && <span className="flex items-center gap-1 px-2 py-0.5 bg-navy-700 text-gold-400 text-[10px] font-bold rounded-full border border-gold-500/30"><FiZap size={8} /> {t.menu.new}</span>}
                      {item.tags.includes("spicy") && <span className="flex items-center gap-1 px-2 py-0.5 bg-red-900/80 text-red-300 text-[10px] font-bold rounded-full"><FiThermometer size={8} /> {t.menu.spicy}</span>}
                    </div>
                    {item.weight && <div className="absolute bottom-2 right-2 text-[10px] text-silver-400 bg-navy-900/70 px-2 py-0.5 rounded">{item.weight}</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-sans font-semibold text-white text-sm mb-1 line-clamp-1">{getName(item)}</h3>
                    <p className="text-silver-500 text-xs font-sans leading-relaxed mb-3 line-clamp-2">{getDesc(item)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-500 font-display font-bold text-sm">{formatPrice(item.price)}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }} className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300">
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", duration: 0.4 }} className="glass-dark rounded-3xl overflow-hidden w-full max-w-lg shadow-luxury border border-gold-500/20" onClick={e => e.stopPropagation()}>
              <div className="relative h-56 bg-gradient-to-br from-navy-700 to-navy-900">
                <img src={selectedItem.image} alt={getName(selectedItem)} className="absolute inset-0 w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-900/80 border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500/20 transition-colors"><FiX size={16} /></button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-white font-bold">{getName(selectedItem)}</h3>
                  <span className="text-gold-500 font-display text-xl font-bold ml-4 flex-shrink-0">{formatPrice(selectedItem.price)}</span>
                </div>
                <p className="text-silver-400 font-sans text-sm leading-relaxed mb-4">{getDesc(selectedItem)}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {selectedItem.weight && <div className="glass rounded-xl p-3 text-center"><div className="text-gold-500 text-sm font-bold">{selectedItem.weight}</div><div className="text-silver-500 text-xs mt-1">{locale === "en" ? "Weight" : locale === "ru" ? "Вес" : "Og'irlik"}</div></div>}
                  {selectedItem.calories && <div className="glass rounded-xl p-3 text-center"><div className="text-gold-500 text-sm font-bold">{selectedItem.calories}</div><div className="text-silver-500 text-xs mt-1">kcal</div></div>}
                  <div className="glass rounded-xl p-3 text-center"><div className="text-gold-500 text-sm font-bold capitalize">{selectedItem.category}</div><div className="text-silver-500 text-xs mt-1">{locale === "en" ? "Category" : locale === "ru" ? "Категория" : "Kategoriya"}</div></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { handleAddToCart(selectedItem); setSelectedItem(null); }} className="btn-gold flex-1 py-3 rounded-xl text-sm tracking-widest flex items-center justify-center gap-2"><FiShoppingCart size={16} />{t.menu.order}</button>
                  <button onClick={() => setSelectedItem(null)} className="btn-outline-gold px-6 py-3 rounded-xl text-sm tracking-widest">{locale === "en" ? "Close" : locale === "ru" ? "Закрыть" : "Yopish"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
