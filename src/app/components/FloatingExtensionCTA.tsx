import { useState, useEffect } from 'react';
import { Chrome, X, Zap } from 'lucide-react';

export function FloatingExtensionCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div className="relative bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] rounded-2xl shadow-2xl shadow-[#2D5BFF]/30 p-6 max-w-sm border border-[#2D5BFF]/50">
        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Chrome className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white">Get the Browser Extension</h3>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#10B981] rounded-full">
                <Zap className="w-3 h-3 text-white" />
                <span className="text-xs text-white">Free</span>
              </div>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Fact-check any website instantly with one click
            </p>
            <button className="w-full px-4 py-2.5 bg-white text-[#2D5BFF] rounded-lg hover:bg-white/95 transition-colors flex items-center justify-center gap-2">
              <Chrome className="w-4 h-4" />
              Add to Chrome
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
