import { useState } from "react";
import { crafts } from "@/data/crafts";
import { craftsmen } from "@/data/craftsmen";
import CraftsmanCard from "@/components/CraftsmanCard";
import { X } from "lucide-react";

const regions = ["All", "Rajasthan", "Madhya Pradesh"] as const;
const categories = ["All", "Ceramics", "Painting", "Textile"] as const;

const Discover = () => {
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = craftsmen.filter((c) => {
    if (regionFilter !== "All" && c.region !== regionFilter) return false;
    const craft = crafts.find((cr) => cr.image === c.image);
    if (categoryFilter !== "All" && craft?.category !== categoryFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.craft.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeFilters = [
    regionFilter !== "All" ? regionFilter : null,
    categoryFilter !== "All" ? categoryFilter : null,
  ].filter(Boolean);

  return (
    <div className="pt-[70px] min-h-screen bg-parchment">
      <section className="section-spacing">
        <div className="container-heritage">
          <h1 className="font-display text-3xl md:text-4xl text-heritage-heading mb-2">Discover Artisans</h1>
          <div className="gold-divider !mx-0 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar filters */}
            <aside className="space-y-6">
              <div className="bg-sandstone p-5 border border-gold">
                <h3 className="font-display text-sm uppercase tracking-[2px] text-heritage-heading mb-4">Search</h3>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search artisans..."
                  className="w-full bg-parchment border border-gold px-3 py-2 font-body text-sm focus:outline-none focus:ring-1 focus:ring-heritage-gold"
                />
              </div>
              <div className="bg-sandstone p-5 border border-gold">
                <h3 className="font-display text-sm uppercase tracking-[2px] text-heritage-heading mb-4">Region</h3>
                <div className="space-y-2">
                  {regions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegionFilter(r)}
                      className={`block w-full text-left font-body text-sm px-3 py-2 transition-colors ${
                        regionFilter === r ? "bg-primary text-primary-foreground" : "hover:bg-parchment"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-sandstone p-5 border border-gold">
                <h3 className="font-display text-sm uppercase tracking-[2px] text-heritage-heading mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategoryFilter(c)}
                      className={`block w-full text-left font-body text-sm px-3 py-2 transition-colors ${
                        categoryFilter === c ? "bg-primary text-primary-foreground" : "hover:bg-parchment"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results */}
            <div>
              {activeFilters.length > 0 && (
                <div className="flex gap-2 mb-6 flex-wrap">
                  {activeFilters.map((f) => (
                    <span key={f} className="seal-badge flex items-center gap-1">
                      {f}
                      <button onClick={() => {
                        if (f === regionFilter) setRegionFilter("All");
                        if (f === categoryFilter) setCategoryFilter("All");
                      }}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} artisans found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((c) => (
                  <CraftsmanCard key={c.id} craftsman={c} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center font-body text-muted-foreground py-16">No artisans match your filters.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;
