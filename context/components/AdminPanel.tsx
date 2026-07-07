"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { menuItems as initialMenuItems, MenuItem } from "@/lib/menuData";
import { useOrders } from "@/context/OrderContext";
import {
  FiGrid, FiShoppingBag, FiCalendar,
  FiUsers, FiDollarSign, FiTrendingUp, FiBarChart2,
  FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,
  FiLogOut, FiSettings, FiSave, FiUser, FiPhone, FiMail
} from "react-icons/fi";
import toast from "react-hot-toast";

type Order = { id: string; customer: string; items: string; total: number; status: string; time: string };
type Reservation = { id: number; name: string; date: string; time: string; guests: number; branch: string; status: string };
type AdminSection = "dashboard" | "orders" | "reservations" | "menu" | "stats" | "customers";

const initOrders: Order[] = [
  { id: "#BH-001", customer: "Alisher T.", items: "Wagyu Steak, Lobster", total: 630000, status: "pending", time: "12:30" },
  { id: "#BH-002", customer: "Malika R.", items: "Beef Wellington", total: 285000, status: "confirmed", time: "13:15" },
  { id: "#BH-003", customer: "Jasur K.", items: "Filet Mignon x2", total: 790000, status: "delivered", time: "11:00" },
  { id: "#BH-004", customer: "Nodira S.", items: "Royal Cocktail x3", total: 285000, status: "confirmed", time: "14:00" },
];

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

const categoryKeys = ["chef","appetizers","soups","salads","mains","steaks","grill","seafood","sides","desserts","drinks","coffee"];

// Orders bo'limi — alohida komponent (useState hook uchun)
function OrdersSection({ adminOrders, confirmAdminOrder, deleteAdminOrder, formatPrice, statusColors }:
  { adminOrders: any[]; confirmAdminOrder: (id:string)=>void; deleteAdminOrder: (id:string)=>void; formatPrice: (p:number)=>string; statusColors: Record<string,string> }) {
  const [orderTab, setOrderTab] = useState<"active"|"archive">("active");
  const active  = adminOrders.filter(o => o.status !== "confirmed" && o.status !== "delivered");
  const archive = adminOrders.filter(o => o.status === "confirmed" || o.status === "delivered");
  const shown   = orderTab === "active" ? active : archive;

  return (
    <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex gap-3 mb-6">
        <button onClick={() => setOrderTab("active")}
          className={`px-5 py-2 rounded-full text-xs font-sans font-semibold transition-all ${orderTab === "active" ? "bg-gold-500 text-navy-900" : "border border-silver-700/50 text-silver-400 hover:text-gold-500"}`}>
          Faol ({active.length})
        </button>
        <button onClick={() => setOrderTab("archive")}
          className={`px-5 py-2 rounded-full text-xs font-sans font-semibold transition-all ${orderTab === "archive" ? "bg-gold-500 text-navy-900" : "border border-silver-700/50 text-silver-400 hover:text-gold-500"}`}>
          Arxiv ({archive.length})
        </button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-silver-800/30 flex items-center justify-between">
          <h3 className="font-display text-gold-500">{orderTab === "active" ? "Faol buyurtmalar" : "Arxiv buyurtmalar"}</h3>
          <span className="text-silver-400 text-xs">{shown.length} ta</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-silver-800/30">
                {["ID","Mijoz","Telefon","Taomlar","Summa","To'lov","Vaqt","Holat","Amal"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
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
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[order.status] || statusColors.pending}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {orderTab === "active" && (
                        <button onClick={() => confirmAdminOrder(order.id)}
                          className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/30 transition-colors" title="Tasdiqlash">
                          <FiCheck size={14} />
                        </button>
                      )}
                      <button onClick={() => deleteAdminOrder(order.id)}
                        className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-colors" title="O'chirish">
                        <FiX size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && (
            <p className="text-center text-silver-500 py-10 text-sm">
              {orderTab === "active" ? "Faol buyurtmalar yo'q" : "Arxiv bo'sh"}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface MenuModal { open: boolean; isEdit: boolean; item: Partial<MenuItem> | null; }

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage();
  const { adminOrders, confirmAdminOrder, deleteAdminOrder } = useOrders();
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>(initOrders);
  const [reservations, setReservations] = useState<Reservation[]>(initReservations);
  const [menuList, setMenuList] = useState<MenuItem[]>(initialMenuItems);
  const [modal, setModal] = useState<MenuModal>({ open: false, isEdit: false, item: null });

  const getName = (item: MenuItem) => {
    if (locale === "en") return item.nameEn;
    if (locale === "ru") return item.nameRu;
    return item.nameUz;
  };

  const formatPrice = (p: number) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";

  // Orders
  const confirmOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "confirmed" } : o));
    toast.success("Buyurtma tasdiqlandi!", { style: { background: "#112052", color: "#f0f0f0" } });
  };
  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    toast.success("Buyurtma o'chirildi!", { style: { background: "#112052", color: "#f0f0f0" } });
  };

  // Reservations
  const confirmRes = (id: number) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "confirmed" } : r));
    toast.success("Bron tasdiqlandi!", { style: { background: "#112052", color: "#f0f0f0" } });
  };
  const deleteRes = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    toast.success("Bron bekor qilindi!", { style: { background: "#112052", color: "#f0f0f0" } });
  };

  // Menu
  const openAdd = () => setModal({ open: true, isEdit: false, item: { category: "mains", price: 0 } });
  const openEdit = (item: MenuItem) => setModal({ open: true, isEdit: true, item: { ...item } });
  const deleteMenuItem = (id: number) => {
    setMenuList(prev => prev.filter(m => m.id !== id));
    toast.success("Taom o'chirildi!", { style: { background: "#112052", color: "#f0f0f0" } });
  };
  const saveMenuItem = () => {
    if (!modal.item) return;
    if (modal.isEdit) {
      setMenuList(prev => prev.map(m => m.id === modal.item!.id ? { ...m, ...modal.item } as MenuItem : m));
      toast.success("Taom yangilandi!", { style: { background: "#112052", color: "#f0f0f0" } });
    } else {
      const newId = Math.max(...menuList.map(m => m.id)) + 1;
      const newItem: MenuItem = {
        id: newId,
        nameUz: modal.item.nameUz || "",
        nameEn: modal.item.nameEn || "",
        nameRu: modal.item.nameRu || "",
        descUz: modal.item.descUz || "",
        descEn: modal.item.descEn || "",
        descRu: modal.item.descRu || "",
        price: modal.item.price || 0,
        category: modal.item.category || "mains",
        image: modal.item.image || "",
        tags: [],
        weight: modal.item.weight || "",
      };
      setMenuList(prev => [...prev, newItem]);
      toast.success("Yangi taom qo'shildi!", { style: { background: "#112052", color: "#f0f0f0" } });
    }
    setModal({ open: false, isEdit: false, item: null });
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-navy-950 flex overflow-hidden">
      {/* Sidebar */}
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
            <button key={item.id} onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all
                ${section === item.id ? "bg-gold-500/10 text-gold-500 border border-gold-500/20" : "text-silver-400 hover:text-white hover:bg-white/5"}`}>
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

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-navy-950/80 backdrop-blur-sm border-b border-gold-500/10 px-8 py-4 flex items-center justify-between z-10">
          <h2 className="font-display text-xl text-gold-500">{sidebarItems.find(i => i.id === section)?.label}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-silver-700/30 flex items-center justify-center text-silver-400 hover:text-white transition-all">
            <FiX size={14} />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">

            {/* DASHBOARD */}
            {section === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: FiShoppingBag, label: t.admin.stats.todayOrders, value: adminOrders.length.toString(), color: "text-blue-400" },
                    { icon: FiDollarSign, label: t.admin.stats.totalRevenue, value: "12.4M", color: "text-green-400" },
                    { icon: FiCalendar, label: t.admin.stats.reservations, value: reservations.length.toString(), color: "text-purple-400" },
                    { icon: FiUsers, label: t.admin.stats.customers, value: "1,240", color: "text-gold-500" },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color} bg-current/10`}>
                          <stat.icon size={18} />
                        </div>
                      </div>
                      <div className="text-white font-display text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-silver-500 text-xs font-sans">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display text-gold-500 text-lg mb-4">So'nggi buyurtmalar</h3>
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

            {/* ORDERS */}
            {section === "orders" && (
              <OrdersSection
                adminOrders={adminOrders}
                confirmAdminOrder={confirmAdminOrder}
                deleteAdminOrder={deleteAdminOrder}
                formatPrice={formatPrice}
                statusColors={statusColors}
              />
            )}

            {/* RESERVATIONS */}
            {section === "reservations" && (
              <motion.div key="reservations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-silver-800/30 flex items-center justify-between">
                    <h3 className="font-display text-gold-500">Stol bronlari</h3>
                    <span className="text-silver-400 text-xs">{reservations.length} ta bron</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-silver-800/30">
                          {["Ism","Sana","Vaqt","Mehmonlar","Filial","Holat","Amal"].map(h => (
                            <th key={h} className="text-left px-6 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map(res => (
                          <tr key={res.id} className="border-b border-silver-800/10 hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white text-sm font-semibold">{res.name}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.date}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.time}</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.guests} kishi</td>
                            <td className="px-6 py-4 text-silver-400 text-sm">{res.branch}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[res.status]}`}>{res.status}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button onClick={() => confirmRes(res.id)}
                                  className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/30 transition-colors" title="Tasdiqlash">
                                  <FiCheck size={14} />
                                </button>
                                <button onClick={() => deleteRes(res.id)}
                                  className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-400/30 transition-colors" title="Bekor qilish">
                                  <FiX size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {reservations.length === 0 && <p className="text-center text-silver-500 py-10">Bronlar yo'q</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* MENU */}
            {section === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    className="input-luxury flex-1 px-4 py-2.5 rounded-xl text-sm" placeholder="Taom qidirish..." />
                  <button onClick={openAdd} className="btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest flex items-center gap-2 whitespace-nowrap">
                    <FiPlus size={14} /> Yangi taom
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMenu.map(item => (
                    <div key={item.id} className="glass rounded-xl overflow-hidden">
                      <div className="h-32 overflow-hidden relative bg-navy-800">
                        <img src={item.image} alt="" className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button onClick={() => openEdit(item)}
                            className="w-7 h-7 rounded-lg bg-navy-900/90 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-navy-800 transition-colors">
                            <FiEdit2 size={12} />
                          </button>
                          <button onClick={() => deleteMenuItem(item.id)}
                            className="w-7 h-7 rounded-lg bg-navy-900/90 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-navy-800 transition-colors">
                            <FiTrash2 size={12} />
                          </button>
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

            {/* STATS */}
            {section === "stats" && (
              <motion.div key="stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {/* Revenue chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-display text-gold-500 text-lg mb-6 flex items-center gap-2">
                      <FiTrendingUp size={18} /> Oylik daromad
                    </h3>
                    <div className="space-y-3">
                      {[
                        { month: "Yanvar", amount: 8500000, percent: 65 },
                        { month: "Fevral", amount: 9200000, percent: 72 },
                        { month: "Mart", amount: 11000000, percent: 85 },
                        { month: "Aprel", amount: 10500000, percent: 80 },
                        { month: "May", amount: 12400000, percent: 95 },
                        { month: "Iyun", amount: 13000000, percent: 100 },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-silver-400">{item.month}</span>
                            <span className="text-gold-500 font-bold">{item.amount.toLocaleString()} so'm</span>
                          </div>
                          <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ delay: i * 0.1, duration: 0.6 }}
                              className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-display text-gold-500 text-lg mb-6 flex items-center gap-2">
                      <FiBarChart2 size={18} /> Kategoriyalar bo'yicha
                    </h3>
                    <div className="space-y-3">
                      {[
                        { cat: "Steyklar", count: 142, percent: 100, color: "from-gold-600 to-gold-400" },
                        { cat: "Dengiz mahsulotlari", count: 98, percent: 69, color: "from-blue-600 to-blue-400" },
                        { cat: "Asosiy taomlar", count: 87, percent: 61, color: "from-green-600 to-green-400" },
                        { cat: "Grill", count: 76, percent: 54, color: "from-red-600 to-red-400" },
                        { cat: "Shirinliklar", count: 65, percent: 46, color: "from-purple-600 to-purple-400" },
                        { cat: "Ichimliklar", count: 54, percent: 38, color: "from-cyan-600 to-cyan-400" },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-silver-400">{item.cat}</span>
                            <span className="text-white font-bold">{item.count} ta</span>
                          </div>
                          <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ delay: i * 0.1, duration: 0.6 }}
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Jami buyurtmalar", value: adminOrders.length.toString(), icon: FiShoppingBag, color: "text-blue-400" },
                    { label: "Jami bronlar", value: reservations.length.toString(), icon: FiCalendar, color: "text-purple-400" },
                    { label: "O'rtacha check", value: "285 000", icon: FiDollarSign, color: "text-green-400" },
                    { label: "Bugungi daromad", value: "1.2M", icon: FiTrendingUp, color: "text-gold-500" },
                  ].map((card, i) => (
                    <div key={i} className="glass rounded-2xl p-5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${card.color} bg-current/10`}>
                        <card.icon size={18} />
                      </div>
                      <div className="text-white font-display text-xl font-bold">{card.value}</div>
                      <div className="text-silver-500 text-xs mt-1">{card.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CUSTOMERS */}
            {section === "customers" && (
              <motion.div key="customers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-silver-800/30 flex items-center justify-between">
                    <h3 className="font-display text-gold-500 flex items-center gap-2">
                      <FiUsers size={18} /> Mijozlar ro'yxati
                    </h3>
                    <span className="text-silver-400 text-xs">8 ta mijoz</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-silver-800/30">
                          {["#","Ism","Telefon","Email","Buyurtmalar","Jami xarid","Status"].map(h => (
                            <th key={h} className="text-left px-5 py-3 text-silver-400 text-xs font-sans tracking-wider uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 1, name: "Alisher T.", phone: "+998 90 123 45 67", email: "alisher@gmail.com", orders: 12, total: 4200000, status: "VIP" },
                          { id: 2, name: "Malika R.", phone: "+998 91 234 56 78", email: "malika@gmail.com", orders: 8, total: 2800000, status: "Doimiy" },
                          { id: 3, name: "Jasur K.", phone: "+998 93 345 67 89", email: "jasur@gmail.com", orders: 15, total: 6500000, status: "VIP" },
                          { id: 4, name: "Nodira S.", phone: "+998 94 456 78 90", email: "nodira@gmail.com", orders: 5, total: 1500000, status: "Yangi" },
                          { id: 5, name: "Bekzod A.", phone: "+998 95 567 89 01", email: "bekzod@gmail.com", orders: 20, total: 8900000, status: "VIP" },
                          { id: 6, name: "Dilnoza M.", phone: "+998 97 678 90 12", email: "dilnoza@gmail.com", orders: 3, total: 850000, status: "Yangi" },
                          { id: 7, name: "Sherzod U.", phone: "+998 99 789 01 23", email: "sherzod@gmail.com", orders: 10, total: 3600000, status: "Doimiy" },
                          { id: 8, name: "Feruza B.", phone: "+998 90 890 12 34", email: "feruza@gmail.com", orders: 7, total: 2100000, status: "Doimiy" },
                        ].map(c => (
                          <tr key={c.id} className="border-b border-silver-800/10 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 text-silver-500 text-xs">{c.id}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-500 text-xs font-bold">
                                  {c.name[0]}
                                </div>
                                <span className="text-white text-sm font-semibold">{c.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-silver-400 text-xs">{c.phone}</td>
                            <td className="px-5 py-4 text-silver-400 text-xs">{c.email}</td>
                            <td className="px-5 py-4 text-white text-sm font-bold text-center">{c.orders}</td>
                            <td className="px-5 py-4 text-gold-500 text-xs font-bold">
                              {c.total.toLocaleString()} so'm
                            </td>
                            <td className="px-5 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs border font-semibold
                                ${c.status === "VIP" ? "text-gold-400 bg-gold-400/10 border-gold-400/30" :
                                  c.status === "Doimiy" ? "text-green-400 bg-green-400/10 border-green-400/30" :
                                  "text-blue-400 bg-blue-400/10 border-blue-400/30"}`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}


          </AnimatePresence>
        </div>
      </div>

      {/* Menu Modal */}
      <AnimatePresence>
        {modal.open && modal.item && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-20"
            onClick={() => setModal({ open: false, isEdit: false, item: null })}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-dark rounded-2xl p-8 w-full max-w-lg shadow-luxury"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-gold-500 text-lg">
                  {modal.isEdit ? "Taomni tahrirlash" : "Yangi taom qo'shish"}
                </h3>
                <button onClick={() => setModal({ open: false, isEdit: false, item: null })}
                  className="w-8 h-8 rounded-full border border-silver-700/30 flex items-center justify-center text-silver-400 hover:text-white transition-colors">
                  <FiX size={14} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Nomi (UZ)</label>
                    <input value={modal.item.nameUz || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, nameUz: e.target.value } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="O'zbekcha" />
                  </div>
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Name (EN)</label>
                    <input value={modal.item.nameEn || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, nameEn: e.target.value } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="English" />
                  </div>
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Название (RU)</label>
                    <input value={modal.item.nameRu || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, nameRu: e.target.value } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="Русский" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Narx (so'm)</label>
                    <input type="number" value={modal.item.price || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, price: Number(e.target.value) } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Kategoriya</label>
                    <select value={modal.item.category || "mains"} onChange={e => setModal(m => ({ ...m, item: { ...m.item, category: e.target.value } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                      {categoryKeys.map(c => <option key={c} value={c} style={{ backgroundColor: "#112052" }}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-silver-400 text-xs block mb-1">Og'irlik</label>
                    <input value={modal.item.weight || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, weight: e.target.value } }))}
                      className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="300g" />
                  </div>
                </div>
                <div>
                  <label className="text-silver-400 text-xs block mb-1">Rasm URL</label>
                  <input value={modal.item.image || ""} onChange={e => setModal(m => ({ ...m, item: { ...m.item, image: e.target.value } }))}
                    className="input-luxury w-full px-3 py-2 rounded-lg text-xs" placeholder="https://..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={saveMenuItem} className="btn-gold flex-1 py-3 rounded-xl text-xs tracking-widest flex items-center justify-center gap-2">
                    <FiSave size={14} /> {modal.isEdit ? "Saqlash" : "Qo'shish"}
                  </button>
                  <button onClick={() => setModal({ open: false, isEdit: false, item: null })}
                    className="btn-outline-gold flex-1 py-3 rounded-xl text-xs tracking-widest">
                    Bekor qilish
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
