"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import PageLoader from "./PageLoader";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 950);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <PageLoader visible={loading} />

      <ScrollToTopOnMount />
      <Navbar />

      {/* Navbar fixed olduğu için sayfayı aşağı itiyoruz */}
      <main className="pt-24">
        {children}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
