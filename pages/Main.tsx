
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Briefcase, ChevronRight, Award, Users, Globe, DollarSign, Building2, Target, ShieldCheck, BriefcaseBusiness } from 'lucide-react';

const Main: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dj1xp2ojh/image/upload/v1766722185/%EB%A9%94%EC%9D%B8%EB%B0%B0%EA%B2%BD_3_df7tkr.png" 
            alt="백승룡 - IR/PR/ESG 경영전략 전문가" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 rounded-sm">
              Executive Summary & Strategy
            </span>
            <h1 className="serif text-4xl md:text-6xl font-bold leading-tight mb-8">
              투자와 경영의 경계를 허무는 30년,<br />
              <span className="text-blue-400">실전 전략가</span> 백승룡입니다.
            </h1>
            <div className="bg-white/5 backdrop-blur-sm border-l-2 border-blue-400 p-6 mb-10">
              <p className="text-base md:text-lg text-slate-200 leading-relaxed font-light">
                <span className="font-semibold text-white">KOSDAQ 상장사 IR/PR/ESG 실무 + 벤처 CEO 22년 경력</span><br />
                심사역의 예리한 통찰과 경영자의 책임감 있는 심장으로,<br />
                기업의 본질적 가치를 증명하고 자본시장의 신뢰를 구축합니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-slate-900 px-8 py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all uppercase tracking-widest"
              >
                Consulting Request
                <ArrowRight size={16} />
              </Link>
              <Link 
                to="/track-record" 
                className="border border-white/40 text-white px-8 py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all uppercase tracking-widest"
              >
                Track Record
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="serif text-4xl font-bold text-slate-900 mb-6">Core Competencies</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                상장사와 스타트업, 서로 다른 두 세계를 연결하는 전략적 가교 역할을 수행합니다. 
                기업의 생애 주기에 맞춘 최적의 성과 지표를 제안합니다.
              </p>
            </div>
            <Link 
              to="/services" 
              className="text-slate-900 font-bold text-sm flex items-center gap-1 hover:underline group uppercase tracking-widest"
            >
              전체 서비스 보기 
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-12 document-shadow border border-slate-100 relative group">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 block">For Listed Corporations</span>
              <h3 className="serif text-3xl font-bold mb-8 text-slate-900">
                IR / PR / ESG 고도화 전략
              </h3>
              <ul className="space-y-5 text-slate-600 mb-12">
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">시장 신뢰 회복을 위한 투명한 공시 체계 구축</span>
                </li>
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">글로벌 스탠다드에 부합하는 ESG 경영 로드맵</span>
                </li>
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">기관 투자자 및 애널리스트 타겟 마케팅</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 italic font-medium">Maximize Enterprise Value</span>
                <Link 
                  to="/services" 
                  className="bg-slate-900 text-white p-3 rounded-full hover:bg-slate-800 transition-all shadow-md"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="bg-white p-12 document-shadow border border-slate-100 relative group">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-6 block">For Startups & Ventures</span>
              <h3 className="serif text-3xl font-bold mb-8 text-slate-900">
                IPO / M&A 엑셀러레이팅
              </h3>
              <ul className="space-y-5 text-slate-600 mb-12">
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">자본 조달(Series A-C)을 위한 투자 유치 전략</span>
                </li>
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">상장 심사를 대비한 경영 투명성 확보</span>
                </li>
                <li className="flex items-start">
                  <span className="list-dot"></span> 
                  <span className="text-[15px]">최적의 Exit을 위한 M&A 타당성 분석</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 italic font-medium">Strategic Growth & Exit</span>
                <Link 
                  to="/services" 
                  className="bg-slate-900 text-white p-3 rounded-full hover:bg-slate-800 transition-all shadow-md"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section - 통일된 회색 계열(Slate) 디자인으로 변경 */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif text-3xl font-bold text-slate-900 mb-4">Key Achievements</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase">경험과 실력으로 증명된 숫자들</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: DART */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">100%</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">DART 공시 적시성</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">단 한 건의 불성실 공시 없음</p>
            </div>
            
            {/* Card 2: Coverage */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <TrendingUp size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">+50%</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">투자자 커버리지 확대</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">기관 투자자 유입 및 리서치 활성화</p>
            </div>

            {/* Card 3: Portfolio */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <BriefcaseBusiness size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">10+</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">투자 성공 포트폴리오</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">안철수연구소 등 대표적 엑시트 성공</p>
            </div>

            {/* Card 4: Investment */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <DollarSign size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">50억+</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">투자 유치 실적</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">LG전자, STIC, 산은캐피탈 등</p>
            </div>

            {/* Card 5: Supply */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <Building2 size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">5만 세대</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">홈넷 수주 규모</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">현대·대우·삼성건설 1군 건설사</p>
            </div>

            {/* Card 6: Global */}
            <div className="bg-white p-10 flex flex-col items-center text-center relative border border-slate-200 hover:border-slate-900 transition-all shadow-sm rounded-sm group">
              <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <span className="text-[32px] font-bold text-[#0F172A] mb-3">4개국</span>
              <h4 className="text-[15px] font-bold text-[#334155] mb-2">글로벌 사업 확장</h4>
              <p className="text-[13px] text-slate-400 leading-relaxed">싱가포르, 말레이시아, 이스라엘, 중국</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <span className="serif text-6xl text-slate-700 italic font-bold">"</span>
          </div>
          <p className="serif text-xl md:text-2xl text-white font-medium mb-12 leading-relaxed">
            비즈니스의 가치는 차트에 머물지 않습니다.<br />
            실체가 있는 성장, 숫자로 증명되는 신뢰만이 지속 가능한 미래를 담보합니다.
          </p>
          <div className="w-20 h-px bg-slate-600 mx-auto mb-8"></div>
          <p className="text-slate-400 font-light tracking-[0.3em] uppercase text-xs">
            Strategic Advisor, Paik Seung Ryong
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
