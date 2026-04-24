import { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Users } from 'lucide-react';

export function RealTimeCounter() {
  const [claimsChecked, setClaimsChecked] = useState(847234);
  const [activeUsers, setActiveUsers] = useState(3421);
  const [debunksToday, setDebunksToday] = useState(847);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setClaimsChecked(prev => prev + Math.floor(Math.random() * 3));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      if (Math.random() > 0.7) {
        setDebunksToday(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A0E27]/80 backdrop-blur-sm border-t border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-[#94A3B8]">Claims Checked:</span>
            <span className="text-white font-semibold tabular-nums">{claimsChecked.toLocaleString()}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#94A3B8]">Active Now:</span>
            <span className="text-white font-semibold tabular-nums">{activeUsers.toLocaleString()}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <span className="text-[#94A3B8]">Debunked Today:</span>
            <span className="text-white font-semibold tabular-nums">{debunksToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
