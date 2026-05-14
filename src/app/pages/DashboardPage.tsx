import { AnalysisForm } from '../components/AnalysisForm';
import { NewsTickerBanner } from '../components/NewsTickerBanner';
import { RealTimeCounter } from '../components/RealTimeCounter';
import { DashboardFeed } from '../components/DashboardFeed';

export function DashboardPage() {
  return (
    <div className="relative">
      {/* Breaking News Ticker */}
      <div className="-mx-6 -mt-8 mb-6">
        <NewsTickerBanner />
      </div>

      <div className="space-y-12 pb-24">
        {/* Real-time Stats Counter - Glassy Style */}
        <div className="glass-dark rounded-3xl p-1 max-w-5xl mx-auto">
          <RealTimeCounter />
        </div>

        {/* Verification API Form */}
        <section className="relative z-50">
          <AnalysisForm />
        </section>

        {/* Netflix Style Horizontal Rows Feed */}
        <section className="w-full mt-8">
          <DashboardFeed />
        </section>
      </div>
    </div>
  );
}