
import React from 'react';
import { Award, BookOpen, Globe, Users, Target, Lightbulb, TrendingUp, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-20 text-center fade-in">
          <img 
            src="https://res.cloudinary.com/dj1xp2ojh/image/upload/v1766722184/Whisk_d83f2cffc475960b878402f24b866c7bdr_nlamep.png" 
            alt="백승룡 (Daniel SR, Paik) - IR/PR/ESG 경영전략 전문가" 
            className="w-48 h-48 rounded-full mx-auto object-cover mb-8 border-4 border-slate-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <h1 className="serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">백승룡</h1>
          <p className="text-slate-500 font-medium tracking-widest uppercase text-sm md:text-base">IR · PR · ESG · Strategy Expert</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-16">
          {/* Philosophy Section */}
          <div className="bg-slate-50 p-10 md:p-12 border-l-8 border-slate-900 document-shadow">
            <div className="flex items-start space-x-4 mb-6">
              <Lightbulb className="text-slate-900 flex-shrink-0 mt-1" size={32} />
              <h2 className="serif text-3xl md:text-4xl font-bold text-slate-900">"실무의 정밀함과 경영의 통찰을 잇는 전문가"</h2>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              KOSDAQ 상장사의 IR/PR/ESG 실무와 22년간의 CEO 경영 경력을 모두 보유한 보기 드문 전문가입니다. 
              기업공개(IPO), M&A, 기업가치평가 등 자본시장 전 분야에 걸친 실무 경험을 바탕으로 
              기업의 성장이 숫자로 증명되고 시장에서 인정받도록 돕습니다.
            </p>
            {/* 인용구 글자 크기 복구: text-lg md:text-xl */}
            <div className="bg-white p-12 rounded-sm border border-slate-200 mt-10 shadow-sm relative overflow-hidden">
              <p className="text-slate-500 italic text-lg md:text-xl leading-relaxed mb-10">
                "비즈니스의 가치는 차트에 머물지 않습니다.<br/>
                실체가 있는 성장, 숫자로 증명되는 신뢰만이 지속 가능한 미래를 담보합니다."
              </p>
              <div className="flex justify-end items-center gap-2 text-slate-300">
                <span className="w-6 h-px bg-slate-300"></span>
                <span className="text-sm font-medium tracking-wider">백승룡</span>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 md:p-12 rounded-sm">
            <h3 className="serif text-3xl font-bold mb-8 flex items-center">
              <Target className="mr-3" size={32} />
              3가지 핵심 원칙
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">01</span>
                </div>
                <h4 className="font-bold text-xl">본질 중심</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  화려한 스토리보다 견고한 실적, 데이터로 증명되는 가치 창출에 집중합니다.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">02</span>
                </div>
                <h4 className="font-bold text-xl">투자자 관점</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  7년 VC 경험으로 투자자가 무엇을 보는지 정확히 이해하고 시장이 인정하는 전략을 수립합니다.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">03</span>
                </div>
                <h4 className="font-bold text-xl">장기 파트너십</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  일회성 자문이 아닌 함께 성장하는 전략적 동반자로서 지속적인 가치를 제공합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Expertise Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 p-8 bg-slate-50 border border-slate-200 rounded-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="text-slate-900" size={28} />
                <h3 className="serif text-2xl font-bold">Vision</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                단순히 화려한 수식어로 기업을 포장하지 않습니다. 실체가 있는 전략과 투명한 공시를 통해 
                투자자의 신뢰를 확보하고, 지속가능한 주주가치 제고를 지향합니다.
              </p>
            </div>
            <div className="space-y-6 p-8 bg-slate-50 border border-slate-200 rounded-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="text-slate-900" size={28} />
                <h3 className="serif text-2xl font-bold">Expertise</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                LS그룹 계열사 경영, 벤처투자 심사역, 해외사업 확장(4개국) 경험을 통해 쌓은 네트워크와 분석력은 
                귀사의 신사업 기획, 제휴 및 자본 조달 과정에서 결정적인 자산이 될 것입니다.
              </p>
            </div>
          </div>

          {/* Professional Credentials */}
          <div className="border-t-2 border-slate-200 pt-12">
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="text-slate-900" size={32} />
              <h3 className="serif text-3xl font-bold">Professional Credentials</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 border-l-4 border-blue-600">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                  <Award className="mr-2 text-blue-600" size={20} />
                  특허 및 지적재산권
                </h4>
                <p className="text-slate-700 text-sm">특허 출원/등록 <span className="font-bold text-blue-600">10건</span></p>
              </div>
              <div className="p-6 bg-green-50 border-l-4 border-green-600">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                  <BookOpen className="mr-2 text-green-600" size={20} />
                  학술 연구
                </h4>
                <p className="text-slate-700 text-sm">석사논문: 최초 공모주(IPO) 가격 결정에 관한 연구</p>
              </div>
              <div className="p-6 bg-purple-50 border-l-4 border-purple-600">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                  <Users className="mr-2 text-purple-600" size={20} />
                  주요 협력사
                </h4>
                <p className="text-slate-700 text-sm">현대건설, 대우건설, 삼성건설, LG전자, 삼성전자</p>
              </div>
              <div className="p-6 bg-orange-50 border-l-4 border-orange-600">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                  <TrendingUp className="mr-2 text-orange-600" size={20} />
                  투자사 네트워크
                </h4>
                <p className="text-slate-700 text-sm">LG전자, STIC인베스트먼트, 산은캐피탈, 미래에셋벤처</p>
              </div>
              <div className="p-6 bg-indigo-50 border-l-4 border-indigo-600 md:col-span-2">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                  <Globe className="mr-2 text-indigo-600" size={20} />
                  글로벌 파트너십
                </h4>
                <p className="text-slate-700 text-sm">
                  LG CNS (싱가포르), Metronics (말레이시아), Yitran (이스라엘), 중국/일본 기술제휴
                </p>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="border-t-2 border-slate-200 pt-12">
            <h3 className="serif text-3xl font-bold mb-10">Professional Experience</h3>
            <div className="space-y-6">
              {[
                { 
                  company: '㈜엠플러스 (KOSDAQ)', 
                  role: 'ESG 기획실장', 
                  period: '2024 - 2026',
                  tag: 'CURRENT',
                  tagColor: 'bg-green-500'
                },
                { 
                  company: '㈜지비스', 
                  role: '부사장 / CSO', 
                  period: '2022 - 2023',
                  tag: 'STRATEGY',
                  tagColor: 'bg-blue-500'
                },
                { 
                  company: '㈜플레넷 (창업, LS그룹 계열, Spin-Off)', 
                  role: '대표이사 / 사장', 
                  period: '1999 - 2021',
                  tag: 'CEO 22Y',
                  tagColor: 'bg-purple-500'
                },
                { 
                  company: '현대·LG·삼부 벤처캐피탈 3사', 
                  role: '책임심사역', 
                  period: '1992 - 1999',
                  tag: 'VC 7Y',
                  tagColor: 'bg-orange-500'
                },
              ].map((job, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-slate-200 rounded-sm hover:shadow-md transition-all group"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`${job.tagColor} text-white text-xs font-bold px-2 py-1 rounded uppercase`}>
                        {job.tag}
                      </span>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.company}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600">{job.role}</p>
                  </div>
                  <div className="text-slate-400 font-mono text-sm mt-2 md:mt-0 md:ml-4">
                    {job.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Background */}
          <div className="border-t-2 border-slate-200 pt-12">
            <h3 className="serif text-3xl font-bold mb-10 text-center">Academic Background</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 border-2 border-slate-200 rounded-sm hover:border-slate-900 transition-colors">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="text-slate-900" size={24} />
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Graduate School</p>
                </div>
                <p className="font-bold text-slate-900 text-lg mb-2">한양대학교 경영대학원</p>
                <p className="text-slate-600 mb-1">경영학 석사 (MBA)</p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  석사논문: 최초 공모주(IPO) 가격 결정에 관한 연구 (1992)
                </p>
              </div>
              <div className="p-8 bg-slate-50 border-2 border-slate-200 rounded-sm hover:border-slate-900 transition-colors">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="text-slate-900" size={24} />
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">University</p>
                </div>
                <p className="font-bold text-slate-900 text-lg mb-2">한양대학교</p>
                <p className="text-slate-600 mb-1">경영학 학사 (BBA)</p>
                <p className="text-xs text-slate-500 mt-3">1985 - 1989</p>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-slate-900 text-white p-10 md:p-12 rounded-sm">
            <h3 className="serif text-3xl font-bold mb-8">Skills & Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-slate-400 mb-3 font-bold uppercase tracking-wider text-xs">Finance</p>
                <ul className="space-y-2 text-sm">
                  <li>• 회계·세무조정</li>
                  <li>• 기업가치평가</li>
                  <li>• 재무분석</li>
                  <li>• M&A 실무</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 mb-3 font-bold uppercase tracking-wider text-xs">Strategy</p>
                <ul className="space-y-2 text-sm">
                  <li>• IR/PR 전략</li>
                  <li>• ESG 체계구축</li>
                  <li>• IPO 자문</li>
                  <li>• 사업개발</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 mb-3 font-bold uppercase tracking-wider text-xs">IT/Software</p>
                <ul className="space-y-2 text-sm">
                  <li>• MS Office</li>
                  <li>• AI Tools</li>
                  <li>• 특허출원(10건)</li>
                  <li>• 데이터 분석</li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 mb-3 font-bold uppercase tracking-wider text-xs">Languages</p>
                <ul className="space-y-2 text-sm">
                  <li>• 영어 (비즈니스)</li>
                  <li>• 영문계약/협상</li>
                  <li>• 국제회의</li>
                  <li>• 글로벌 IR</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
