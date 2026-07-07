"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useForm } from "react-hook-form";
import { branches } from "@/lib/menuData";
import { FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMail, FiCheckCircle, FiMessageSquare, FiGift } from "react-icons/fi";
import toast from "react-hot-toast";

interface ReservationForm { name: string; phone: string; email: string; date: string; time: string; guests: string; branch: string; occasion: string; notes: string; }

const times = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"];
const occasionsMap = { uz: ["Tug'ilgan kun","To'y","Biznes uchrashuv","Yillik bayram","Romantik kecha","Oilaviy ziyofat","Korporativ tadbir","Boshqa"], en: ["Birthday","Wedding","Business Meeting","Anniversary","Romantic Dinner","Family Gathering","Corporate Event","Other"], ru: ["День рождения","Свадьба","Деловая встреча","Юбилей","Романтический ужин","Семейное торжество","Корпоративное мероприятие","Другое"] };
const guestLabel: Record<string, string> = { uz: "kishi", en: "guests", ru: "чел." };

export default function Reservation() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationForm>();

  const occasions = occasionsMap[locale] || occasionsMap.uz;
  const gl = guestLabel[locale] || guestLabel.uz;

  const onSubmit = () => {
    setSubmitted(true);
    toast.success(t.reservation.form.success, { duration: 5000, style: { background: "#112052", color: "#f0f0f0", border: "1px solid rgba(212,175,55,0.3)" } });
    setTimeout(() => { setSubmitted(false); reset(); }, 5000);
  };

  return (
    <section id="reservation" className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-navy-900/90" />
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-4">
            <span className="text-gold-500 text-xs font-sans tracking-[0.2em] uppercase">{t.reservation.badge}</span>
          </div>
          <h2 className="section-title text-gold-gradient">{t.reservation.title}</h2>
          <div className="ornament mt-4 mb-6" />
          <p className="text-silver-400 font-sans max-w-xl mx-auto">{t.reservation.subtitle}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="max-w-3xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 md:p-12 shadow-luxury">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <FiCheckCircle className="text-gold-500 mx-auto mb-4" size={60} />
                <h3 className="font-display text-2xl text-gold-500 mb-3">{t.reservation.form.success}</h3>
                <p className="text-silver-400 font-sans">{locale === "ru" ? "Мы свяжемся с вами в ближайшее время." : locale === "en" ? "We will contact you shortly." : "Tez orada siz bilan bog'lanamiz."}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiUser className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.name}</label>
                    <input {...register("name", { required: true })} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder={t.reservation.form.name} />
                    {errors.name && <span className="text-red-400 text-xs mt-1 block">Majburiy maydon</span>}
                  </div>
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiPhone className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.phone}</label>
                    <input {...register("phone", { required: true })} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="+998 90 123 45 67" />
                    {errors.phone && <span className="text-red-400 text-xs mt-1 block">Majburiy maydon</span>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiMail className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.email}</label>
                    <input {...register("email")} type="email" className="input-luxury w-full px-4 py-3 rounded-xl text-sm" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiCalendar className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.branch}</label>
                    <select {...register("branch", { required: true })} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                      <option value="" style={{ backgroundColor: "#112052" }}>Tanlang...</option>
                      {branches.map(b => <option key={b.id} value={b.id} style={{ backgroundColor: "#112052" }}>{b.name}</option>)}
                    </select>
                    {errors.branch && <span className="text-red-400 text-xs mt-1 block">Majburiy maydon</span>}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiCalendar className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.date}</label>
                    <input {...register("date", { required: true })} type="date" className="input-luxury w-full px-4 py-3 rounded-xl text-sm" min={new Date().toISOString().split("T")[0]} />
                    {errors.date && <span className="text-red-400 text-xs mt-1 block">Majburiy</span>}
                  </div>
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiClock className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.time}</label>
                    <select {...register("time", { required: true })} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                      <option value="" style={{ backgroundColor: "#112052" }}>Vaqt...</option>
                      {times.map(time => <option key={time} value={time} style={{ backgroundColor: "#112052" }}>{time}</option>)}
                    </select>
                    {errors.time && <span className="text-red-400 text-xs mt-1 block">Majburiy</span>}
                  </div>
                  <div>
                    <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiUsers className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.guests}</label>
                    <select {...register("guests", { required: true })} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                      {[1,2,3,4,5,6,7,8,9,10,15,20].map(n => <option key={n} value={n} style={{ backgroundColor: "#112052" }}>{n} {gl}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiGift className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.occasion}</label>
                  <select {...register("occasion")} className="input-luxury w-full px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#0a1628", color: "#f0f0f0" }}>
                    <option value="" style={{ backgroundColor: "#112052" }}>Tanlang (ixtiyoriy)</option>
                    {occasions.map(occ => <option key={occ} value={occ} style={{ backgroundColor: "#112052" }}>{occ}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-silver-400 text-xs font-sans tracking-wide mb-2"><FiMessageSquare className="inline mr-2 text-gold-500" size={12} />{t.reservation.form.notes}</label>
                  <textarea {...register("notes")} rows={3} className="input-luxury w-full px-4 py-3 rounded-xl text-sm resize-none" placeholder="Qo'shimcha so'rovlar..." />
                </div>
                <button type="submit" className="btn-gold w-full py-4 rounded-xl text-sm tracking-widest">{t.reservation.form.submit}</button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
