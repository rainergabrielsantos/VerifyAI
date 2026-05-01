import { useState, useEffect, useRef } from 'react';
import { TrendingUp, AlertCircle, Users, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

export function RealTimeCounter() {
  const [claimsChecked, setClaimsChecked] = useState(847234);
  const [activeUsers, setActiveUsers] = useState(3421);
  const [debunksToday, setDebunksToday] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setClaimsChecked(prev => prev + Math.floor(Math.random() * 3));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      if (Math.random() > 0.85) {
        setDebunksToday(prev => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0A0E27]/40 backdrop-blur-md border-y border-white/5 py-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2D5BFF]/5 to-transparent animate-pulse pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm">
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
            </span>
            <span className="text-[#EF4444] font-bold text-[10px] uppercase tracking-widest">Live Feed</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#10B981]/10">
              <Activity className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#94A3B8] text-[10px] uppercase tracking-wider font-medium">Global Analyses</span>
              <span className="text-white font-bold tabular-nums text-base">
                <AnimatedNumber value={claimsChecked} />
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/5" />

          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#2D5BFF]/10">
              <Users className="w-4 h-4 text-[#2D5BFF]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#94A3B8] text-[10px] uppercase tracking-wider font-medium">Users Online</span>
              <span className="text-white font-bold tabular-nums text-base">
                <AnimatedNumber value={activeUsers} />
              </span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/5" />

          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#F59E0B]/10">
              <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#94A3B8] text-[10px] uppercase tracking-wider font-medium">Daily Debunks</span>
              <span className="text-white font-bold tabular-nums text-base">
                <AnimatedNumber value={debunksToday} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
