import { Archive, Search, Filter, Download, CheckCircle, XCircle, AlertTriangle, Calendar, FileText, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ArchiveItem {
  id: number;
  type: 'text' | 'image';
  title: string;
  status: 'true' | 'false' | 'misleading' | 'authentic' | 'manipulated';
  credibility: number;
  date: string;
  source: string;
}

const archiveData: ArchiveItem[] = [
  {
    id: 1,
    type: 'text',
    title: 'Global temperatures reached record highs in 2025',
    status: 'true',
    credibility: 95,
    date: '2026-03-05',
    source: 'Climate.gov'
  },
  {
    id: 2,
    type: 'image',
    title: 'hurricane_damage_2026.jpg',
    status: 'authentic',
    credibility: 92,
    date: '2026-03-04',
    source: 'User Upload'
  },
  {
    id: 3,
    type: 'text',
    title: 'New vaccine prevents all forms of cancer',
    status: 'false',
    credibility: 15,
    date: '2026-03-04',
    source: 'Social Media'
  },
  {
    id: 4,
    type: 'image',
    title: 'moon_landing_fake.png',
    status: 'manipulated',
    credibility: 23,
    date: '2026-03-03',
    source: 'User Upload'
  },
  {
    id: 5,
    type: 'text',
    title: 'Tech company announces breakthrough in quantum computing',
    status: 'misleading',
    credibility: 62,
    date: '2026-03-03',
    source: 'Tech News'
  },
  {
    id: 6,
    type: 'text',
    title: 'Study finds 80% reduction in plastic waste in Pacific Ocean',
    status: 'true',
    credibility: 88,
    date: '2026-03-02',
    source: 'Scientific Journal'
  },
  {
    id: 7,
    type: 'image',
    title: 'protest_crowds_enhanced.jpg',
    status: 'manipulated',
    credibility: 31,
    date: '2026-03-02',
    source: 'News Outlet'
  },
  {
    id: 8,
    type: 'text',
    title: 'Miracle cure for diabetes discovered',
    status: 'false',
    credibility: 12,
    date: '2026-03-01',
    source: 'Unknown'
  },
  {
    id: 9,
    type: 'image',
    title: 'wildlife_photo_africa.jpg',
    status: 'authentic',
    credibility: 97,
    date: '2026-02-28',
    source: 'User Upload'
  },
  {
    id: 10,
    type: 'text',
    title: 'Economic growth exceeds forecasts by 20%',
    status: 'misleading',
    credibility: 58,
    date: '2026-02-28',
    source: 'Financial News'
  }
];

export function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'true' || status === 'authentic') return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
    if (status === 'false' || status === 'manipulated') return <XCircle className="w-5 h-5 text-[#EF4444]" />;
    return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      true: 'bg-[#10B981]/20 text-[#10B981]',
      false: 'bg-[#EF4444]/20 text-[#EF4444]',
      misleading: 'bg-[#F59E0B]/20 text-[#F59E0B]',
      authentic: 'bg-[#10B981]/20 text-[#10B981]',
      manipulated: 'bg-[#EF4444]/20 text-[#EF4444]'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: archiveData.length,
    text: archiveData.filter(item => item.type === 'text').length,
    image: archiveData.filter(item => item.type === 'image').length,
    avgCredibility: Math.round(
      archiveData.reduce((sum, item) => sum + item.credibility, 0) / archiveData.length
    )
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl text-white mb-2">Debunk Archive</h1>
          <p className="text-lg text-[#94A3B8]">Browse the complete history of community fact-checks and analyses</p>
        </div>
        <button className="px-5 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Archive className="w-5 h-5 text-[#2D5BFF]" />
            <p className="text-sm text-[#94A3B8]">Total Analyses</p>
          </div>
          <p className="text-3xl text-white">{stats.total}</p>
        </div>

        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#2D5BFF]" />
            <p className="text-sm text-[#94A3B8]">Text Checks</p>
          </div>
          <p className="text-3xl text-white">{stats.text}</p>
        </div>

        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ImageIcon className="w-5 h-5 text-[#10B981]" />
            <p className="text-sm text-[#94A3B8]">Image Checks</p>
          </div>
          <p className="text-3xl text-white">{stats.image}</p>
        </div>

        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-[#10B981]" />
            <p className="text-sm text-[#94A3B8]">Avg Credibility</p>
          </div>
          <p className="text-3xl text-white">{stats.avgCredibility}%</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-[#94A3B8] mr-3" />
            <input
              type="text"
              placeholder="Search archive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-[#475569] focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#94A3B8]" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'text' | 'image')}
              className="bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#2D5BFF]"
            >
              <option value="all">All Types</option>
              <option value="text">Text Only</option>
              <option value="image">Images Only</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#2D5BFF]"
          >
            <option value="all">All Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
            <option value="misleading">Misleading</option>
            <option value="authentic">Authentic</option>
            <option value="manipulated">Manipulated</option>
          </select>
        </div>
      </div>

      {/* Archive List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="bg-[#141B3A] border border-white/10 rounded-xl p-12 text-center">
            <Archive className="w-16 h-16 text-[#94A3B8] mx-auto mb-4" />
            <p className="text-white text-lg mb-2">No results found</p>
            <p className="text-[#94A3B8]">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-[#141B3A] border border-white/10 rounded-xl p-6 hover:border-[#2D5BFF]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#1E293B] flex items-center justify-center">
                    {item.type === 'text' ? (
                      <FileText className="w-5 h-5 text-[#2D5BFF]" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[#10B981]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <span>•</span>
                      <span>Source: {item.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  {getStatusBadge(item.status)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-[#94A3B8] mb-2">Credibility Score</p>
                  <div className="w-full bg-[#1E293B] rounded-full h-2">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.credibility}%`,
                        background: item.credibility >= 70 ? '#10B981' : item.credibility >= 40 ? '#F59E0B' : '#EF4444'
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-white">{item.credibility}%</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
