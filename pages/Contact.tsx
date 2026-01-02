import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Download, CheckCircle, Loader2, Users, Building2, TrendingUp, Scale, Rocket, HelpCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WEB3FORMS_ACCESS_KEY = "42893392-afa4-43c4-a5c5-e94c47cf208b";
  const RESUME_URL = "https://foj9p10hxsmxhnzm.public.blob.vercel-storage.com/Daniel_SR_Paik_CV.pdf";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `[CV Portfolio] 신규 문의: ${formData.get("name")} (${formData.get("company")})`);
    formData.append("from_name", "Paik Seung-ryong CV Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("전송에 실패했습니다: " + (data.message || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("네트워크 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 text-center">
        <div className="max-w-lg bg-slate-50 p-12 document-shadow border border-slate-100 w-full">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="serif text-2xl font-bold mb-4">문의가 성공적으로 전달되었습니다</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            보내주신 문의 내용은 즉시 이메일로 발송되었습니다.<br />
            빠른 시일 내에 기재해주신 연락처로 답변 드리겠습니다.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-slate-900 font-bold hover:underline transition-colors"
          >
            추가 문의하기 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Start a Partnership</h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            성공적인 IR/PR 고도화와 투자 유치를 위한 파트너를 만나십시오.<br />
            백승룡 전문가의 30년 인사이트가 귀사의 해답이 되어 드립니다.
          </p>
        </div>

        {/* Target Clients Section - NEW */}
        <div className="mb-16 bg-white p-8 md:p-12 document-shadow border border-slate-100">
          <div className="flex items-center space-x-3 mb-8">
            <Users className="text-slate-900" size={32} />
            <h2 className="serif text-3xl font-bold text-slate-900">이런 분들께 적합합니다</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 size={24} />,
                title: 'KOSDAQ 상장 준비 비상장사 대표',
                description: 'IPO 준비부터 상장 후 IR 전략까지 전 과정 지원'
              },
              {
                icon: <TrendingUp size={24} />,
                title: 'IR/PR 체계화가 필요한 상장사',
                description: '투자자 커버리지 확대와 기업가치 제고 전략'
              },
              {
                icon: <Scale size={24} />,
                title: 'ESG 경영체계 구축 기업',
                description: '지속가능경영 보고서 발간부터 ESG 평가 대응까지'
              },
              {
                icon: <Rocket size={24} />,
                title: 'M&A Exit 전략 필요 벤처 CEO',
                description: '기업가치 극대화를 위한 전략적 Exit 시나리오'
              },
              {
                icon: <TrendingUp size={24} />,
                title: '투자 유치를 앞둔 스타트업',
                description: 'Series A-C 투자 유치 전략과 IR 피칭 자문'
              },
              {
                icon: <HelpCircle size={24} />,
                title: '기업가치 평가가 필요한 기업',
                description: '정확한 밸류에이션과 투자자 설득 전략 수립'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-sm hover:border-slate-900 transition-all group">
                <div className="text-slate-900 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-3 border border-slate-200 rounded-sm">
                  <Mail size={20} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:sr100@kakao.com" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    sr100@kakao.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-3 border border-slate-200 rounded-sm">
                  <Phone size={20} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                  <a href="tel:010-8796-4381" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    010-8796-4381
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-3 border border-slate-200 rounded-sm">
                  <MapPin size={20} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Activity Area</p>
                  <p className="font-bold text-slate-900">서울, 경기 (전국 컨설팅 지원 가능)</p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-200 bg-white p-8 border border-slate-100 rounded-sm">
              <h3 className="serif text-2xl font-bold mb-4">Executive Profile</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                상세 이력서 및 경력기술서가 필요하신 경우 아래 버튼을 통해 바로 확인하실 수 있습니다.
              </p>
              <a 
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm hover:bg-slate-800 transition-all font-medium shadow-md hover:shadow-lg group"
              >
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                <span>이력서 (PDF) 보기 및 다운로드</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 document-shadow border border-slate-100">
            <h2 className="serif text-2xl font-bold mb-8 text-slate-900">문의하기</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">성함 / 담당자명</label>
                  <input 
                    required 
                    name="name" 
                    type="text" 
                    className="w-full border-b-2 border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors" 
                    placeholder="성함을 입력하세요" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">회사명</label>
                  <input 
                    required 
                    name="company" 
                    type="text" 
                    className="w-full border-b-2 border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors" 
                    placeholder="소속 회사명" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">연락처</label>
                  <input 
                    required 
                    name="phone" 
                    type="tel" 
                    className="w-full border-b-2 border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors" 
                    placeholder="010-0000-0000" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">이메일</label>
                  <input 
                    required 
                    name="email" 
                    type="email" 
                    className="w-full border-b-2 border-slate-200 py-2 focus:border-slate-900 outline-none transition-colors" 
                    placeholder="email@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">상담 희망 분야 (복수선택 가능)</label>
                <div className="grid grid-cols-1 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-sm">
                  {[
                    { value: 'IR 전략 수립', label: 'IR 전략 수립 및 투자자 관계 관리' },
                    { value: 'ESG 경영체계 구축', label: 'ESG 경영체계 구축 및 보고서 발간' },
                    { value: 'IPO 준비 자문', label: 'IPO 준비 및 상장 자문' },
                    { value: 'M&A 실사/협상', label: 'M&A 실사 및 협상 지원' },
                    { value: '투자 유치 지원', label: '투자 유치 및 밸류에이션' },
                    { value: '기타', label: '기타 경영전략 자문' }
                  ].map((option, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        name="consulting_area" 
                        value={option.value}
                        className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">문의 상세 내용</label>
                <textarea 
                  required 
                  name="message" 
                  rows={6} 
                  className="w-full border-2 border-slate-200 p-4 focus:border-slate-900 outline-none transition-colors resize-none rounded-sm" 
                  placeholder="현재 귀사의 상황이나 필요한 솔루션을 적어주세요."
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-4">
                <input 
                  required 
                  type="checkbox" 
                  id="privacy" 
                  className="w-4 h-4 mt-1 rounded border-slate-300 cursor-pointer" 
                />
                <label htmlFor="privacy" className="text-xs text-slate-500 cursor-pointer select-none leading-relaxed">
                  개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 응대 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-slate-900 text-white py-4 rounded-sm font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-slate-800 shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>전송 중...</span>
                  </>
                ) : (
                  <>
                    <span>문의 보내기</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;