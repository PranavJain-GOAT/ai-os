import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_CUSTOM_SOLUTIONS } from "@/api/mockData";
import { Button } from "@/components/ui/button";
import { Star, Wrench, ArrowRight, Check, X, Clock, Users, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomSolutionDetail() {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const found = MOCK_CUSTOM_SOLUTIONS.find(s => s.id === id);
      setSolution(found || null);
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Solution not found</h1>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-muted border-2 border-border rounded-2xl overflow-hidden mb-8"
      >
        <div className="aspect-video relative flex items-center justify-center bg-foreground/[0.02]">
          {solution.demo_url ? (
            <iframe src={solution.demo_url} className="w-full h-full" title="Demo" />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-foreground/40" />
              </div>
              <p className="font-heading font-semibold text-lg">Custom Solution Preview</p>
              <p className="text-muted-foreground text-sm mt-1">Contact the developer for a live demo</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-background border-2 border-foreground text-foreground text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                <Wrench className="w-3 h-3" /> Customizable
              </span>
              {solution.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-foreground text-foreground" />
                  <span className="text-sm font-bold">{solution.rating}</span>
                </div>
              )}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">{solution.title}</h1>
            {solution.developer_name && (
              <p className="text-muted-foreground mb-3">by <span className="font-semibold text-foreground">{solution.developer_name}</span></p>
            )}
            <p className="text-muted-foreground text-lg leading-relaxed">{solution.description}</p>
          </div>

          {solution.what_it_does && (
            <Section title="What this does">
              <p className="text-muted-foreground leading-relaxed">{solution.what_it_does}</p>
            </Section>
          )}

          {solution.who_its_for?.length > 0 && (
            <Section title="Who this is for">
              <div className="flex flex-wrap gap-2">
                {solution.who_its_for.map((w) => (
                  <span key={w} className="inline-flex items-center gap-1.5 bg-muted border border-border px-3 py-1.5 rounded-lg text-sm font-medium">
                    <Users className="w-3.5 h-3.5" /> {w}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {solution.whats_included?.length > 0 && (
            <Section title="What's included">
              <ul className="space-y-2">
                {solution.whats_included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {solution.whats_not_included?.length > 0 && (
            <Section title="What's NOT included">
              <ul className="space-y-2">
                {solution.whats_not_included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {solution.customization_options?.length > 0 && (
            <Section title="Customization Options">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {solution.customization_options.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
                    <Wrench className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {solution.features?.length > 0 && (
            <Section title="Features">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {solution.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border-2 border-foreground rounded-2xl p-6 space-y-5">
            <div>
              <div className="font-heading text-3xl font-bold">${solution.price_min} – ${solution.price_max}</div>
              <p className="text-sm text-muted-foreground mt-1">Custom pricing</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{solution.delivery_days || 5} days delivery</span>
            </div>
            <Link to={`/install/${solution.id}?type=custom`} className="block">
              <Button className="w-full bg-foreground text-background font-heading font-bold text-base rounded-xl h-14 gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full border-2 border-foreground/20 font-heading font-semibold rounded-xl h-12 gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Developer
            </Button>
            {solution.demo_url && (
              <a href={solution.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Open demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t-2 border-border pt-8">
      <h2 className="font-heading text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}