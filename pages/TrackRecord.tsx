import React from 'react';
import { Calendar, CheckCircle2, Award, Zap, TrendingUp, DollarSign, Building2, Globe, Users, Target } from 'lucide-react';

const TrackRecord: React.FC = () => {
  const cases = [
    {
      title: "㈜엠플러스 IR/PR/ESG 총괄",
      category: "KOSDAQ LISTED CORP",
      period: "2024 - 2026",
      description: "ESG 기획실장으로서 지속가능경영보고서 최초 발간 및 ESG 평가 등급 개선 활동 주도. 공시 적시성 100% 달성 및 투자자·언론 커버리지를 50% 이상 확대함.",
      tags: ["ESG Reporting", "DART Disclosure", "Investor Relations"],
      keyAchievements: [
        "DART 공시 적시성 100% 달성",
        "투자자·언론 커버리지 50% 이상 증가",
        "ESG 지속가능경영보고서 최초 발간"
      ],
      impact: "Coverage Increased by 50%+",
      color: "bg-green-50 border-green-600"
    },
    {
      title: "㈜플레넷 대표이사 (창업, LS 그룹 계열, Spin-Off)",
      category: "MANAGEMENT & M&A",
      period: "1999 - 2021",
      description: "LS그룹 계열사로서 M&A 성공 및 독립법인 운영. 현대·대우·삼성건설 등 1군 건설사 5만 세대 홈넷 수주 및 LG·삼성전자 공동 개발 네트워크 가전 출시. LG전자, STIC인베스트먼트, 산은캐피탈 등으로부터 50억원 규모 투자 유치.",
      tags: ["CEO Experience", "LS Group M&A", "Global Business"],
      keyAchievements: [
        "LS그룹 계열사 M&A 성공 및 독립법인 운영 (22년)",
        "50억원 투자 유치 (LG전자, STIC, 산은캐피탈 등)",
        "현대·대우·삼성건설 5만 세대 홈넷 수주",
        "해외 4개국 사업 확장 (싱가포르, 말레이시아, 이스라엘, 중국)"
      ],
      impact: "50bn KRW Investment + 50K Units",
      color: "bg-blue-50 border-blue-600"
    },
    {
      title: "안철수연구소 등 10개社 벤처투자 성공",
      category: "VENTURE CAPITAL",
      period: "1992 - 1999",
      description: "현대·LG·삼부 벤처캐피탈 3사 책임심사역으로서 안철수연구소, I&C테크놀러지, 사람과기술 등 유망 벤처기업 발굴 및 투자. 포트폴리오 기업의 IPO 및 M&A 자문을 통해 성공적인 Exit 주도.",
      tags: ["Venture Capital", "IPO Advisory", "Due Diligence"],
      keyAchievements: [
        "안철수연구소 등 10개 기업 벤처투자 성공",
        "투자 기업 사업성 평가 및 Due Diligence 수행",
        "포트폴리오 기업 IPO 및 M&A 자문",
        "투자 후 기업가치 극대화 전략 수립"
      ],
      impact: "Successful Exit of 10+ Companies",
      color: "bg-purple-50 border-purple-600"
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dj1xp2ojh/image/upload/v1766722184/%EC%84%B1%EC%9E%A5_%EA%B7%B8%EB%9E%98%ED%94%84_qvsm7p.jpg" 
            alt="성장 그래프 - 경력 성과" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="serif text-4xl md:text-5xl font-bold mb-6">Track Record</h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
            30년의 실무 경력과 20년의 경영 경험이 응축된 결과입니다. 
            상장사 실무와 벤처 투자의 정점에서 쌓아온 독보적인 레퍼런스를 확인하십시오.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Award size={24} />, value: "30년", label: "총 경력" },
              { icon: <Building2 size={24} />, value: "22년", label: "대표이사 경험" },
              { icon: <DollarSign size={24} />, value: "50억+", label: "투자 유치" },
              { icon: <TrendingUp size={24} />, value: "10+", label: "투자 성공" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-full mb-3">
                  {stat.icon}
                </div>
                <div className="font-bold text-2xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12">
          {cases.map((item, index) => (
            <div 
              key={index} 
              className="bg-white document-shadow border-2 border-slate-100 flex flex-col lg:flex-row overflow-hidden hover:border-slate-900 transition-all duration-300 group"
            >
              <div className={`lg:w-1/3 ${item.color} p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200`}>
                <div>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Calendar size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">{item.period}</span>
                  </div>
                  <span className="inline-block px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
                    {item.category}
                  </span>
                  <h3 className="serif text-2xl font-bold text-slate-900 leading-tight mb-4">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Zap size={18} className="text-orange-600" />
                    <span className="text-sm">{item.impact}</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3 p-8 md:p-12">
                <p className="text-slate-700 leading-relaxed text-base mb-8">
                  {item.description}
                </p>
                
                {/* Key Achievements - NEW */}
                <div className="mb-8 bg-slate-50 p-6 border-l-4 border-slate-900 rounded-sm">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Target size={16} />
                    주요 성과 및 실적
                  </h4>
                  <ul className="space-y-3">
                    {item.keyAchievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Focus Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-white text-slate-700 px-3 py-1.5 border border-slate-300 rounded-sm font-medium hover:border-slate-900 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Competency</h4>
                    <div className="flex items-center gap-2 text-slate-900">
                      <CheckCircle2 size={18} className="text-green-600" />
                      <span className="text-sm font-semibold">실전 경영과 자본시장 실무의 융합</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-200">
                  <blockquote className="text-slate-600 italic text-sm leading-relaxed border-l-4 border-slate-300 pl-4">
                    "모든 성과는 단순한 운이 아닌, 철저한 시장 분석과 전략적 소통의 결과입니다."
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Timeline */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">Full Career Timeline</h2>
            <div className="w-16 h-1 bg-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">1992년부터 현재까지의 주요 경력</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line - Centered on MD and larger, left-aligned on mobile */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {[
                { 
                  year: '2024 - 2026', 
                  title: '㈜엠플러스 ESG 기획실장', 
                  desc: '상장사 IR/PR/ESG 총괄',
                  icon: <Building2 size={20} />,
                  color: 'bg-green-600'
                },
                { 
                  year: '2022 - 2023', 
                  title: '㈜지비스 부사장/CSO', 
                  desc: '인테리어 플랫폼 전략 및 제휴 확대',
                  icon: <Target size={20} />,
                  color: 'bg-blue-600'
                },
                { 
                  year: '1999 - 2021', 
                  title: '㈜플레넷 (창업, LS그룹 계열, Spin-Off) 대표이사', 
                  desc: '22년간 경영 총괄 및 사업 확장',
                  icon: <Award size={20} />,
                  color: 'bg-purple-600'
                },
                { 
                  year: '1992 - 1999', 
                  title: 'VC 3사 책임심사역', 
                  desc: '현대·LG·삼부벤처캐피탈 초기 투자',
                  icon: <TrendingUp size={20} />,
                  color: 'bg-orange-600'
                },
                { 
                  year: '1992', 
                  title: '한양대학교 경영대학원 경영학 석사', 
                  desc: 'IPO 가격 결정 연구',
                  icon: <Users size={20} />,
                  color: 'bg-slate-600'
                },
              ].map((milestone, i) => (
                <div key={i} className={`relative flex items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-10 h-10 ${milestone.color} text-white rounded-full border-4 border-white shadow-lg md:-translate-x-1/2 z-10 flex items-center justify-center`}>
                    {milestone.icon}
                  </div>
                  
                  {/* Content side */}
                  <div className="w-full md:w-5/12 ml-20 md:ml-0 md:px-8">
                    <div className={`p-6 bg-white border-2 border-slate-200 rounded-sm hover:border-slate-900 hover:shadow-lg transition-all ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="inline-block font-bold text-blue-600 text-sm mb-2 px-3 py-1 bg-blue-50 rounded-sm">
                        {milestone.year}
                      </span>
                      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2">{milestone.title}</h4>
                      <p className="text-sm text-slate-600">{milestone.desc}</p>
                    </div>
                  </div>
                  
                  {/* Empty side for layout on desktop */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackRecord;