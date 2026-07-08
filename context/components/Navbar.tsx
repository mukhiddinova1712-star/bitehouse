"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { menuItems } from "@/lib/menuData";
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiTruck, FiCreditCard } from "react-icons/fi";
import toast from "react-hot-toast";

const paymentMethods = [
  { id: "cash", label: "cash", icon: "💵" },
  { id: "card", label: "card", icon: "💳" },
  { id: "click", label: "click", icon: "📱" },
  { id: "payme", label: "payme", icon: "📲" },
  { id: "visa", label: "visa", icon: "🌐" },
];
const cardPayments = ["card", "click", "payme", "visa"];

export default function Order() {
  const { t, locale } = useLanguage();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count } = useCart();
  const { addAdminOrder } = useOrders();
  const [payment, setPayment] = useState("cash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isCardPayment = cardPayments.includes(payment);

  const getName = (item: typeof menuItems[0]) => {
    if (locale === "en") return item.nameEn;
    if (locale === "ru") return item.nameRu;
    return item.nameUz;
  };
  const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  const formatCardNumber = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const deliveryFee = cart.length > 0 ? 15000 : 0;
  const grandTotal = total + deliveryFee;

  const handleCheckout = () => {
    if (!name || !phone) {
      toast.error(
        locale === "en" ? "Enter full name and phone!" : locale === "ru" ? "Введите имя и телефон!" : "Ism familiya va telefon raqamni kiriting!",
        { style: { background: "#112052", color: "#f0f0f0" } }
      );
      return;
    }
    if (isCardPayment && cardNumber.replace(/\s/g, "").length < 16) {
      toast.error(
        locale === "en" ? "Enter valid card number!" : locale === "ru" ? "Введите номер карты!" : "To'liq karta raqamini kiriting!",
        { style: { background: "#112052", color: "#f0f0f0" } }
      );
      return;
    }
    const newOrder = {
      id: `#BH-${Date.now().toString().slice(-4)}`,
      customer: name,
      phone,
      address: email || "—",
      items: cart.map(i => `${getName(i)} x${i.quantity}`).join(", "),
      total: grandTotal,
      payment,
      status: "pending",
      time: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
    };
    addAdminOrder(newOrder);
    toast.success(
      locale === "en" ? "Order placed! We will deliver soon." : locale === "ru" ? "Заказ принят!" : "Buyurtmangiz qabul qilindi!",
      { duration: 5000, style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212,175,55,0.3)" } }
    );
    clearCart();
    setName(""); setPhone(""); setEmail(""); setCardNumber("");
  };

  const featured = menuItems.filter(i => i.tags.includes("popular")).slice(0, 6);

  return (
    <section id="order" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.order.badge}</span>
          </div>
          <h2 className="section-title text-gold-gradient">{t.order.title}</h2>
          <div className="ornament mt-4 mb-6" />
          <p className="text-silver-400 font-sans max-w-xl mx-auto">{t.order.subtitle}</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <h3 className="font-display text-xl text-gold-500 mb-6">⭐ Mashhur taomlar</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {featured.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="glass rounded-xl overflow-hidden flex items-center gap-3 p-3 group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center relative">
                    <span className="text-2xl opacity-30">🍽️</span>
                    <img src={item.image} alt={getName(item)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0" onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-sans font-semibold truncate">{getName(item)}</h4>
                    <p className="text-gold-500 text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <button onClick={() => { addToCart(item); toast.success(`${getName(item)} qo'shildi!`, { icon: "🛒", style: { background: "#112052", color: "#f0f0f0" } }); }} className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all flex-shrink-0">
                    <FiPlus size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}>
            <div className="glass-dark rounded-2xl p-6 sticky top-24">
              <h3 className="font-display text-xl text-gold-500 mb-4 flex items-center gap-2">
                <FiShoppingCart /> {t.order.cart}
                {count > 0 && <span className="ml-auto w-6 h-6 bg-gold-500 text-navy-900 text-xs font-bold rounded-full flex items-center justify-center">{count}</span>}
              </h3>
              {cart.length === 0 ? (
                <div className="text-center py-8 text-silver-500">
                  <FiShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-sans">Savat bo&apos;sh</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    <AnimatePresence>
                      {cart.map(item => (
                        <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-sans truncate">{getName(item)}</p>
                            <p className="text-gold-500 text-xs">{formatPrice(item.price)}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-silver-700 text-silver-400 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"><FiMinus size={10} /></button>
                            <span className="text-white text-xs w-5 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-silver-700 text-silver-400 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"><FiPlus size={10} /></button>
                            <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full border border-red-900/50 text-red-400 flex items-center justify-center hover:border-red-500 transition-colors ml-1"><FiTrash2 size={10} /></button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-3 mb-4">
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs"
                      placeholder={locale === "en" ? "Full name (first & last)..." : locale === "ru" ? "Имя и фамилия..." : "Ism Familiya..."}
                    />
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs"
                      placeholder={locale === "en" ? "Phone number..." : locale === "ru" ? "Номер телефона..." : "Telefon raqam..."}
                    />
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs"
                      placeholder={locale === "en" ? "Email..." : locale === "ru" ? "Эл. почта..." : "Email..."}
                      type="email"
                    />
                    <AnimatePresence>
                      {isCardPayment && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="relative">
                            <FiCreditCard size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                            <input value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} className="input-luxury w-full pl-8 pr-3 py-2 rounded-lg text-xs tracking-widest" placeholder="0000 0000 0000 0000" maxLength={19} />
                          </div>
                        </motion.div>
                      )}
