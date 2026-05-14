import { Archive, Search, Filter, Download, CheckCircle, XCircle, AlertTriangle, Calendar, FileText, Image as ImageIcon, Trash2, X, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchiveItem {
  id: number;
  type: 'text' | 'image';
  title: string;
  status: 'true' | 'false' | 'misleading' | 'unverified' | 'authentic' | 'manipulated';
  credibility: number;
  date: string;
  source: string;
  reasoning?: string;
  sources?: { name: string; url: string }[];
}

const ARCHIVE_KEY = 'verifyai_archive';

function loadArchive(): ArchiveItem[] {
  try {
    return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function ArchivePage() {
  const [archiveData, setArchiveData] = useState<ArchiveItem[]>(loadArchive);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);

  // Keep archive in sync if another tab / page updates localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ARCHIVE_KEY) setArchiveData(loadArchive());
    };
    window.addEventListener('storage', onStorage);
    // Also refresh on focus so navigating back from FactCheck shows new items
    const onFocus = () => setArchiveData(loadArchive());
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleClearArchive = () => {
    if (window.confirm('Are you sure you want to clear the entire archive?')) {
      localStorage.removeItem(ARCHIVE_KEY);
      setArchiveData([]);
    }
  };

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
      unverified: 'bg-[#94A3B8]/20 text-[#94A3B8]',
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
    avgCredibility: archiveData.length > 0 ? Math.round(
      archiveData.reduce((sum, item) => sum + item.credibility, 0) / archiveData.length
    ) : 0
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl text-white mb-2">Debunk Archive</h1>
          <p className="text-lg text-[#94A3B8]">Browse the complete history of community fact-checks and analyses</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          {archiveData.length > 0 && (
            <button
              onClick={handleClearArchive}
              className="px-5 py-3 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-lg flex items-center gap-2 hover:bg-[#EF4444]/20 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear Archive
            </button>
          )}
        </div>
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
            <p className="text-white text-lg mb-2">
              {archiveData.length === 0 ? "Your archive is empty" : "No results found"}
            </p>
            <p className="text-[#94A3B8]">
              {archiveData.length === 0 
                ? "Fact-check a claim to see it saved here automatically." 
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#141B3A] border border-white/10 rounded-xl p-6 hover:border-[#2D5BFF]/50 transition-colors cursor-pointer group"
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#0A0E27]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#141B3A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#2D5BFF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Analysis Details</h3>
                    <p className="text-xs text-[#94A3B8]">Archived on {new Date(selectedItem.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Claim Title */}
                <div>
                  <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Original Claim</span>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    "{selectedItem.title}"
                  </h2>
                </div>

                {/* Score & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A0E27]/50 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Verdict</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedItem.status)}
                      <span className="text-lg font-bold text-white uppercase tracking-wider">{selectedItem.status}</span>
                    </div>
                  </div>
                  <div className="bg-[#0A0E27]/50 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Credibility</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-white">{selectedItem.credibility}%</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2D5BFF]" 
                          style={{ width: `${selectedItem.credibility}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2D5BFF]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AI Reasoning</span>
                  </div>
                  <div className="bg-[#0A0E27]/30 rounded-2xl p-6 border border-white/5 text-[#94A3B8] leading-relaxed italic">
                    {selectedItem.reasoning || "No detailed reasoning archived for this claim."}
                  </div>
                </div>

                {/* Sources */}
                {selectedItem.sources && selectedItem.sources.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#10B981]">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Verified Sources</span>
                    </div>
                    <div className="grid gap-3">
                      {selectedItem.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-[#0A0E27]/50 border border-white/5 rounded-xl hover:border-[#2D5BFF]/30 hover:bg-[#2D5BFF]/5 transition-all group/link"
                        >
                          <span className="text-white font-medium group-hover/link:text-[#2D5BFF] transition-colors">{src.name}</span>
                          <ExternalLink className="w-4 h-4 text-[#475569] group-hover/link:text-[#2D5BFF]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[#0A0E27]/50 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
