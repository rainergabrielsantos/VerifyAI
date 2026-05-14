import { Claim } from './types';

export const mockClaims: Claim[] = [
  {
    id: 'claim-001',
    timestamp: '12m ago',
    category: 'Politics',
    status: 'debunked',
    confidence: 97,
    headline: 'New Federal Policy Eliminates Medicare Benefits',
    description: 'Posts misrepresent healthcare legislation, claiming complete elimination of Medicare benefits. Official sources confirm no such provisions exist.',
    thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: { shares: '42', reach: '156', platforms: 4 },
    sources: ['Medicare.gov', 'FactCheck.org'],
    expert: 'Dr. M. Torres'
  },
  {
    id: 'claim-002',
    timestamp: '28m ago',
    category: 'Technology',
    status: 'debunked',
    confidence: 99,
    headline: 'Major Tech Company Experiencing Global Data Breach',
    description: 'Fabricated article claims massive data breach affecting millions. Company confirms no breach occurred.',
    thumbnail: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHNlY3VyaXR5fGVufDF8fHx8MTc3NTE4NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    viralMetrics: { shares: '89', reach: '210', platforms: 3 },
    sources: ['Company Statement', 'CISA'],
    expert: 'R. Kim'
  },
  {
    id: 'claim-003',
    timestamp: '1h ago',
    category: 'Health',
    status: 'verified',
    confidence: 85,
    headline: 'New Study Links Sleep Deprivation to Early Aging',
    description: 'Recent clinical trials verify long-term sleep deprivation accelerates cellular aging markers.',
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1080&auto=format&fit=crop',
    viralMetrics: { shares: '15', reach: '48', platforms: 2 },
    sources: ['Nature Journal', 'NIH'],
    expert: 'Dr. Sarah Lee'
  },
  {
    id: 'claim-004',
    timestamp: '3h ago',
    category: 'Politics',
    status: 'suspicious',
    confidence: 62,
    headline: 'Leaked Audio Implicates Senator in Bribery Scandal',
    description: 'Audio clip circulating online appears altered. Preliminary acoustic analysis suggests AI voice cloning.',
    thumbnail: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1080&auto=format&fit=crop',
    viralMetrics: { shares: '112', reach: '340', platforms: 5 },
    sources: ['Audio Forensics Lab'],
    expert: 'James Wei'
  },
  {
    id: 'claim-005',
    timestamp: '5h ago',
    category: 'Technology',
    status: 'verified',
    confidence: 94,
    headline: 'AI Model Passes Medical Licensing Exam',
    description: 'New generative AI model successfully scores in the 90th percentile on standard medical licensing exams.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1080&auto=format&fit=crop',
    viralMetrics: { shares: '56', reach: '120', platforms: 3 },
    sources: ['Medical Board', 'Tech Review'],
    expert: 'Prof. A. Turing'
  },
  {
    id: 'claim-006',
    timestamp: '7h ago',
    category: 'Environment',
    status: 'debunked',
    confidence: 91,
    headline: 'Ocean Temperatures Drop to Record Lows',
    description: 'Viral map showing freezing oceans is heavily edited. Real satellite data shows above-average temperatures.',
    thumbnail: 'https://images.unsplash.com/photo-1582967116812-706b8665391a?q=80&w=1080&auto=format&fit=crop',
    viralMetrics: { shares: '24', reach: '88', platforms: 2 },
    sources: ['NOAA', 'Climate Central'],
    expert: 'Dr. E. Vance'
  }
];
