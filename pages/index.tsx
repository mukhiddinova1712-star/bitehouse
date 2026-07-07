import Head from "next/head";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Reservation from "@/components/sections/Reservation";
import Order from "@/components/sections/Order";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";

export default function Home() {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <>
      <Head>
        <title>BiteHouse — Premium & Luxury Restaurant</title>
        <meta name="description" content="BiteHouse - O'zbekistondagi eng nufuzli premium restoran. Har bir lahzani unutilmas qilamiz." />
        <meta name="keywords" content="bitehouse, premium restaurant, luxury dining, Toshkent restaurant, uzbekistan restaurant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="BiteHouse — Premium & Luxury Restaurant" />
        <meta property="og:description" content="BiteHouse - O'zbekistondagi eng nufuzli premium restoran." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bitehouse.uz" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>

      <div>
        <Navbar />

        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <Reservation />
          <Order />
          <Contact />
        </main>

        <Footer />

        {/* Admin Panel Button */}
        <button
          onClick={() => setAdminLoginOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass-dark border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500/10 transition-all shadow-gold"
          title="Admin Panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>

        {/* Admin Login */}
        <AnimatePresence>
          {adminLoginOpen && (
            <AdminLogin
              onSuccess={() => { setAdminLoginOpen(false); setAdminOpen(true); }}
              onClose={() => setAdminLoginOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Admin Panel */}
        <AnimatePresence>
          {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}
