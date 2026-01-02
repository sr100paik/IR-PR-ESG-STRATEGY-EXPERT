import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, Linkedin, Mail, ArrowRight, FileText, Award, TrendingUp, Globe } from 'lucide-react';

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

const Footer = () => (
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

        {/* Contact & Download Section */}
        <div className="flex flex-col md:items-end justify-start space-y-6">
          <div>
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
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
                <span className="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </div>
          
          <a 
            href="https://foj9p10hxsmxhnzm.public.blob.vercel-storage.com/Daniel_SR_Paik_CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-sm transition-all shadow-md hover:shadow-lg group"
          >
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            <span className="font-medium">이력서(PDF) 다운로드</span>
          </a>
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