import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Loader2, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import RegionLoadingOverlay from "@/components/effects/RegionLoadingOverlay";
import logo from "@/assets/logo.png";
import { craftsmen } from "@/data/craftsmen";
import { crafts } from "@/data/crafts";
import CraftsmanCard from "@/components/CraftsmanCard";
import CraftCard from "@/components/CraftCard";
import { getCraftImage } from "@/lib/craftImages";
import TiltedCard from "@/components/effects/TiltedCard";
import LightRays from "@/components/effects/LightRays";

const CRAFTSMEN_COORDS: Record<string, { lat: number; lng: number }> = {
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Bhilwara: { lat: 25.3407, lng: 74.6313 },
  Jodhpur: { lat: 26.2389, lng: 73.0243 },
  Dindori: { lat: 22.9462, lng: 81.0767 },
  Chanderi: { lat: 24.7172, lng: 78.1328 },
  Dhar: { lat: 22.5976, lng: 75.3026 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

const StatCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="font-display text-4xl md:text-5xl text-gold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {value}
      </motion.p>
      <p className="font-body text-sm text-parchment opacity-70 uppercase tracking-[2px]">{label}</p>
    </div>
  );
};

const regionTransitionVariants = {
  rajasthan: {
    initial: { opacity: 0, x: -60, scale: 0.92, rotate: -2 },
    animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, x: 60, scale: 0.92, rotate: 2 },
  },
  "madhya pradesh": {
    initial: { opacity: 0, x: 60, scale: 0.92, rotate: 2 },
    animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, x: -60, scale: 0.92, rotate: -2 },
  },
};

const cardStagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const cardChild = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.25 } },
};

const CollapsibleMapCard = ({ craftsman }: { craftsman: typeof craftsmen[0] }) => {
  const [showMap, setShowMap] = useState(false);
  const coords = CRAFTSMEN_COORDS[craftsman.location];

  return (
    <div className="bg-parchment border border-gold overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className={craftsman.region === "Rajasthan" ? "text-deep-maroon" : "text-peacock-teal"} />
          <span className="font-display text-sm text-heritage-heading">{craftsman.location}</span>
        </div>
        <h4 className="font-display text-base text-heritage-heading mb-1">{craftsman.name}</h4>
        <p className="font-body text-sm text-muted-foreground mb-3">{craftsman.craft}</p>
        <div className="flex items-center gap-3">
          <Link to={`/book/${craftsman.id}`} className="btn-primary text-xs py-2 px-4 inline-block">
            Book Visit
          </Link>
          {coords && (
            <button
              onClick={() => setShowMap(!showMap)}
              className="inline-flex items-center gap-1 text-xs font-display uppercase tracking-[1px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin size={12} />
              View Location
              <motion.span animate={{ rotate: showMap ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={12} />
              </motion.span>
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showMap && coords && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 200, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="w-full h-[200px] relative">
              <iframe
                title={`Map - ${craftsman.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(craftsman.location + ", " + craftsman.region + ", India")}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-b-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [activeRegion, setActiveRegion] = useState<"Rajasthan" | "Madhya Pradesh">("Rajasthan");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingRegion, setLoadingRegion] = useState<"Rajasthan" | "Madhya Pradesh" | null>(null);
  const regionSectionRef = useRef<HTMLDivElement>(null);
  const regionCrafts = crafts.filter((c) => c.region === activeRegion);

  const handleRegionSwitch = (region: "Rajasthan" | "Madhya Pradesh") => {
    if (region === activeRegion) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRegion(region);
      setIsTransitioning(false);
    }, 400);
  };

  const handleHeroExplore = useCallback((region: "Rajasthan" | "Madhya Pradesh") => {
    setLoadingRegion(region);
  }, []);

  const handleOverlayComplete = useCallback(() => {
    const region = loadingRegion;
    setLoadingRegion(null);
    if (region) {
      setActiveRegion(region);
      setTimeout(() => {
        regionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [loadingRegion]);

  return (
    <div>
      {/* Loading Overlay */}
      <RegionLoadingOverlay region={loadingRegion} onComplete={handleOverlayComplete} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(20 40% 8% / 0.92), hsl(22 100% 50% / 0.1), hsl(210 30% 10% / 0.85))" }} />
        
        {/* LightRays Background Effect */}
        <div className="absolute inset-0 pointer-events-auto z-[1]">
          <LightRays
            raysOrigin="top-center"
            raysColor="#e8740e"
            raysSpeed={0.6}
            lightSpread={1.5}
            rayLength={2.5}
            pulsating={true}
            fadeDistance={1.2}
            saturation={1.2}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.05}
            distortion={0.3}
            className="w-full h-full"
          />
        </div>

        {/* Watermark logo */}
        <img src={logo} alt="" className="absolute right-10 bottom-10 w-40 h-40 object-contain rounded-full opacity-[0.04] z-[2]" />

        <div className="relative z-10 container-heritage flex flex-col items-center text-center pt-28 pb-20 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-3xl">
            <div className="flex gap-3 mb-6 justify-center">
              <span className="seal-badge">Rajasthan</span>
              <span className="seal-badge">Madhya Pradesh</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-parchment leading-tight mb-6">
              Where Ancient Hands<br />Shape Living Art
            </h1>
            <p className="font-body text-lg md:text-xl text-parchment opacity-80 mb-10 max-w-2xl mx-auto">
              Discover India's most endangered craft traditions. Meet the master artisans. Preserve their legacy before it fades into history.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => handleHeroExplore("Rajasthan")}
                className="btn-primary inline-flex items-center gap-2"
              >
                🏜️ Explore Rajasthan Crafts
              </button>
              <button
                onClick={() => handleHeroExplore("Madhya Pradesh")}
                className="btn-secondary inline-flex items-center gap-2"
              >
                💚 Explore Madhya Pradesh Crafts
              </button>
            </div>
          </motion.div>

          {/* TiltedCards Grid below CTA */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              { img: "pottery", label: "Blue Pottery" },
              { img: "phad", label: "Phad Painting" },
              { img: "bandhani", label: "Bandhani" },
              { img: "gond", label: "Gond Art" },
            ].map((craft) => (
              <TiltedCard
                key={craft.img}
                imageSrc={getCraftImage(craft.img)}
                altText={craft.label}
                captionText={craft.label}
                containerHeight="200px"
                containerWidth="100%"
                imageHeight="190px"
                imageWidth="100%"
                scaleOnHover={1.1}
                rotateAmplitude={14}
                showMobileWarning={false}
                showTooltip={true}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-royal section-spacing">
        <div className="container-heritage grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter value="200+" label="Artisans" />
          <StatCounter value="89" label="Living Traditions" />
          <StatCounter value="600" label="Years of Heritage" />
          <StatCounter value="2" label="Regions Preserved" />
        </div>
      </section>

      {/* DUAL REGION SHOWCASE */}
      <section ref={regionSectionRef} className="section-spacing bg-parchment overflow-hidden">
        <div className="container-heritage">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-heritage-heading mb-4">Explore by Region</h2>
            <div className="gold-divider mb-8" />
            <div className="flex justify-center gap-0">
              {(["Rajasthan", "Madhya Pradesh"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionSwitch(r)}
                  className={`relative font-display text-sm uppercase tracking-[2px] px-6 py-3 border-b-2 transition-all duration-300 ${
                    activeRegion === r
                      ? r === "Rajasthan"
                        ? "border-deep-maroon text-deep-maroon"
                        : "border-peacock-teal text-peacock-teal"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                  {activeRegion === r && (
                    <motion.div
                      layoutId="region-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{
                        background: r === "Rajasthan"
                          ? "linear-gradient(90deg, hsl(15 50% 22%), hsl(22 100% 50%))"
                          : "linear-gradient(90deg, hsl(175 50% 28%), hsl(175 70% 40%))",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Region themed decorative element */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion + "-badge"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-display text-xs uppercase tracking-[3px]"
                style={{
                  background: activeRegion === "Rajasthan"
                    ? "linear-gradient(135deg, hsl(15 50% 22% / 0.1), hsl(22 100% 50% / 0.15))"
                    : "linear-gradient(135deg, hsl(175 50% 28% / 0.1), hsl(175 70% 40% / 0.15))",
                  color: activeRegion === "Rajasthan" ? "hsl(15 50% 22%)" : "hsl(175 50% 28%)",
                  border: `1px solid ${activeRegion === "Rajasthan" ? "hsl(15 50% 22% / 0.3)" : "hsl(175 50% 28% / 0.3)"}`,
                }}
              >
                {isTransitioning && <Loader2 size={12} className="animate-spin" />}
                {activeRegion === "Rajasthan" ? "🏜️ Land of Kings" : "💚 Heart of India"}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Animated craft cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              variants={cardStagger}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {regionCrafts.map((craft, i) => (
                <motion.div
                  key={craft.id}
                  variants={cardChild}
                  className="relative"
                >
                  {/* Region-themed glow behind card */}
                  <div
                    className="absolute -inset-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    style={{
                      background: activeRegion === "Rajasthan"
                        ? "hsl(22 100% 50% / 0.15)"
                        : "hsl(175 50% 28% / 0.15)",
                    }}
                  />
                  <CraftCard craft={craft} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section-spacing bg-sandstone">
        <div className="container-heritage">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-heritage-heading mb-4">Heritage Map</h2>
            <div className="gold-divider mb-4" />
            <p className="font-body text-muted-foreground">Explore craft origins across Rajasthan & Madhya Pradesh</p>
          </AnimatedSection>

          {/* Full map overview */}
          <AnimatedSection className="mb-12">
            <div className="w-full h-[400px] rounded-sm overflow-hidden border border-gold shadow-lg">
              <iframe
                title="Heritage Craft Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700000!2d75.5!3d24.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMwJzAwLjAiTiA3NcKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftsmen.map((c) => (
              <AnimatedSection key={c.id}>
                <CollapsibleMapCard craftsman={c} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-spacing bg-parchment">
        <div className="container-heritage">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-heritage-heading mb-4">How It Works</h2>
            <div className="gold-divider" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Discover", desc: "Explore endangered crafts and master artisans from Rajasthan & Madhya Pradesh." },
              { num: "02", title: "Book", desc: "Schedule an immersive workshop session with a heritage craftsman." },
              { num: "03", title: "Preserve", desc: "Support living traditions. Every visit helps sustain ancient art forms." },
            ].map((step) => (
              <AnimatedSection key={step.num} className="relative text-center">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 font-display text-8xl text-heritage-gold opacity-10">
                  {step.num}
                </span>
                <div className="relative pt-12">
                  <h3 className="font-display text-xl text-heritage-heading mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ink section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, hsl(50 100% 50%) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="container-heritage relative z-10 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <blockquote className="font-display italic text-2xl md:text-3xl text-parchment leading-relaxed mb-8">
              "Each thread I weave carries the prayers of my ancestors. When the loom falls silent, their voices will be lost forever."
            </blockquote>
            <div className="gold-divider mb-6" />
            <p className="font-body text-gold uppercase tracking-[2px] text-sm">Rekha Verma</p>
            <p className="font-body text-parchment opacity-50 text-sm">Chanderi Weaver, 25 Years</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-spacing bg-parchment">
        <div className="container-heritage text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="gold-divider mb-8" />
            <h2 className="font-display text-3xl md:text-4xl text-heritage-heading leading-snug mb-6">
              Before the Last Master<br />Lays Down His Tools
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Every craft lost is a civilization forgotten. Join us in preserving India's living heritage.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/discover" className="btn-primary inline-flex items-center gap-2">
                Discover Artisans <ArrowRight size={16} />
              </Link>
              <Link to="/archive" className="btn-secondary">
                Explore Archive
              </Link>
            </div>
            <div className="gold-divider mt-8" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
