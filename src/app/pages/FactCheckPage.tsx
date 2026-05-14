<<<<<<< HEAD
import { Search, FileText, Upload, ExternalLink, CheckCircle, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AnalysisResult {
  claim: string;
  status: 'true' | 'false' | 'misleading';
=======
import { Search, FileText, Upload, ExternalLink, CheckCircle, XCircle, AlertTriangle, Sparkles, ShieldAlert, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { mockClaims } from '../mockData';

interface AnalysisResult {
  claim: string;
  status: 'true' | 'false' | 'unverified';
>>>>>>> main
  credibility: number;
  sources: { name: string; url: string; reliability: number }[];
  aiDetection: number;
  claims: number;
<<<<<<< HEAD
}

export function FactCheckPage() {
=======
  reasoning: string;
}

export function FactCheckPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');

>>>>>>> main
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

<<<<<<< HEAD
  const handleAnalyze = () => {
    if (!inputText && !uploadedFile) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResult({
        claim: inputText || uploadedFile?.name || '',
        status: 'true',
        credibility: 87,
        sources: [
          { name: 'Reuters', url: 'https://reuters.com', reliability: 95 },
          { name: 'Associated Press', url: 'https://apnews.com', reliability: 92 },
          { name: 'BBC News', url: 'https://bbc.com', reliability: 90 }
        ],
        aiDetection: 2,
        claims: 12
      });
      setIsAnalyzing(false);
    }, 2000);
=======
  useEffect(() => {
    if (idParam) {
      const foundClaim = mockClaims.find(c => c.id === idParam);
      if (foundClaim) {
        setInputText(foundClaim.headline);
        handleAnalyze(foundClaim.headline, foundClaim);
      }
    }
  }, [idParam]);

  const handleAnalyze = async (textToAnalyze?: string, preloadedClaim?: any) => {
    const text = textToAnalyze || inputText || uploadedFile?.name;
    if (!text) return;

    setIsAnalyzing(true);
    setResult(null); // Clear previous result
    
    // Call the local backend API
    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim: text }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      setResult({
        claim: text,
        status: data.status,
        credibility: data.credibility,
        sources: data.sources || [],
        aiDetection: Math.floor(Math.random() * 10) + 1, // Keep these as random for UI consistency
        claims: Math.floor(Math.random() * 5) + 1,
        reasoning: data.reasoning
      });
    } catch (error) {
      console.error('Error analyzing claim:', error);
      setResult({
        claim: text,
        status: 'unverified',
        credibility: 0,
        sources: [],
        aiDetection: 0,
        claims: 0,
        reasoning: "Failed to connect to the AI analysis server. Make sure the backend is running on port 3001."
      });
    } finally {
      setIsAnalyzing(false);
    }
>>>>>>> main
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
<<<<<<< HEAD
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text.substring(0, 500)); // Preview first 500 chars
=======
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text.substring(0, 500));
>>>>>>> main
      };
      reader.readAsText(file);
    }
  };

<<<<<<< HEAD
  const getStatusIcon = (status: string) => {
    if (status === 'true') return <CheckCircle className="w-8 h-8 text-[#10B981]" />;
    if (status === 'false') return <XCircle className="w-8 h-8 text-[#EF4444]" />;
    return <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'true') return '#10B981';
    if (status === 'false') return '#EF4444';
    return '#F59E0B';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Fact-Check Analysis</h1>
        <p className="text-[#94A3B8]">Verify claims using AI-powered fact-checking</p>
      </div>

      {/* Input Section */}
      <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2D5BFF]" />
          <h2 className="text-xl text-white">Enter Claim or URL</h2>
        </div>

        {/* URL/Text Input */}
        <div className="space-y-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a claim, article text, or URL to fact-check..."
            className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] min-h-[120px] resize-none"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-sm text-[#94A3B8]">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-white/10 rounded-lg p-8">
=======
  const getStatusUI = (status: 'true' | 'false' | 'unverified') => {
    if (status === 'true') {
      return {
        icon: <CheckCircle className="w-8 h-8 text-[#10B981]" />,
        color: 'text-[#10B981]',
        bg: 'bg-[#10B981]',
        bgLight: 'bg-[#10B981]/10',
        border: 'border-[#10B981]/30',
        label: 'True'
      };
    }
    if (status === 'false') {
      return {
        icon: <XCircle className="w-8 h-8 text-[#EF4444]" />,
        color: 'text-[#EF4444]',
        bg: 'bg-[#EF4444]',
        bgLight: 'bg-[#EF4444]/10',
        border: 'border-[#EF4444]/30',
        label: 'False'
      };
    }
    return {
      icon: <AlertCircle className="w-8 h-8 text-[#94A3B8]" />,
      color: 'text-[#94A3B8]',
      bg: 'bg-[#94A3B8]',
      bgLight: 'bg-[#94A3B8]/10',
      border: 'border-[#94A3B8]/30',
      label: 'Unable to Verify'
    };
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-white mb-3">AI Fact-Check Engine</h1>
        <p className="text-lg text-[#94A3B8]">Cross-reference claims against thousands of verified sources using RAG.</p>
      </div>

      {/* Input Section */}
      <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-[#2D5BFF]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Enter Claim to Analyze</h2>
        </div>

        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a suspicious headline, article snippet, or rumor..."
            className="w-full bg-[#0A0E27]/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] focus:ring-1 focus:ring-[#2D5BFF] min-h-[140px] resize-none text-lg transition-all"
          />
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <span className="text-sm font-bold text-[#475569] uppercase tracking-widest">OR UPLOAD</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/5 transition-all group">
>>>>>>> main
          <input
            type="file"
            accept=".pdf,.txt,.docx,.doc"
            onChange={handleFileUpload}
            className="hidden"
            id="fact-check-file"
          />
<<<<<<< HEAD
          <label htmlFor="fact-check-file" className="cursor-pointer block">
            <div className="text-center">
              <Upload className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-white mb-1">Upload Document</p>
              <p className="text-sm text-[#94A3B8]">PDF, TXT, DOCX (Max 10MB)</p>
              {uploadedFile && (
                <p className="mt-4 text-sm text-[#10B981]">
                  Uploaded: {uploadedFile.name}
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={(!inputText && !uploadedFile) || isAnalyzing}
          className="w-full px-6 py-3 bg-[#2D5BFF] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2D5BFF]/90 transition-colors flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Claim
=======
          <label htmlFor="fact-check-file" className="cursor-pointer block text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0A0E27] border border-white/5 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Upload className="w-8 h-8 text-[#2D5BFF]" />
            </div>
            <p className="text-white font-bold mb-1 text-lg">Upload Source Document</p>
            <p className="text-sm text-[#94A3B8]">PDF, TXT, DOCX (Max 10MB)</p>
            {uploadedFile && (
              <p className="mt-4 text-sm font-bold text-[#10B981] bg-[#10B981]/10 inline-block px-4 py-2 rounded-lg">
                Selected: {uploadedFile.name}
              </p>
            )}
          </label>
        </div>

        <button
          onClick={() => handleAnalyze()}
          disabled={(!inputText && !uploadedFile) || isAnalyzing}
          className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(45,91,255,0.4)] transition-all flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-6 h-6 animate-spin" />
              Running RAG Analysis...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Analyze Using AI
>>>>>>> main
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
<<<<<<< HEAD
        <div className="space-y-6">
          {/* Overall Result */}
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              {getStatusIcon(result.status)}
              <div className="flex-1">
                <h3 className="text-2xl text-white mb-2">Analysis Complete</h3>
                <p className="text-[#94A3B8]">{result.claim}</p>
              </div>
            </div>

            {/* Credibility Score */}
            <div className="bg-[#1E293B] rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#94A3B8]">Credibility Score</span>
                <span className="text-3xl text-white">{result.credibility}%</span>
              </div>
              <div className="w-full bg-[#0A0E27] rounded-full h-3">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${result.credibility}%`,
                    background: getStatusColor(result.status)
                  }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-[#2D5BFF]" />
                <h3 className="text-white">AI Detection</h3>
              </div>
              <p className="text-3xl text-[#10B981] mb-2">{result.aiDetection}%</p>
              <p className="text-sm text-[#94A3B8]">Likely human-written</p>
            </div>

            <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-white">Claims Found</h3>
              </div>
              <p className="text-3xl text-white mb-2">{result.claims}</p>
              <p className="text-sm text-[#94A3B8]">Verifiable statements</p>
            </div>

            <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <ExternalLink className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-white">Sources</h3>
              </div>
              <p className="text-3xl text-white mb-2">{result.sources.length}</p>
              <p className="text-sm text-[#94A3B8]">Cross-referenced</p>
            </div>
          </div>

          {/* Source Analysis */}
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
            <h3 className="text-xl text-white mb-6">Source Reliability</h3>
            <div className="space-y-4">
              {result.sources.map((source, index) => (
                <div key={index} className="bg-[#1E293B] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-[#94A3B8]" />
                      <div>
                        <h4 className="text-white">{source.name}</h4>
                        <p className="text-xs text-[#94A3B8]">{source.url}</p>
                      </div>
                    </div>
                    <span className="text-sm text-white">{source.reliability}%</span>
                  </div>
                  <div className="w-full bg-[#0A0E27] rounded-full h-2">
                    <div
                      className="h-full rounded-full bg-[#10B981]"
                      style={{ width: `${source.reliability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
=======
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
          <div className="flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Analysis Results</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>

          {/* 1. Evidence Strength Bar & Status */}
          <div className={`relative overflow-hidden bg-[#141B3A]/90 backdrop-blur-xl border ${getStatusUI(result.status).border} rounded-3xl p-8 md:p-12 shadow-2xl`}>
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] ${getStatusUI(result.status).bgLight} blur-3xl -z-10 rounded-full opacity-50 pointer-events-none`}></div>
            
            <div className="flex flex-col gap-8">
              {/* Claim Details */}
              <div className="text-center md:text-left border-b border-white/5 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                  <FileText className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Analyzed Claim</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  "{result.claim}"
                </h2>
              </div>

              {/* Status and Horizontal Bar */}
              <div className="flex flex-col items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-4">
                  {getStatusUI(result.status).icon}
                  <h3 className={`text-4xl md:text-5xl font-black ${getStatusUI(result.status).color} uppercase tracking-widest`}>
                    {getStatusUI(result.status).label}
                  </h3>
                </div>

                {result.status !== 'unverified' && (
                  <div className="w-full max-w-2xl mt-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[#94A3B8] font-bold text-sm uppercase tracking-wider">Evidence Strength</span>
                      <span className={`font-black text-2xl ${getStatusUI(result.status).color}`}>{result.credibility}/100</span>
                    </div>
                    <div className="h-4 w-full bg-[#0A0E27] rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full ${getStatusUI(result.status).bg} transition-all duration-1000 ease-out`}
                        style={{ width: `${result.credibility}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`grid ${result.status !== 'unverified' ? 'md:grid-cols-[2fr,1fr]' : 'grid-cols-1'} gap-8`}>
            {/* 2. Reasoning Block */}
            <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#2D5BFF]" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI Reasoning</h3>
              </div>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {/* 3. Cross-Referenced Sources (Hidden if unverified) */}
            {result.status !== 'unverified' && result.sources.length > 0 && (
              <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Supporting Evidence</h3>
                </div>
                
                <div className="space-y-4 flex-1">
                  {result.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-[#0A0E27]/50 border border-white/5 rounded-xl p-4 hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/5 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-bold group-hover:text-[#2D5BFF] transition-colors">{source.name}</h4>
                        <ExternalLink className="w-4 h-4 text-[#475569] group-hover:text-[#2D5BFF] transition-colors" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#475569] truncate max-w-[150px]">{source.url}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
>>>>>>> main
        </div>
      )}
    </div>
  );
}
