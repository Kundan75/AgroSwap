import { useLocation } from "react-router-dom";
import Router from "./Routes/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const hideNavbarFooter = [
    "/login",
    "/signup",
    "/signin",
    "/forgot-password",
  ].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <main className="min-h-screen w-full">
        <Router />
      </main>

      {!hideNavbarFooter && <Footer />}

      {/* 🔥 TOAST DESIGN */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
    color: "#000", // ✅ FORCE BLACK TEXT
    fontWeight: "600",
  }}
        toastClassName={() =>
  "backdrop-blur-xl bg-white/80 border border-white/50 shadow-xl rounded-2xl px-4 py-3 flex items-center"
}
        bodyClassName="text-sm font-semibold text-black"
        progressClassName="bg-gradient-to-r from-emerald-500 to-sky-500"
      />
    </>
  );
}

export default App;