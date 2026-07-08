"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { menuItems as initialMenuItems, MenuItem } from "@/lib/menuData";
import { useOrders } from "@/context/OrderContext";
import {
  FiGrid, FiShoppingBag, FiCalendar, FiUsers, FiDollarSign, FiTrendingUp, FiBarChart2,
  FiPlus, FiTrash2, FiX, FiCheck, FiLogOut, FiSettings,
} from "react-icons/fi";
import toast from "react-hot-toast";

type Reservation = { id: number; name: string; date: string; time: string; guests: number; branch: string; status: string };
type AdminSection = "dashboard" | "orders" | "reservations" | "menu" | "stats" | "customers";

const initReservations: Reservation[] = [
  { id: 1, name: "Bekzod A.", date: "2024-12-20", time: "19:00", guests: 4, branch: "Amir Temur", status: "confirmed" },
  { id: 2, name: "Dilnoza M.", date: "2024-12-21", time: "20:00", guests: 2, branch: "Yunusobod", status: "pending" },
  { id: 3, name: "Sherzod U.", date: "2024-12-22", time: "18:30", guests: 8, branch: "Samarqand", status: "confirmed" },
  { id: 4, name: "Feruza B.", date: "2024-12-23", time: "21:00", guests: 6, branch: "Buxoro", status: "cancelled" },
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  confirmed: "text-green-400 bg-green-400/10 border-green-400/30",
  delivered: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
};

function OrdersSection({ adminOrders, confirmAdminOrder, deleteAdminOrder, formatPrice }: { adminOrders: any[]; confirmAdminOrder: (id: string) => void; deleteAdminOrder: (id: string) => void; formatPrice: (p: number) => string }) {
  const [orderTab, setOrderTab] = useState<"active" | "archive">("active");
  const active = adminOrders.filter(o => o.status !== "confirmed" && o.status !== "delivered");
  const archive = adminOrders.filter(o => o.status === "confirmed" || o.status === "delivered");
  const shown = orderTab === "active" ? active : archive;
  return (
    <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex gap-3 mb-6">
        <button onClick={() => setOrderTab("active")} className={`px-5 py-2 rounded-full text-xs font-sans font-semibold transition-all ${orderTab === "active" ? "bg-gold-500 text-navy-900" : "border border-silver-700/50 text-silver-400 hover:text-gold-500"}`}>Faol ({active.length})</button>
        <button onClick={() => setOrderTab("archive")} className={`px-5 py-2 rounded-full text-xs font-sans font-semibold transition-all ${orderTab === "archive" ? "bg-gold-500 text-navy-900" : "border border-silver-700/50 text-silver-400 hover:text-gold-500"}`}>Arxiv ({archive.length})</button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-silver-800/30 flex items-center justify-between">
          <h3 className="font-display text-gold-500">{orderTab === "active" ? "Faol buyurtmalar" : "Arxiv buyurtmalar"}</h3>
          <span className="text-silver-400 text-xs">{shown.length} ta</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-silver-800/30">{["ID", "Mijoz", "Telefon", "Taomlar", "Summa", "To'lov", "Vaqt", "Holat", "Amal"].map(h => <th key={h} className="text-left px-4 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>)}</tr></thead>
            <tbody>
              {shown.map((order: any) => (
                <tr key={order.id} className="border-b border-silver-800/10 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-gold-500 font-bold text-xs">{order.id}</td>
                  <td className="px-4 py-3 text-white text-xs">{order.customer}</td>
                  <td className="px-4 py-3 text-silver-400 text-xs">{order.phone}</td>
                  <td className="px-4 py-3 text-silver-400 text-xs max-w-[150px] truncate">{order.items}</td>
                  <td className="px-4 py-3 text-gold-500 font-bold text-xs">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 text-silver-400 text-xs">{order.payment}</td>
                  <td className="px-4 py-3 text-silver-400 text-xs">{order.time}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs border ${statusColors[order.status] || statusColors.pending}`}>{order.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {orderTab === "active" && <button onClick={() => confirmAdminOrder(order.id)} className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/30 transition-colors"><FiCheck size={14} /></button>}
                      <button onClick={() => deleteAdminOrder(order.id)} className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-colors"><FiX size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <p className="text-center text-silver-500 py-10 text-sm">{orderTab === "active" ? "Faol buyurtmalar yo'q" : "Arxiv bo'sh"}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage();
  const { adminOrders, confirmAdminOrder, deleteAdminOrder, customers, addCustomer, deleteCustomer } = useOrders();
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>(initReservations);
  const [menuList, setMenuList] = useState<MenuItem[]>(initialMenuItems);

  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", email: "", status: "Yangi", total: "", orders: "" });

  const getName = (item: MenuItem) => { if (locale === "en") return item.nameEn; if (locale === "ru") return item.nameRu; return item.nameUz; };
  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";

  const confirmRes = (id: number) => { setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "confirmed" } : r)); toast.success("Bron tasdiqlandi!", { style: { background: "#112052", color: "#f0f0f0" } }); };
  const deleteRes = (id: number) => { setReservations(prev => prev.filter(r => r.id !== id)); toast.success("Bron bekor qilindi!", { style: { background: "#112052", color: "#f0f0f0" } }); };
  const deleteMenuItem = (id: number) => { setMenuList(prev => prev.filter(m => m.id !== id)); toast.success("Taom o'chirildi!", { style: { background: "#112052", color: "#f0f0f0" } }); };

  const addCustomerLocal = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error("Ism va telefon majburiy!", { style: { background: "#112052", color: "#f0f0f0" } });
      return;
    }
    addCustomer({
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      orders: Number(newCustomer.orders) || 0,
      total: Number(newCustomer.total) || 0,
      status: newCustomer.status,
    });
    setNewCustomer({ name: "", phone: "", email: "", status: "Yangi", total: "", orders: "" });
    setShowAddCustomer(false);
    toast.success("Mijoz qo'shildi!", { style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212,175,55,0.3)" } });
  };

  const filteredMenu = menuList.filter(item => getName(item).toLowerCase().includes(search.toLowerCase()));

  const sidebarItems: { id: AdminSection; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: t.admin.dashboard, icon: FiGrid },
    { id: "orders", label: t.admin.orders, icon: FiShoppingBag },
    { id: "reservations", label: t.admin.reservations, icon: FiCalendar },
    { id: "menu", label: t.admin.menu, icon: FiSettings },
    { id: "stats", label: "Statistika", icon: FiBarChart2 },
    { id: "customers", label: "Mijozlar", icon: FiUsers },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-navy-950 flex overflow-hidden">
      <div className="w-64 bg-navy-900 border-r border-gold-500/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-gold-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <span className="text-gold-500 font-display font-bold text-sm">BH</span>
            </div>
            <div>
              <div className="text-white font-display font-bold text-sm tracking-wider">BITEHOUSE</div>
              <div className="text-silver-500 text-xs font-sans">{t.admin.title}</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setSection(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all ${section === item.id ? "bg-gold-500/10 text-gold-500 border border-gold-500/20" : "text-silver-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon size={16} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gold-500/10">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-silver-400 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <FiLogOut size={16} />Chiqish
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-navy-950/80 backdrop-blur-sm border-b border-gold-500/10 px-8 py-4 flex items-center justify-between z-10">
          <h2 className="font-display text-xl text-gold-500">{sidebarItems.find(i => i.id === section)?.label}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-silver-700/30 flex items-center justify-center text-silver-400 hover:text-white transition-all"><FiX size={14} /></button>
        </div>
        <div className="p-8">
          <AnimatePresence mode="wait">
            {section === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: FiShoppingBag, label: t.admin.stats.todayOrders, value: adminOrders.length.toString(), color: "text-blue-400" },
                    { icon: FiDollarSign, label: t.admin.stats.totalRevenue, value: adminOrders.reduce((s, o) => s + o.total, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm", color: "text-green-400" },
                    { icon: FiCalendar, label: t.admin.stats.reservations, value: reservations.filter(r => r.status !== "cancelled").length.toString(), color: "text-purple-400" },
                    { icon: FiUsers, label: t.admin.stats.customers, value: customers.length.toString(), color: "text-gold-500" },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.color} bg-current/10`}><stat.icon size={18} /></div>
                      <div className="text-white font-display text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-silver-500 text-xs font-sans">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display text-gold-500 text-lg mb-4">So&apos;nggi buyurtmalar</h3>
                  <div className="space-y-3">
                    {adminOrders.slice(0, 4).map(order => (
                      <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                        <div className="text-gold-500 font-bold text-sm w-20">{order.id}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold">{order.customer}</p>
                          <p className="text-silver-500 text-xs truncate">{order.items}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>{order.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            {section === "orders" && <OrdersSection adminOrders={adminOrders} confirmAdminOrder={confirmAdminOrder} deleteAdminOrder={deleteAdminOrder} formatPrice={formatPrice} />}
            {section === "reservations" && (
              <motion.div key="reservations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-silver-800/30 flex items-center justify-between">
                    <h3 className="font-display text-gold-500">Stol bronlari</h3>
                    <span className="text-silver-400 text-xs">{reservations.length} ta bron</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-silver-800/30">{["Ism", "Sana", "Vaqt", "Mehmonlar", "Filial", "Holat", "Amal"].map(h => <th key={h} className="text-left px-6 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>)}</tr></thead>
                      <tbody>
                        {reservations.map(res => (
                          <tr key={res.id} className="border-b border-silver-800/10 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white text-sm font-semibold">{res.name}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.date}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.time}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.guests} kishi</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.branch}</td>
                            <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs border ${statusColors[res.status]}`}>{res.status}</span></td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button onClick={() => confirmRes(res.id)} className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/30 transition-colors"><FiCheck size={14} /></button>
                                <button onClick={() => deleteRes(res.id)} className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-colors"><FiX size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
            {section === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                  <input value={search} onChange={e => setSearch(e.target.value)} className="input-luxury flex-1 px-4 py-2.5 rounded-xl text-sm" placeholder="Taom qidirish..." />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMenu.map(item => (
                    <div key={item.id} className="glass rounded-xl overflow-hidden">
                      <div className="h-32 overflow-hidden relative bg-navy-800">
                        <img src={item.image} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div className="absolute top-2 right-2">
                          <button onClick={() => deleteMenuItem(item.id)} className="w-7 h-7 rounded-lg bg-navy-900/90 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-navy-800 transition-colors"><FiTrash2 size={12} /></button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-white text-xs font-semibold truncate">{getName(item)}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-gold-500 text-xs font-bold">{formatPrice(item.price)}</span>
                          <span className="text-silver-500 text-[10px] bg-silver-800/20 px-1.5 py-0.5 rounded">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {section === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-display text-gold-500 text-lg mb-6 flex items-center gap-2"><FiTrendingUp size={18} /> Oylik daromad</h3>
                    <div className="space-y-3">
                      {[{ month: "Yanvar", amount: 8500000, percent: 65 }, { month: "Fevral", amount: 9200000, percent: 72 }, { month: "Mart", amount: 11000000, percent: 85 }, { month: "Aprel", amount: 10500000, percent: 80 }, { month: "May", amount: 12400000, percent: 95 }, { month: "Iyun", amount: 13000000, percent: 100 }].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1"><span className="text-silver-400">{item.month}</span><span className="text-gold-500 font-bold">{item.amount.toLocaleString()} so&apos;m</span></div>
                          <div className="h-2 bg-navy-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full" /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-display text-gold-500 text-lg mb-6 flex items-center gap-2"><FiBarChart2 size={18} /> Kategoriyalar</h3>
                    <div className="space-y-3">
                      {[{ cat: "Steyklar", count: 142, percent: 100 }, { cat: "Dengiz mahsulotlari", count: 98, percent: 69 }, { cat: "Asosiy taomlar", count: 87, percent: 61 }, { cat: "Grill", count: 76, percent: 54 }].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1"><span className="text-silver-400">{item.cat}</span><span className="text-white font-bold">{item.count} ta</span></div>
                          <div className="h-2 bg-navy-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full" /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {section === "customers" && (
              <motion.div key="customers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-gold-500 flex items-center gap-2"><FiUsers size={18} /> Mijozlar ro&apos;yxati</h3>
                  <button
                    onClick={() => setShowAddCustomer(true)}
                    className="btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest flex items-center gap-2"
                  >
                    <FiPlus size={14} /> Yangi mijoz
                  </button>
                </div>

                {/* Add Customer Modal */}
                <AnimatePresence>
                  {showAddCustomer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[200] bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
                      onClick={() => setShowAddCustomer(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="glass-dark rounded-2xl p-8 w-full max-w-md border border-gold-500/20"
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-display text-gold-500 text-lg">Yangi mijoz qo&apos;shish</h3>
                          <button onClick={() => setShowAddCustomer(false)} className="text-silver-400 hover:text-white"><FiX size={18} /></button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Ism *</label>
                            <input value={newCustomer.name} onChange={e => setNewCustomer(p => ({ ...p, name: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="To'liq ism..." />
                          </div>
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Telefon *</label>
                            <input value={newCustomer.phone} onChange={e => setNewCustomer(p => ({ ...p, phone: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="+998 90 123 45 67" />
                          </div>
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Email</label>
                            <input value={newCustomer.email} onChange={e => setNewCustomer(p => ({ ...p, email: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="email@example.com" />
                          </div>
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Jami xarid (so&apos;m)</label>
                            <input value={newCustomer.total} onChange={e => setNewCustomer(p => ({ ...p, total: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="0" type="number" min="0" />
                          </div>
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Buyurtmalar soni</label>
                            <input value={newCustomer.orders} onChange={e => setNewCustomer(p => ({ ...p, orders: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="0" type="number" min="0" />
                          </div>
                          <div>
                            <label className="text-silver-400 text-xs font-sans tracking-wide block mb-2">Status</label>
                            <select value={newCustomer.status} onChange={e => setNewCustomer(p => ({ ...p, status: e.target.value }))} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                              <option value="Yangi" style={{ backgroundColor: "#112052" }}>Yangi</option>
                              <option value="Doimiy" style={{ backgroundColor: "#112052" }}>Doimiy</option>
                              <option value="VIP" style={{ backgroundColor: "#112052" }}>VIP</option>
                            </select>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button onClick={addCustomerLocal} className="btn-gold flex-1 py-3 rounded-xl text-xs tracking-widest">Qo&apos;shish</button>
                            <button onClick={() => setShowAddCustomer(false)} className="btn-outline-gold px-6 py-3 rounded-xl text-xs tracking-widest">Bekor</button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-silver-800/30 flex items-center justify-between">
                    <span className="text-silver-400 text-xs">{customers.length} ta mijoz</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-silver-800/30">{["#", "Ism", "Telefon", "Email", "Buyurtmalar", "Jami xarid", "Status", "Amal"].map(h => <th key={h} className="text-left px-5 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>)}</tr></thead>
                      <tbody>
                        {customers.map((c, i) => (
                          <tr key={c.id} className="border-b border-silver-800/10 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 text-silver-400 text-sm">{i + 1}</td>
                            <td className="px-5 py-4 text-white text-sm font-semibold">{c.name}</td>
                            <td className="px-5 py-4 text-silver-400 text-sm">{c.phone}</td>
                            <td className="px-5 py-4 text-silver-400 text-sm">{c.email || "—"}</td>
                            <td className="px-5 py-4 text-white text-sm">{c.orders}</td>
                            <td className="px-5 py-4 text-gold-500 text-sm font-bold">{formatPrice(c.total)}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs border ${c.status === "VIP" ? "text-gold-400 bg-gold-400/10 border-gold-400/30" : c.status === "Doimiy" ? "text-green-400 bg-green-400/10 border-green-400/30" : "text-silver-400 bg-silver-400/10 border-silver-400/30"}`}>{c.status}</span>
                            </td>
                            <td className="px-5 py-4">
                              <button onClick={() => deleteCustomer(c.id)} className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-colors">
                                <FiTrash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {customers.length === 0 && <p className="text-center text-silver-500 py-10">Mijozlar yo&apos;q</p>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
