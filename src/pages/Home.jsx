import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { MOCK_PRODUCTS, MOCK_CUSTOM_SOLUTIONS } from "@/api/mockData";

import HeroSection from "../components/home/HeroSection";
import ModeSwitch from "../components/home/ModeSwitch";
import SearchFilter from "../components/home/SearchFilter";
import ProductCard from "../components/home/ProductCard";
import CustomCard from "../components/home/CustomCard";
import UseCasesSection from "../components/home/UseCasesSection";
import TrustSection from "../components/home/TrustSection";
import WhySection from "../components/home/WhySection";
import DeveloperCTA from "../components/home/DeveloperCTA";
import WordReveal from "../components/home/WordReveal";
import { MarketplaceSkeletons } from "../components/home/MarketplaceSkeleton";

export default function Home() {
  const [mode, setMode] = useState("instant");
  const [products, setProducts] = useState([]);
  const [customSolutions, setCustomSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "", price: "", setupTime: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("search");
    if (q) setSearchQuery(q);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      
      const isPlaceholder = import.meta.env.VITE_BASE44_APP_ID === 'placeholder_id' || !import.meta.env.VITE_BASE44_APP_ID;
      if (isPlaceholder) {
        setTimeout(() => {
          setProducts(MOCK_PRODUCTS);
          setCustomSolutions(MOCK_CUSTOM_SOLUTIONS);
          setLoading(false);
        }, 500);
        return;
      }

      try {
        const [p, c] = await Promise.all([
          base44.entities.Product.list(),
          base44.entities.CustomSolution.list(),
        ]);
        setProducts(p && p.length > 0 ? p : MOCK_PRODUCTS);
        setCustomSolutions(c && c.length > 0 ? c : MOCK_CUSTOM_SOLUTIONS);
      } catch (err) {
        console.warn("Using mock data due to API error", err);
        setProducts(MOCK_PRODUCTS);
        setCustomSolutions(MOCK_CUSTOM_SOLUTIONS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProducts = useMemo(() => {
    let items = products.filter((p) => p.status === "active" || !p.status);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((p) => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (filters.category) items = items.filter((p) => p.category === filters.category);
    if (filters.price) {
      if (filters.price === "Under $50") items = items.filter((p) => p.price < 50);
      else if (filters.price === "$50–$200") items = items.filter((p) => p.price >= 50 && p.price <= 200);
      else if (filters.price === "$200+") items = items.filter((p) => p.price > 200);
    }
    return items;
  }, [products, searchQuery, filters]);

  const filteredCustom = useMemo(() => {
    let items = customSolutions.filter((s) => s.status === "active");
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter((s) => s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q));
    }
    if (filters.category) items = items.filter((s) => s.category === filters.category);
    return items;
  }, [customSolutions, searchQuery, filters]);

  if (loading) return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <MarketplaceSkeletons />
      </div>
    </div>
  );

  return (
    <div>
      <HeroSection />
      <WhySection />

      {/* Products section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="instant">
        <ModeSwitch mode={mode} onModeChange={setMode} />
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {mode === "instant" ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <WordReveal text="Instant Setup" tag="h2" className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: 'Georgia,serif', letterSpacing: '-0.04em' }} />
                <p className="text-white/30 text-sm mt-1 font-mono">Install and go live in minutes</p>
              </div>
              <span className="text-white/20 text-xs font-mono">{filteredProducts.length} SOLUTIONS</span>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 glass rounded-3xl">
                <p className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'Georgia,serif' }}>No products found</p>
                <p className="text-white/30 text-sm font-mono">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* First card is featured / full-width */}
                {filteredProducts.slice(0, 1).map((p) => (
                  <div key={p.id} className="sm:col-span-2 lg:col-span-3">
                    <ProductCard product={p} index={0} featured />
                  </div>
                ))}
                {filteredProducts.slice(1).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div id="custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <WordReveal text="Custom Solutions" tag="h2" className="text-white font-bold text-3xl sm:text-4xl" style={{ fontFamily: 'Georgia,serif', letterSpacing: '-0.04em' }} />
                <p className="text-white/30 text-sm mt-1 font-mono">Developer-built, tailored to your needs</p>
              </div>
              <span className="text-white/20 text-xs font-mono">{filteredCustom.length} SOLUTIONS</span>
            </div>
            {filteredCustom.length === 0 ? (
              <div className="text-center py-20 glass rounded-3xl">
                <p className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'Georgia,serif' }}>No custom solutions found</p>
                <p className="text-white/30 text-sm font-mono">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCustom.map((s, i) => (
                  <CustomCard key={s.id} solution={s} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <UseCasesSection />
      <TrustSection />
      <DeveloperCTA />
    </div>
  );
}