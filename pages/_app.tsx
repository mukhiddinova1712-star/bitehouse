import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <CartProvider>
          <OrderProvider>
            <div suppressHydrationWarning>
              <Component {...pageProps} />
            </div>
            <Toaster position="bottom-right" />
          </OrderProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
