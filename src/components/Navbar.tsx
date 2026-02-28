import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import GooeyNav from "@/components/effects/GooeyNav";

const navGroups = [
  {
    label: "Rajasthan",
    items: [
      { name: "Phad", path: "/discover?region=Rajasthan&craft=phad-painting" },
      { name: "Blue Pottery", path: "/discover?region=Rajasthan&craft=blue-pottery" },
      { name: "Bandhani", path: "/discover?region=Rajasthan&craft=bandhani" },
    ],
  },
  {
    label: "Madhya Pradesh",
    items: [
      { name: "Gond Art", path: "/discover?region=Madhya Pradesh&craft=gond-art" },
      { name: "Bagh Print", path: "/discover?region=Madhya Pradesh&craft=bagh-print" },
      { name: "Chanderi", path: "/discover?region=Madhya Pradesh&craft=chanderi-weaving" },
    ],
  },
  {
    label: "Explore",
    items: [
      { name: "Discover", path: "/discover" },
      { name: "Archive", path: "/archive" },
      { name: "Book a Visit", path: "/book/1" },
    ],
  },
];

const gooeyItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Archive", href: "/archive" },
  { label: "Book Visit", href: "/book/1" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = gooeyItems.findIndex((item) => item.href === location.pathname);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="bg-parchment border-b-2 border-gold"
        animate={{ height: open ? "auto" : 70 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="container-heritage flex items-center justify-between h-[70px]">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={logo} alt="Karigarh" className="h-12 w-12 object-contain rounded-full shadow-md ring-2 ring-warm-gold/30" />
          </Link>

          {/* Desktop GooeyNav */}
          <div className="hidden md:block">
            <GooeyNav
              items={gooeyItems}
              initialActiveIndex={activeIdx}
              animationTime={600}
              particleCount={12}
              particleDistances={[70, 10]}
              particleR={80}
              colors={[1, 2, 3, 4]}
              onItemClick={(href) => navigate(href)}
            />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-royal-brown"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Expanded card nav (mobile) */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4 container-heritage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navGroups.map((group) => (
                <div key={group.label} className="bg-sandstone p-4 border border-gold">
                  <h3 className="font-display text-sm uppercase tracking-[2px] text-heritage-heading mb-3">
                    {group.label}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className="btn-primary text-center text-xs py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
