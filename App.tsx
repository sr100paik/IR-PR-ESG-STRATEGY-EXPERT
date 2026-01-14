
import React, { Suspense, lazy, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, Mail, ArrowRight, FileText, Award, TrendingUp, Globe, ChevronDown, ExternalLink } from 'lucide-react';

// Lazy load pages for performance
const Main = lazy(() => import('./pages/Main'));
const TrackRecord = lazy(() => import('./pages/TrackRecord'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Track Record', path: '/track-record' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">백승룡</span>
            <span className="text-slate-400 text-sm hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest hidden sm:inline group-hover:text-slate-700 transition-colors">Strategy & IR/PR Expert</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-slate-900 relative ${
                  location.pathname === link.path 
                    ? 'text-slate-900' 
                    : 'text-slate-500'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-slate-900"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white px-5 py-2.5 text-sm rounded-sm hover:bg-slate-800 transition-all font-medium shadow-sm hover:shadow-md inline-flex items-center space-x-2"
            >
              <span>Consulting Request</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 p-2 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-6 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-slate-900 text-white px-4 py-3 rounded-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Consulting Request
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const [selectedSite, setSelectedSite] = useState('');

  // 파트너 리스트 순서, 항목 및 URL 설정
  const familySites = [
    { name: 'Family Site 선택', url: '' },
    { name: '100% 인사이트', url: 'https://bizfromatoz.com' },
    { name: 'Pro OH 컨설팅', url: 'https://proventure.kr' },
    { name: '법률 서비스 파트너', url: '#' },
    { name: '세무회계 서비스 파트너', url: '#' },
  ];

  // 모든 파트너 항목에 대해 선택 시 즉시 이동하는 핸들러
  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = e.target.value;
    setSelectedSite(url);

    if (url === '') return;

    // 링크가 없는 파트너 항목 처리 (준비 중 안내)
    if (url === '#') {
      alert('해당 서비스 파트너 페이지는 현재 준비 중입니다.');
      setTimeout(() => setSelectedSite(''), 100);
      return;
    }

    // 유효한 URL(100% 인사이트, Pro OH 컨설팅 등)인 경우 새 창으로 즉시 이동
    if (url.startsWith('http')) {
      window.open(url, '_blank');
      // 이동 후 드롭다운 상태를 초기화하여 다시 선택 가능하게 함
      setTimeout(() => setSelectedSite(''), 500);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 border-b border-slate-800 pb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h2 className="serif text-white text-2xl font-bold mb-4">백승룡 (Daniel SR, Paik)</h2>
            <p className="max-w-2xl text-slate-400 leading-relaxed mb-6">
              KOSDAQ 상장사 실무와 20년 이상의 벤처기업 CEO 경력을 보유한 전략가. 기업 가치 제고와 지속가능한 성장을 위한 최상의 파트너십을 제공합니다.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-2 text-white mb-1">
                  <Award size={18} />
                  <span className="text-2xl font-bold">30+</span>
                </div>
                <p className="text-xs text-slate-500">Years Experience</p>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-2 text-white mb-1">
                  <TrendingUp size={18} />
                  <span className="text-2xl font-bold">50억+</span>
                </div>
                <p className="text-xs text-slate-500">Investment Secured</p>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center space-x-2 text-white mb-1">
                  <Globe size={18} />
                  <span className="text-2xl font-bold">4개국</span>
                </div>
                <p className="text-xs text-slate-500">Global Expansion</p>
              </div>
            </div>
          </div>

          {/* Contact & Family Site Section */}
          <div className="flex flex-col md:items-end justify-between space-y-8">
            <div className="w-full md:w-auto">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h3>
              <div className="flex flex-col space-y-3">
                <a 
                  href="mailto:sr100@kakao.com" 
                  className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm">sr100@kakao.com</span>
                </a>
                <a 
                  href="https://foj9p10hxsmxhnzm.public.blob.vercel-storage.com/Daniel_SR_Paik_CV.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <FileText size={18} />
                  <span className="text-sm">이력서(PDF) 다운로드</span>
                </a>
              </div>
            </div>

            {/* Family Site Selector - '이동' 버튼 없이 모든 항목 자동 이동 적용 */}
            <div className="w-full md:max-w-[240px]">
              <h3 className="serif text-white font-bold mb-3 text-lg flex items-center gap-2">
                Family Site
                <ExternalLink size={16} className="text-slate-500" />
              </h3>
              <div className="relative">
                <select 
                  value={selectedSite}
                  onChange={handleSiteChange}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-3 rounded-sm appearance-none focus:outline-none focus:border-blue-500 hover:border-slate-500 transition-colors cursor-pointer"
                >
                  {familySites.map((site, idx) => (
                    <option key={idx} value={site.url}>{site.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic">* 파트너 선택 시 해당 사이트로 즉시 이동합니다.</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© 2024 Paik Seung ryong. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <Link to="/track-record" className="hover:text-slate-300 transition-colors">Track Record</Link>
            <Link to="/services" className="hover:text-slate-300 transition-colors">Services</Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-16">
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen bg-slate-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mb-6 mx-auto"></div>
                <p className="text-slate-600 serif text-lg">Loading...</p>
                <p className="text-slate-400 text-sm mt-2">문서를 불러오는 중입니다</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/track-record" element={<TrackRecord />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <div className="flex-none">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
