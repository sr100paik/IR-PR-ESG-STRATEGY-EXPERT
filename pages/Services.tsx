import React from 'react';
import { Link } from 'react-router-dom';
import { Target, BarChart4, Globe, Zap, Users, Search, Award, TrendingUp, Shield, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-24">
      {/* Hero */}
      <section className="relative bg-white py-24 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dj1xp2ojh/image/upload/v1766722183/%ED%8E%9C%EA%B3%BC_%ED%83%AD_y1wyug.jpg" 
            alt="전문 컨설팅 서비스" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Expert Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            상장사의 신뢰 구축과 스타트업의 비약적 성장을 위해<br />
            맞춤형 경영 전략 및 자본시장 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      {/* Why Choose 백승룡 - NEW */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif text-3xl md:text-4xl font-bold mb-4">왜 백승룡인가?</h2>
            <div className="w-16 h-1 bg-white/30 mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              단순 자문이 아닌, 함께 성장하는 전략적 파트너십
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users size={32} />,
                title: "심사역 관점",
                description: "투자자가 무엇을 보는지 정확히 압니다",
                detail: "벤처캐피탈 3사에서 7년간 10개 기업 투자 성공",
                color: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500"
              },
              {
                icon: <Award size={32} />,
                title: "CEO 경험",
                description: "경영 현장의 한계와 가능성을 이해합니다",
                detail: "22년 대표이사로 50억 투자유치, 5만 세대 수주",
                color: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500"
              },
              {
                icon: <Target size={32} />,
                title: "상장사 실무",
                description: "IR/PR/ESG 실전 노하우를 보유합니다",
                detail: "KOSDAQ 상장사 ESG기획실장, DART 공시 100% 달성",
                color: "bg-green-500/10 border-green-500/30 hover:border-green-500"
              },
              {
                icon: <Globe size={32} />,
                title: "글로벌 네트워크",
                description: "해외 제휴·투자 경험이 풍부합니다",
                detail: "싱가포르, 말레이시아, 이스라엘, 중국 사업 성공",
                color: "bg-orange-500/10 border-orange-500/30 hover:border-orange-500"
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.color} p-8 border-2 rounded-sm transition-all duration-300 group`}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-200 mb-4 leading-relaxed">{item.description}</p>
                <p className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-4">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Core Principles */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-sm">
            <h3 className="serif text-2xl font-bold mb-8 text-center">3가지 핵심 원칙</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "본질 중심",
                  desc: "화려한 스토리보다 견고한 실적과 데이터로 증명되는 가치 창출"
                },
                {
                  number: "02",
                  title: "투자자 관점",
                  desc: "7년 VC 경험으로 시장이 인정하는 전략 수립과 실행"
                },
                {
                  number: "03",
                  title: "장기 파트너십",
                  desc: "일회성 자문이 아닌 지속적인 동반 성장 관계 구축"
                }
              ].map((principle, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">{principle.number}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{principle.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Services - Enhanced */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 bg-slate-900 text-white rounded-lg">
              <Target size={28} />
            </div>
            <div>
              <h2 className="serif text-3xl font-bold">상장사 IR/PR/ESG 고도화</h2>
              <p className="text-sm text-slate-500 mt-1">Corporate IR/PR & Sustainability Advisory</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "전략적 IR/PR 시스템 구축", 
                desc: "단순한 공시를 넘어, 기업의 성장 스토리를 시장에 각인시키는 데이터 기반 IR/PR 컨텐츠 제작 및 투자자 미팅 프로세스 최적화.",
                icon: BarChart4,
                benefits: [
                  "실적발표 자료 및 NDR 전략 수립",
                  "기관투자자 미팅 주관 및 IR 달력 관리",
                  "언론 네트워킹 및 전략적 PR 캠페인"
                ]
              },
              { 
                title: "ESG 경영 내재화", 
                desc: "공시 의무 대응을 넘어 실제 비즈니스 가치를 높이는 ESG KPI 수립 및 평가지표(MSCI, KCGS 등) 관리 지원.",
                icon: Globe,
                benefits: [
                  "지속가능경영 보고서 발간 주도",
                  "ESG 평가 대응 및 등급 개선 활동",
                  "이해관계자 소통 채널 구축"
                ]
              },
              { 
                title: "시장 소통 강화 (Targeting)", 
                desc: "국내외 우량 기관 투자자 및 애널리스트 네트워크를 활용한 집중 타겟팅과 리서치 리포트 커버리지 확대 유도.",
                icon: Users,
                benefits: [
                  "애널리스트 커버리지 확대 전략",
                  "해외 기관투자자 IR 로드쇼",
                  "위기관리 커뮤니케이션 프로세스"
                ]
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-8 border-2 border-slate-200 document-shadow flex flex-col hover:border-slate-900 hover:-translate-y-2 transition-all duration-300 group">
                <s.icon className="text-slate-400 mb-6 group-hover:text-slate-900 group-hover:scale-110 transition-all" size={36} />
                <h3 className="font-bold text-xl mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3">주요 서비스</p>
                  <ul className="space-y-2">
                    {s.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Services - Enhanced */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 bg-white text-slate-900 rounded-lg">
              <Zap size={28} />
            </div>
            <div>
              <h2 className="serif text-3xl font-bold">스타트업 성장 및 엑시트</h2>
              <p className="text-sm text-slate-400 mt-1">Startup Growth & M&A Strategy</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-10 border-2 border-slate-700 hover:border-emerald-500 transition-all duration-300 rounded-sm group">
              <div className="flex items-center gap-3 mb-6">
                <Search size={24} className="text-emerald-400" />
                <h3 className="serif text-2xl font-bold">IPO / M&A 액셀러레이팅</h3>
              </div>
              <ul className="space-y-5 text-slate-300 mb-8">
                <li className="flex gap-4">
                  <span className="text-emerald-400 font-bold text-lg flex-shrink-0">01</span>
                  <div>
                    <p className="font-semibold mb-1">상장(IPO) 사전 점검</p>
                    <p className="text-sm text-slate-400">지배구조/내부통제 시스템 정비 및 심사 대응</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-400 font-bold text-lg flex-shrink-0">02</span>
                  <div>
                    <p className="font-semibold mb-1">M&A 실사 및 밸류에이션</p>
                    <p className="text-sm text-slate-400">매수/매도 실사 지원 및 적정 기업가치 평가</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-emerald-400 font-bold text-lg flex-shrink-0">03</span>
                  <div>
                    <p className="font-semibold mb-1">Exit 후 성장 전략</p>
                    <p className="text-sm text-slate-400">지속적인 성장 모델 및 시너지 창출 방안</p>
                  </div>
                </li>
              </ul>
              <div className="pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">실제 성과</p>
                <p className="text-sm text-slate-300">안철수연구소 등 10개 기업 IPO 및 M&A Exit 성공</p>
              </div>
            </div>

            <div className="bg-slate-800 p-10 border-2 border-slate-700 hover:border-blue-500 transition-all duration-300 rounded-sm group">
              <div className="flex items-center gap-3 mb-6">
                <BarChart4 size={24} className="text-blue-400" />
                <h3 className="serif text-2xl font-bold">투자 유치 및 사업 타당성</h3>
              </div>
              <ul className="space-y-5 text-slate-300 mb-8">
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-lg flex-shrink-0">01</span>
                  <div>
                    <p className="font-semibold mb-1">IR 피치덱 고도화</p>
                    <p className="text-sm text-slate-400">Series A-C 투자 유치를 위한 스토리텔링</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-lg flex-shrink-0">02</span>
                  <div>
                    <p className="font-semibold mb-1">비즈니스 모델 검증</p>
                    <p className="text-sm text-slate-400">시장 타당성 분석 및 매출 추정 모델 설계</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-400 font-bold text-lg flex-shrink-0">03</span>
                  <div>
                    <p className="font-semibold mb-1">투자자 매칭</p>
                    <p className="text-sm text-slate-400">VC 및 전략적 투자자(SI) 네트워크 연결</p>
                  </div>
                </li>
              </ul>
              <div className="pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">실제 성과</p>
                <p className="text-sm text-slate-300">LG전자, STIC, 산은캐피탈 등 총 50억원 투자 유치</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <Lightbulb size={48} className="text-slate-900 mx-auto mb-6" />
          </div>
          <h2 className="serif text-3xl md:text-4xl font-bold mb-6 text-slate-900">진단이 필요하신가요?</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            현재 기업의 IR/PR 현황이나 ESG 지표, 또는 준비 중인 딜에 대해<br />
            30분 이내의 가벼운 티타임으로 인사이트를 나눠보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl group"
            >
              <span>무료 진단 문의하기</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/track-record" 
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-sm font-semibold hover:bg-slate-900 hover:text-white transition-all"
            >
              주요 성과 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;