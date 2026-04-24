import { Image, Upload, Camera, MapPin, Calendar, AlertTriangle, CheckCircle, XCircle, Layers } from 'lucide-react';
import { useState } from 'react';

interface ImageAnalysisResult {
  fileName: string;
  credibility: number;
  status: 'authentic' | 'manipulated' | 'suspicious';
  metadata: {
    location: string;
    date: string;
    camera: string;
    resolution: string;
  };
  forensics: {
    elaScore: number;
    noiseAnalysis: number;
    compressionArtifacts: number;
  };
}

export function ImageAnalysisPage() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ImageAnalysisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setResult({
          fileName: file.name,
          credibility: 92,
          status: 'authentic',
          metadata: {
            location: 'San Francisco, CA',
            date: 'March 3, 2026',
            camera: 'iPhone 15 Pro',
            resolution: '4032 x 3024'
          },
          forensics: {
            elaScore: 95,
            noiseAnalysis: 88,
            compressionArtifacts: 91
          }
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'authentic') return <CheckCircle className="w-8 h-8 text-[#10B981]" />;
    if (status === 'manipulated') return <XCircle className="w-8 h-8 text-[#EF4444]" />;
    return <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      authentic: 'bg-[#10B981]/20 text-[#10B981]',
      manipulated: 'bg-[#EF4444]/20 text-[#EF4444]',
      suspicious: 'bg-[#F59E0B]/20 text-[#F59E0B]'
    };
    
    return (
      <span className={`px-4 py-2 rounded-full text-sm ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Image Forensics</h1>
        <p className="text-[#94A3B8]">Detect manipulated images using advanced forensic analysis</p>
      </div>

      {/* Upload Section */}
      <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Camera className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-xl text-white">Upload Image</h2>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-lg p-12">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            <div className="text-center">
              <Upload className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
              <p className="text-white text-lg mb-2">Drop image here or click to upload</p>
              <p className="text-sm text-[#94A3B8]">JPG, PNG, WEBP, GIF (Max 25MB)</p>
              {uploadedImage && !isAnalyzing && (
                <p className="mt-4 text-sm text-[#10B981]">
                  Uploaded: {uploadedImage.name}
                </p>
              )}
              {isAnalyzing && (
                <p className="mt-4 text-sm text-[#2D5BFF] flex items-center justify-center gap-2">
                  <Layers className="w-4 h-4 animate-pulse" />
                  Analyzing image...
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-6">
            <h3 className="text-white mb-3">Preview</h3>
            <div className="bg-[#1E293B] rounded-lg p-4 max-h-96 overflow-hidden flex items-center justify-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-80 rounded-lg object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="space-y-6">
          {/* Overall Result */}
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                {getStatusIcon(result.status)}
                <div>
                  <h3 className="text-2xl text-white mb-2">Forensic Analysis Complete</h3>
                  <p className="text-[#94A3B8]">{result.fileName}</p>
                </div>
              </div>
              {getStatusBadge(result.status)}
            </div>

            {/* Credibility Score */}
            <div className="bg-[#1E293B] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#94A3B8]">Overall Credibility Score</span>
                <span className="text-4xl text-white">{result.credibility}</span>
              </div>
              <div className="w-full bg-[#0A0E27] rounded-full h-4">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${result.credibility}%`,
                    background: result.credibility >= 80 ? '#10B981' : result.credibility >= 50 ? '#F59E0B' : '#EF4444'
                  }}
                />
              </div>
              <p className="text-sm text-[#94A3B8] mt-3">
                {result.credibility >= 80 ? 'Image appears authentic' : 
                 result.credibility >= 50 ? 'Suspicious elements detected' : 
                 'Likely manipulated'}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
            <h3 className="text-xl text-white mb-6">Image Metadata</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1E293B] rounded-lg p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2D5BFF] mt-1" />
                <div>
                  <p className="text-sm text-[#94A3B8] mb-1">Location</p>
                  <p className="text-white">{result.metadata.location}</p>
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-4 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#2D5BFF] mt-1" />
                <div>
                  <p className="text-sm text-[#94A3B8] mb-1">Date Taken</p>
                  <p className="text-white">{result.metadata.date}</p>
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-4 flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#2D5BFF] mt-1" />
                <div>
                  <p className="text-sm text-[#94A3B8] mb-1">Camera Model</p>
                  <p className="text-white">{result.metadata.camera}</p>
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-4 flex items-start gap-3">
                <Image className="w-5 h-5 text-[#2D5BFF] mt-1" />
                <div>
                  <p className="text-sm text-[#94A3B8] mb-1">Resolution</p>
                  <p className="text-white">{result.metadata.resolution}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Analysis */}
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
            <h3 className="text-xl text-white mb-6">Forensic Tests</h3>
            <div className="space-y-4">
              <div className="bg-[#1E293B] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white mb-1">Error Level Analysis (ELA)</h4>
                    <p className="text-xs text-[#94A3B8]">Detects image compression inconsistencies</p>
                  </div>
                  <span className="text-lg text-white">{result.forensics.elaScore}%</span>
                </div>
                <div className="w-full bg-[#0A0E27] rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-[#10B981]"
                    style={{ width: `${result.forensics.elaScore}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white mb-1">Noise Analysis</h4>
                    <p className="text-xs text-[#94A3B8]">Identifies unnatural noise patterns</p>
                  </div>
                  <span className="text-lg text-white">{result.forensics.noiseAnalysis}%</span>
                </div>
                <div className="w-full bg-[#0A0E27] rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-[#10B981]"
                    style={{ width: `${result.forensics.noiseAnalysis}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#1E293B] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white mb-1">Compression Artifacts</h4>
                    <p className="text-xs text-[#94A3B8]">Checks for editing evidence</p>
                  </div>
                  <span className="text-lg text-white">{result.forensics.compressionArtifacts}%</span>
                </div>
                <div className="w-full bg-[#0A0E27] rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-[#10B981]"
                    style={{ width: `${result.forensics.compressionArtifacts}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
