import { Shield, X, CheckCircle, AlertCircle, TrendingUp, Clock, Users, ExternalLink, Share2, BookmarkPlus } from 'lucide-react';

const liveClaimsData = [
  {
    id: 'claim-001',
    timestamp: '12 minutes ago',
    category: 'Politics',
    status: 'debunked',
    confidence: 97,
    headline: 'Viral Post Claims New Federal Policy Will Eliminate Medicare Benefits',
    description: 'Social media posts misrepresent healthcare legislation, claiming complete elimination of Medicare benefits. Official sources confirm no such provisions exist.',
    thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '3.2M',
      reach: '8.7M',
      platforms: 4
    },
    sources: ['Medicare.gov', 'Congressional Budget Office', 'FactCheck.org'],
    expert: 'Dr. Michael Torres, Healthcare Policy Expert'
  },
  {
    id: 'claim-002',
    timestamp: '28 minutes ago',
    category: 'Technology',
    status: 'debunked',
    confidence: 99,
    headline: 'False Report: Major Tech Company Experiencing Global Data Breach',
    description: 'Fabricated news article claims massive data breach affecting millions of users. Company confirms no breach occurred and reports originate from known disinformation network.',
    thumbnail: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHNlY3VyaXR5fGVufDF8fHx8MTc3NTE4NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '2.8M',
      reach: '7.1M',
      platforms: 5
    },
    sources: ['Company Official Statement', 'CyberSecurity & Infrastructure Security Agency', 'TechCrunch'],
    expert: 'Rachel Kim, Cybersecurity Analyst'
  },
  {
    id: 'claim-003',
    timestamp: '42 minutes ago',
    category: 'Politics',
    status: 'suspicious',
    confidence: 85,
    headline: 'Misleading Statistics About Immigration Policy Circulate on X',
    description: 'Posts share immigration statistics without proper context, creating false impressions. Numbers are technically accurate but deliberately presented to mislead.',
    thumbnail: 'https://images.unsplash.com/photo-1773841915558-25083446c52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjBkZWJhdGUlMjBzdGFnZXxlbnwxfHx8fDE3NzUxODU2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '1.9M',
      reach: '5.3M',
      platforms: 3
    },
    sources: ['Department of Homeland Security', 'Pew Research Center', 'Reuters'],
    expert: 'Prof. James Anderson, Immigration Studies'
  },
  {
    id: 'claim-004',
    timestamp: '1 hour ago',
    category: 'Technology',
    status: 'verified',
    confidence: 94,
    headline: 'Authentic Video Shows New AI Model Capabilities from Research Lab',
    description: 'Viral demonstration video is confirmed authentic. Research institution validates the AI advancement showcase, with peer-reviewed documentation available.',
    thumbnail: 'https://images.unsplash.com/photo-1675557570482-df9926f61d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwxfHx8fDE3NzUwOTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '2.1M',
      reach: '6.2M',
      platforms: 4
    },
    sources: ['MIT Technology Review', 'Nature Journal', 'Lab Official Website'],
    expert: 'Dr. Lisa Zhang, AI Research Scientist'
  },
  {
    id: 'claim-005',
    timestamp: '1 hour ago',
    category: 'Politics',
    status: 'debunked',
    confidence: 96,
    headline: 'Digitally Altered Photo Falsely Shows Political Rally Crowd Size',
    description: 'Image forensics reveal significant digital manipulation of crowd attendance photos. Original unaltered images from multiple independent sources confirm editing.',
    thumbnail: 'https://images.unsplash.com/photo-1560981477-dbcccffc1565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdGlvbiUyMHZvdGluZyUyMGRlbW9jcmFjeXxlbnwxfHx8fDE3NzUxMTAzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '1.7M',
      reach: '4.9M',
      platforms: 3
    },
    sources: ['Getty Images', 'AP Photo Archive', 'Forensic Analysis Report'],
    expert: 'Jennifer Liu, Digital Forensics Expert'
  },
  {
    id: 'claim-006',
    timestamp: '2 hours ago',
    category: 'Technology',
    status: 'suspicious',
    confidence: 88,
    headline: 'Unverified Claims About New Cryptocurrency Regulations Spread',
    description: 'Posts claim imminent cryptocurrency bans, but no official regulatory announcements exist. Claims appear coordinated to manipulate market prices.',
    thumbnail: 'https://images.unsplash.com/photo-1760842543713-108c3cadbba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbiUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NzUxODU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '1.4M',
      reach: '3.8M',
      platforms: 4
    },
    sources: ['SEC.gov', 'Federal Reserve Statement', 'Bloomberg'],
    expert: 'Marcus Chen, Financial Regulation Analyst'
  },
  {
    id: 'claim-007',
    timestamp: '2 hours ago',
    category: 'Politics',
    status: 'debunked',
    confidence: 98,
    headline: 'Deepfake Audio of Government Official Goes Viral on TikTok',
    description: 'Audio clip is confirmed as AI-generated deepfake. Voice authentication analysis reveals synthetic patterns, and official confirms they never made such statements.',
    thumbnail: 'https://images.unsplash.com/photo-1764745222019-421adcea5ae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjBicm9hZGNhc3R8ZW58MXx8fHwxNzc1MTUyNDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '2.5M',
      reach: '7.8M',
      platforms: 2
    },
    sources: ['Audio Forensics Lab', 'Official Spokesperson', 'Deepfake Detection AI'],
    expert: 'Dr. Amanda Foster, Voice Authentication'
  },
  {
    id: 'claim-008',
    timestamp: '3 hours ago',
    category: 'Technology',
    status: 'debunked',
    confidence: 95,
    headline: 'Fake Press Release Announces Nonexistent Product Launch',
    description: 'Fraudulent press release mimics company branding to announce fake product. Company confirms document is fabricated and has reported to authorities.',
    thumbnail: 'https://images.unsplash.com/photo-1696041752094-1be601b7053f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1pc2luZm9ybWF0aW9ufGVufDF8fHx8MTc3NTE4NTY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: {
      shares: '1.1M',
      reach: '3.2M',
      platforms: 3
    },
    sources: ['Company PR Department', 'Business Wire', 'SEC Filings'],
    expert: 'Thomas Wright, Corporate Communications'
  }
];

export function LiveClaimsFeed() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'debunked':
        return {
          icon: X,
          color: '#EF4444',
          bg: 'bg-[#EF4444]/20',
          border: 'border-[#EF4444]/30',
          text: 'text-[#EF4444]',
          label: 'Debunked'
        };
      case 'verified':
        return {
          icon: CheckCircle,
          color: '#10B981',
          bg: 'bg-[#10B981]/20',
          border: 'border-[#10B981]/30',
          text: 'text-[#10B981]',
          label: 'Verified'
        };
      case 'suspicious':
        return {
          icon: AlertCircle,
          color: '#F59E0B',
          bg: 'bg-[#F59E0B]/20',
          border: 'border-[#F59E0B]/30',
          text: 'text-[#F59E0B]',
          label: 'Suspicious'
        };
      default:
        return {
          icon: AlertCircle,
          color: '#94A3B8',
          bg: 'bg-[#94A3B8]/20',
          border: 'border-[#94A3B8]/30',
          text: 'text-[#94A3B8]',
          label: 'Unknown'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl text-white">Live Claims Feed</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#10B981]/20 rounded-full">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-sm text-[#10B981] font-medium">Live</span>
            </div>
          </div>
          <p className="text-[#94A3B8]">Real-time fact-checking from around the world • Updated every minute</p>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-6">
        {liveClaimsData.map((claim) => {
          const statusConfig = getStatusConfig(claim.status);
          const StatusIcon = statusConfig.icon;

          return (
            <article
              key={claim.id}
              className={`group bg-[#141B3A]/80 backdrop-blur-sm border ${statusConfig.border} rounded-xl overflow-hidden hover:border-opacity-60 transition-all cursor-pointer`}
            >
              <div className="grid md:grid-cols-[300px,1fr] gap-0">
                {/* Left: Thumbnail */}
                <div className="relative h-64 md:h-auto overflow-hidden bg-[#0A0E27]">
                  <img
                    src={claim.thumbnail}
                    alt={claim.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent md:bg-gradient-to-r" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-2 ${statusConfig.bg} backdrop-blur-sm border ${statusConfig.border} rounded-lg`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.text}`} />
                      <span className={`text-sm font-medium ${statusConfig.text} uppercase tracking-wide`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#2D5BFF]/90 backdrop-blur-sm rounded-full text-xs text-white">
                      {claim.category}
                    </span>
                  </div>

                  {/* Viral Metrics Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/90 backdrop-blur-sm rounded-lg">
                      <TrendingUp className="w-4 h-4 text-[#EF4444]" />
                      <div>
                        <div className="text-xs text-[#94A3B8]">Shares</div>
                        <div className="text-white text-sm font-medium">{claim.viralMetrics.shares}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/90 backdrop-blur-sm rounded-lg">
                      <Users className="w-4 h-4 text-[#F59E0B]" />
                      <div>
                        <div className="text-xs text-[#94A3B8]">Reach</div>
                        <div className="text-white text-sm font-medium">{claim.viralMetrics.reach}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-6 space-y-5">
                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Clock className="w-4 h-4" />
                    <span>Fact-checked {claim.timestamp}</span>
                    <span className="mx-2">•</span>
                    <span>{claim.viralMetrics.platforms} platforms</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl text-white leading-tight group-hover:text-[#2D5BFF] transition-colors">
                    {claim.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[#94A3B8] leading-relaxed">
                    {claim.description}
                  </p>

                  {/* Expert Verification */}
                  <div className="flex items-center gap-3 p-4 bg-[#0A0E27]/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#2D5BFF]/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-[#2D5BFF]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#94A3B8] mb-1">Expert Verification</div>
                      <div className="text-white text-sm">{claim.expert}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#94A3B8] mb-1">Confidence</div>
                      <div className={`text-lg font-semibold ${statusConfig.text}`}>{claim.confidence}%</div>
                    </div>
                  </div>

                  {/* Sources */}
                  <div>
                    <div className="text-xs text-[#94A3B8] mb-2">Verified Sources ({claim.sources.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {claim.sources.map((source, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#0A0E27] border border-white/10 rounded-lg text-xs text-[#94A3B8] hover:border-[#2D5BFF]/50 hover:text-white transition-all cursor-pointer"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all">
                      <ExternalLink className="w-4 h-4" />
                      View Full Analysis
                    </button>
                    <button className="p-3 bg-[#0A0E27] border border-white/10 rounded-lg text-[#94A3B8] hover:text-white hover:border-[#2D5BFF]/50 transition-all">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-[#0A0E27] border border-white/10 rounded-lg text-[#94A3B8] hover:text-white hover:border-[#2D5BFF]/50 transition-all">
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <button className="px-8 py-4 bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/10 transition-all">
          Load More Claims
        </button>
      </div>
    </div>
  );
}