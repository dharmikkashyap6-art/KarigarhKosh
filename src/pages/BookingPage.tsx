import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { craftsmen } from "@/data/craftsmen";
import { getCraftImage } from "@/lib/craftImages";

const BookingPage = () => {
  const { id } = useParams();
  const craftsman = craftsmen.find((c) => c.id === id) || craftsmen[0];
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const img = getCraftImage(craftsman.image);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
  const slots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

  return (
    <div className="pt-[70px] min-h-screen bg-parchment">
      <section className="section-spacing">
        <div className="container-heritage max-w-3xl">
          <Link to="/discover" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="bg-sandstone border border-gold p-6 md:p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img src={img} alt={craftsman.name} className="w-16 h-16 object-cover border border-gold" />
              <div>
                <h1 className="font-display text-xl text-heritage-heading">{craftsman.name}</h1>
                <p className="font-body text-sm text-muted-foreground">{craftsman.craft} · {craftsman.location}</p>
              </div>
            </div>
            <div className="gold-divider !mx-0" />
          </div>

          {booked ? (
            <motion.div
              className="bg-sandstone border border-gold p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border-2 border-gold">
                <Check size={32} className="text-gold" />
              </div>
              <h2 className="font-display text-2xl text-gold mb-3">Booking Confirmed</h2>
              <p className="font-body text-muted-foreground mb-1">
                {dates[selectedDate!].toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="font-body text-muted-foreground mb-4">{selectedSlot} with {craftsman.name}</p>
              <div className="gold-divider my-6" />
              <p className="font-display text-3xl text-gold mb-6">₹{craftsman.pricePerHour}</p>
              <Link to="/" className="btn-primary">Return Home</Link>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="bg-sandstone border border-gold p-6">
                <h2 className="font-display text-lg text-heritage-heading mb-4">Select Date</h2>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className={`p-3 text-center border font-body text-sm transition-all ${
                        selectedDate === i ? "bg-primary text-primary-foreground border-primary" : "border-gold hover:bg-parchment"
                      }`}
                    >
                      <div className="text-[10px] uppercase">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                      <div className="text-lg font-semibold">{d.getDate()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate !== null && (
                <motion.div
                  className="bg-sandstone border border-gold p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-lg text-heritage-heading mb-4">Select Time</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSlot(s)}
                        className={`p-3 text-center border font-body text-sm transition-all ${
                          selectedSlot === s ? "bg-primary text-primary-foreground border-primary" : "border-gold hover:bg-parchment"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedDate !== null && selectedSlot && (
                <motion.div
                  className="bg-sandstone border border-gold p-6 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total</p>
                    <p className="font-display text-2xl text-gold">₹{craftsman.pricePerHour}</p>
                  </div>
                  <button onClick={() => setBooked(true)} className="btn-primary">
                    Confirm Booking
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
