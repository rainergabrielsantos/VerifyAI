import { Search, FileText, Upload, ExternalLink, CheckCircle, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AnalysisResult {
  claim: string;
  status: 'true' | 'false' | 'misleading';
  credibility: number;
  sources: { name: string; url: string; reliability: number }[];
  aiDetection: number;
  claims: number;
}

export function FactCheckPage() {
  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

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
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text.substring(0, 500)); // Preview first 500 chars
      };
      reader.readAsText(file);
    }
  };

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
          <input
            type="file"
            accept=".pdf,.txt,.docx,.doc"
            onChange={handleFileUpload}
            className="hidden"
            id="fact-check-file"
          />
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
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
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
        </div>
      )}
    </div>
  );
}
