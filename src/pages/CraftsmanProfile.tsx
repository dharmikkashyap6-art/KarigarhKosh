import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Star } from "lucide-react";
import { craftsmen } from "@/data/craftsmen";
import { getCraftImage } from "@/lib/craftImages";

const tabs = ["About", "Videos", "Booking"] as const;

const CraftsmanProfile = () => {
  const { id } = useParams();
  const craftsman = craftsmen.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("About");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  if (!craftsman) {
    return (
      <div className="pt-[70px] min-h-screen bg-parchment flex items-center justify-center">
        <p className="font-display text-xl text-heritage-heading">Artisan not found.</p>
      </div>
    );
  }

  const img = getCraftImage(craftsman.image);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
  const slots = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"];

  const handleBook = () => {
    if (selectedDate !== null && selectedSlot) setBooked(true);
  };

  return (
    <div className="pt-[70px] min-h-screen bg-parchment">
      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={img} alt={craftsman.craft} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(20 38% 12% / 0.8), transparent)" }} />
      </div>

      {/* Profile card */}
      <div className="container-heritage px-4 -mt-24 relative z-10">
        <div className="bg-parchment border border-gold p-6 md:p-8 max-w-3xl mx-auto">
          <Link to="/discover" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={14} /> Back to Discover
          </Link>
          <h1 className="font-display text-2xl md:text-3xl text-heritage-heading mb-1">{craftsman.name}</h1>
          <p className="font-body text-muted-foreground mb-2">{craftsman.craft} · {craftsman.location}, {craftsman.region}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1 text-gold text-sm"><Star size={14} fill="currentColor" /> {craftsman.rating}</span>
            <span className="font-body text-sm text-muted-foreground">{craftsman.experience}</span>
            {craftsman.endangered && <span className="seal-badge text-[9px] bg-primary text-primary-foreground">Endangered</span>}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gold mb-6">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => { setActiveTab(t); setBooked(false); }}
                className={`font-display text-sm uppercase tracking-[2px] px-4 py-3 border-b-2 transition-all ${
                  activeTab === t ? "border-heritage-gold text-heritage-heading" : "border-transparent text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "About" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-display text-lg text-heritage-heading mb-3">Story</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{craftsman.story}</p>
              <h3 className="font-display text-lg text-heritage-heading mb-3">Materials</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {craftsman.materials.map((m) => (
                  <span key={m} className="seal-badge text-[10px]">{m}</span>
                ))}
              </div>
              <h3 className="font-display text-lg text-heritage-heading mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {craftsman.specialties.map((s) => (
                  <span key={s} className="seal-badge text-[10px]">{s}</span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Videos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["The Making Process", "Workshop Tour", "Interview"].map((title) => (
                <div key={title} className="relative bg-sandstone border border-gold overflow-hidden group cursor-pointer">
                  <img src={img} alt={title} className="w-full h-40 object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-gold">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-display text-sm text-heritage-heading">{title}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "Booking" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {booked ? (
                <div className="text-center py-12 border border-gold bg-sandstone">
                  <h3 className="font-display text-2xl text-gold mb-3">Booking Confirmed</h3>
                  <p className="font-body text-muted-foreground mb-1">
                    {dates[selectedDate!].toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at {selectedSlot}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">with {craftsman.name}</p>
                  <div className="gold-divider my-6" />
                  <p className="font-body text-gold text-lg">₹{craftsman.pricePerHour} / session</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg text-heritage-heading mb-4">Select Date</h3>
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(i)}
                        className={`p-2 text-center border font-body text-sm transition-all ${
                          selectedDate === i ? "bg-primary text-primary-foreground border-primary" : "border-gold hover:bg-sandstone"
                        }`}
                      >
                        <div className="text-[10px] uppercase">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                        <div className="text-lg font-semibold">{d.getDate()}</div>
                      </button>
                    ))}
                  </div>
                  {selectedDate !== null && (
                    <>
                      <h3 className="font-display text-lg text-heritage-heading mb-4">Select Time</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                        {slots.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSlot(s)}
                            className={`p-3 text-center border font-body text-sm transition-all ${
                              selectedSlot === s ? "bg-primary text-primary-foreground border-primary" : "border-gold hover:bg-sandstone"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {selectedDate !== null && selectedSlot && (
                    <div className="border-t border-gold pt-6 flex items-center justify-between">
                      <div>
                        <p className="font-body text-sm text-muted-foreground">Session Price</p>
                        <p className="font-display text-2xl text-gold">₹{craftsman.pricePerHour}</p>
                      </div>
                      <button onClick={handleBook} className="btn-primary">
                        Confirm Booking
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
};

export default CraftsmanProfile;
