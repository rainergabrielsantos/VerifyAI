import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { SubmitMediaPage } from './pages/SubmitMediaPage';
import { ArchivePage } from './pages/ArchivePage';
import { FactCheckPage } from './pages/FactCheckPage';
import { ImageAnalysisPage } from './pages/ImageAnalysisPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/submit" element={<SubmitMediaPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/fact-check" element={<FactCheckPage />} />
          <Route path="/image-analysis" element={<ImageAnalysisPage />} />
        </Routes>
      </main>
    </div>
  );
}