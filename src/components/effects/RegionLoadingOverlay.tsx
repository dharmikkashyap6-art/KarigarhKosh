import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";

type Region = "Rajasthan" | "Madhya Pradesh" | null;

const mandalaPath =
  "M50 5 L55 20 L70 10 L60 25 L75 25 L62 33 L72 48 L57 40 L60 55 L50 43 L40 55 L43 40 L28 48 L38 33 L25 25 L40 25 L30 10 L45 20 Z";

const gondDots = Array.from({ length: 60 }, (_, i) => ({
  cx: 15 + (i % 10) * 8,
  cy: 15 + Math.floor(i / 10) * 14,
  r: 1.5 + Math.random() * 2,
  delay: Math.random() * 1.5,
}));

const RegionLoadingOverlay = ({
  region,
  onComplete,
}: {
  region: Region;
  onComplete: () => void;
}) => {
  if (!region) return null;

  return (
    <AnimatePresence>
      {region && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={(def: any) => {
            if (def?.opacity === 1) {
              setTimeout(onComplete, 2400);
            }
          }}
        >
          {/* Themed background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                region === "Rajasthan"
                  ? "linear-gradient(135deg, hsl(20 40% 12%), hsl(33 60% 18%), hsl(15 50% 14%))"
                  : "linear-gradient(135deg, hsl(140 25% 12%), hsl(175 40% 16%), hsl(160 30% 10%))",
            }}
          />

          {/* Rajasthan: Desert sand particles */}
          {region === "Rajasthan" && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 2 + Math.random() * 4,
                    height: 2 + Math.random() * 4,
                    background: `hsl(${35 + Math.random() * 15} ${60 + Math.random() * 30}% ${70 + Math.random() * 20}% / ${0.2 + Math.random() * 0.3})`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, 30 + Math.random() * 60, -20],
                    y: [0, -20, 10],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Madhya Pradesh: Gond art SVG pattern */}
          {region === "Madhya Pradesh" && (
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.08]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {gondDots.map((dot, i) => (
                <motion.circle
                  key={i}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={dot.r}
                  fill="hsl(175 60% 55%)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1], scale: [0, 1.2, 0.8, 1] }}
                  transition={{
                    duration: 2,
                    delay: dot.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
          )}

          {/* MP: Narmada river gradient */}
          {region === "Madhya Pradesh" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
              style={{
                background:
                  "linear-gradient(0deg, hsl(175 50% 30%), hsl(160 40% 20% / 0), transparent)",
              }}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Rajasthan: Rotating Mandala */}
            {region === "Rajasthan" && (
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <motion.path
                    d={mandalaPath}
                    fill="none"
                    stroke="hsl(46 100% 50%)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="18"
                    fill="none"
                    stroke="hsl(33 100% 50%)"
                    strokeWidth="0.5"
                    strokeDasharray="3 2"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "50px 50px" }}
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="hsl(22 100% 50% / 0.4)"
                    strokeWidth="0.3"
                    strokeDasharray="5 3"
                  />
                </motion.svg>

                {/* Music icon pulse */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Music size={24} style={{ color: "hsl(46 100% 50%)" }} />
                </motion.div>
              </div>
            )}

            {/* Madhya Pradesh: Gond art animated symbol */}
            {region === "Madhya Pradesh" && (
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <motion.svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Tree of life - Gond style */}
                  <motion.line
                    x1="50" y1="85" x2="50" y2="25"
                    stroke="hsl(175 60% 50%)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  {[
                    { x1: 50, y1: 35, x2: 30, y2: 20 },
                    { x1: 50, y1: 35, x2: 70, y2: 20 },
                    { x1: 50, y1: 50, x2: 25, y2: 40 },
                    { x1: 50, y1: 50, x2: 75, y2: 40 },
                    { x1: 50, y1: 65, x2: 30, y2: 58 },
                    { x1: 50, y1: 65, x2: 70, y2: 58 },
                  ].map((branch, i) => (
                    <motion.line
                      key={i}
                      {...branch}
                      stroke="hsl(140 40% 45%)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                    />
                  ))}
                  {[20, 40, 58].map((y, i) =>
                    [28, 72].map((x, j) => (
                      <motion.circle
                        key={`leaf-${i}-${j}`}
                        cx={x + (j === 0 ? -2 : 2)}
                        cy={y - 2}
                        r="4"
                        fill="hsl(140 50% 40% / 0.6)"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.2 + j * 0.1 }}
                      />
                    ))
                  )}
                </motion.svg>
              </div>
            )}

            {/* Text animation */}
            <motion.p
              className="font-display text-lg md:text-xl tracking-[3px] uppercase text-center max-w-md px-4"
              style={{
                color:
                  region === "Rajasthan"
                    ? "hsl(46 100% 70%)"
                    : "hsl(175 50% 70%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {region === "Rajasthan"
                ? "Exploring the Royal Crafts of Rajasthan…"
                : "Discovering the Heart of India's Handicrafts…"}
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    region === "Rajasthan"
                      ? "linear-gradient(90deg, hsl(46 100% 50%), hsl(22 100% 50%))"
                      : "linear-gradient(90deg, hsl(175 60% 50%), hsl(140 50% 40%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegionLoadingOverlay;
