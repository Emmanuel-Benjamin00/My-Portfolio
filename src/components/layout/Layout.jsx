import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={`site-shell ${isHome ? "site-shell--home" : ""}`}>
      {!isHome && <div className="site-bg-grid" aria-hidden="true" />}
      <div className={`site-bg-glow ${isHome ? "site-bg-glow--hidden" : ""}`} aria-hidden="true" />
      {!isHome && <div className="site-top-blur" aria-hidden="true" />}
      <ScrollToTop />
      <Navbar />
      <main className={isHome ? "main--home" : ""}>
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  );
}

export default Layout;
