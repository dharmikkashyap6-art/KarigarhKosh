import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, ArrowRight } from "lucide-react";
import { archiveArticles, crafts } from "@/data/crafts";

const Archive = () => {
  const [search, setSearch] = useState("");
  const filtered = archiveArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );
  const endangered = crafts.filter((c) => c.endangered);

  return (
    <div className="pt-[70px] min-h-screen bg-parchment">
      <section className="section-spacing">
        <div className="container-heritage">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl md:text-4xl text-heritage-heading mb-2">Heritage Archive</h1>
            <div className="gold-divider !mx-0 mb-8" />
          </motion.div>

          {/* Search */}
          <div className="relative mb-10 max-w-lg">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the archive..."
              className="w-full bg-sandstone border border-gold pl-10 pr-4 py-3 font-body text-sm focus:outline-none focus:ring-1 focus:ring-heritage-gold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((article) => (
                <motion.div
                  key={article.id}
                  className="bg-sandstone border border-gold p-6 hover:-translate-y-1 transition-transform cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="seal-badge text-[9px] mb-3">{article.category}</span>
                  <h3 className="font-display text-lg text-heritage-heading mb-2 mt-3">{article.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-muted-foreground">{article.readTime} read</span>
                    <span className="text-gold flex items-center gap-1 text-sm font-body">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p className="font-body text-muted-foreground py-12 col-span-2 text-center">No articles found.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-sandstone border border-gold p-5">
                <h3 className="font-display text-sm uppercase tracking-[2px] text-heritage-heading mb-4 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-deep-maroon" /> Most Endangered
                </h3>
                <ul className="space-y-3">
                  {endangered.map((c) => (
                    <li key={c.id} className="flex items-center justify-between font-body text-sm">
                      <span className="text-foreground">{c.name}</span>
                      <span className="text-muted-foreground text-xs">{c.artisanCount} left</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary p-6 text-center">
                <h3 className="font-display text-lg text-gold mb-2">Contribute to the Legacy</h3>
                <p className="font-body text-sm text-primary-foreground opacity-80 mb-4">
                  Help document and preserve disappearing craft traditions.
                </p>
                <button className="btn-secondary border-gold text-gold text-xs">Get Involved</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Archive;
