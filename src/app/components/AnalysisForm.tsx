import { useState } from 'react';
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AnalysisForm() {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'analyzing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisId, setAnalysisId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      setStatus('submitting');
      setErrorMessage('');

      // Step 1: Submit Text API
      const submitRes = await fetch('https://verifyai-backend.azurewebsites.net/api/submittext', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'anonymous-user-123', // Hardcoded for now since there's no auth
          text: inputText
        })
      });

      if (!submitRes.ok) throw new Error('Failed to submit text for analysis.');
      const submitData = await submitRes.json();
      const submissionId = submitData.submission_id;

      if (!submissionId) throw new Error('Did not receive a submission_id');

      // Step 2: Run Analysis API
      setStatus('analyzing');
      const analyzeRes = await fetch('https://verifyai-backend.azurewebsites.net/api/runanalysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submissionId
        })
      });

      if (!analyzeRes.ok) throw new Error('Failed to run AI analysis.');
      const analyzeData = await analyzeRes.json();
      
      setAnalysisId(analyzeData.analysis_id || 'unknown-id');
      setStatus('success');
      setInputText('');

    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#2D5BFF]/20 blur-[100px] pointer-events-none" />
        
        <h2 className="text-xl text-white font-heading font-medium mb-4">Verify a New Claim</h2>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a link, tweet, or type a claim to verify..."
              className="w-full bg-[#0A0E27] border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2D5BFF]/50 focus:ring-1 focus:ring-[#2D5BFF]/50 transition-all"
              disabled={status === 'submitting' || status === 'analyzing'}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || status === 'submitting' || status === 'analyzing'}
              className="absolute right-2 px-6 py-2 bg-[#2D5BFF] hover:bg-[#1E4AD9] disabled:bg-[#2D5BFF]/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {status === 'submitting' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</>
              ) : status === 'analyzing' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing</>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#10B981] font-medium">Analysis successfully queued!</p>
                <p className="text-sm text-[#10B981]/80 mt-1">
                  Your claim has been submitted to the AI for processing.
                  <br />
                  <span className="font-mono text-xs mt-2 block opacity-70">Analysis ID: {analysisId}</span>
                </p>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#EF4444] font-medium">Verification Failed</p>
                <p className="text-sm text-[#EF4444]/80 mt-1">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
