import { HeroSection } from '../components/HeroSection';
import { TrendingClaims } from '../components/TrendingClaims';
import { DebunkedHighlights } from '../components/DebunkedHighlights';
import { ImpactTracker } from '../components/ImpactTracker';
import { AnalysisResultPreview } from '../components/AnalysisResultPreview';
import { FloatingExtensionCTA } from '../components/FloatingExtensionCTA';
import { BreakingDebunks } from '../components/BreakingDebunks';
import { LiveClaimsFeed } from '../components/LiveClaimsFeed';
import { CategoryTabs } from '../components/CategoryTabs';
import { FeaturedClaimOfDay } from '../components/FeaturedClaimOfDay';
import { QuickAnalyzeBar } from '../components/QuickAnalyzeBar';
import { NewsTickerBanner } from '../components/NewsTickerBanner';
import { RealTimeCounter } from '../components/RealTimeCounter';

export function DashboardPage() {
  return (
    <div className="relative">
      {/* Breaking News Ticker */}
      <div className="-mx-6 -mt-8 mb-6">
        <NewsTickerBanner />
      </div>

      <div className="space-y-16 pb-24">
        {/* Real-time Stats Counter - Glassy Style */}
        <div className="glass-dark rounded-3xl p-1">
          <RealTimeCounter />
        </div>

        {/* Featured Section */}
        <section className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D5BFF]/10 to-[#10B981]/10 blur-[80px] -z-10 group-hover:opacity-75 transition-opacity" />
          <FeaturedClaimOfDay />
        </section>

        {/* Action Hub */}
        <div className="grid lg:grid-cols-[1fr,350px] gap-12 items-start">
          <div className="space-y-12">
            {/* Category Navigation */}
            <div className="sticky top-[88px] z-40 bg-[#0A0E27]/50 backdrop-blur-md py-4 -mx-2 px-2 rounded-xl border border-white/5 shadow-xl">
              <CategoryTabs />
            </div>

            {/* Main Claims Feed */}
            <LiveClaimsFeed />
          </div>

          {/* Sidebar / Secondary Content */}
          <aside className="space-y-8 hidden lg:block">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <ImpactTracker />
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <DebunkedHighlights />
            </div>
            <div className="glass rounded-3xl p-6 border border-white/10">
              <TrendingClaims />
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Extension CTA */}
      <div className="fixed bottom-8 right-8 z-[100] animate-float">
        <FloatingExtensionCTA />
      </div>
    </div>
  );
}