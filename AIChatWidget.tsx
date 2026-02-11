
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Minus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Message = {
  role: 'user' | 'model';
  text: string;
};

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: '안녕하세요. 백승룡 전문가의 AI 상담 어시스턴트입니다. 전략, IR/PR, ESG 경영 등 궁금하신 점을 물어보세요.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 시스템 인스트럭션: 백승룡 전문가의 프로필 정보를 AI에게 주입
  const systemInstruction = `
    당신은 '백승룡(Daniel SR, Paik)' 전문가의 AI 상담 어시스턴트입니다. 
    사용자의 질문에 백승룡 전문가의 경력과 역량을 바탕으로 전문적이고 친절하게 답변하세요.

    [백승룡 전문가 핵심 정보]
    - 경력: 30년 이상의 경영전략 및 자본시장 전문가.
    - 주요 역량: IR, PR, ESG 경영체계 구축, IPO 자문, M&A 전략, 벤처투자.
    - 주요 경력: 
      1. ㈜엠플러스(KOSDAQ 상장사) ESG 기획실장 (현재): IR/PR/ESG 총괄, DART 공시 100% 적시성 달성.
      2. ㈜플레넷 대표이사 (22년): LS그룹 계열사 Spin-off 창업, 50억 투자 유치, 1군 건설사 5만 세대 홈넷 수주.
      3. 벤처캐피탈(현대, LG, 삼부) 책임심사역 (7년): 안철수연구소 등 10개 유망 벤처 투자 성공.
    - 학력: 한양대학교 경영대학원 MBA (IPO 가격 결정 연구), 한양대학교 경영학 학사.
    - 강점: 심사역의 예리한 분석력과 22년 CEO의 실전 경영 감각을 결합한 솔루션 제공.

    [답변 원칙 및 스타일 가이드]
    - 정중하고 신뢰감 있는 비즈니스 톤앤매너를 유지하세요.
    - 구체적인 수치(50억, 22년, 5만 세대 등)를 활용해 전문성을 강조하세요.
    - 중요: 답변 시 마크다운 기호(예: **, __, # 등)를 절대 사용하지 마세요. 강조가 필요한 경우 텍스트의 흐름으로만 강조하세요.
    - 백승룡 전문가가 직접 답변하는 것이 아니라, '어시스턴트'로서 정보를 제공하는 형식입니다.
    - 만약 모르는 정보이거나 상세한 상담이 필요한 경우, 'Contact' 페이지를 통한 상담 신청을 권유하세요.
  `;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const responseStream = await chat.sendMessageStream({ message: userMessage });
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        const textChunk = chunk.text;
        if (textChunk) {
          fullResponse += textChunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: '죄송합니다. 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] md:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#1e3a5f] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center border border-white/20">
                  <Bot size={24} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1e3a5f] rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">백승룡 AI 어시스턴트</h3>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  실시간 상담 가능
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-[#1e3a5f] text-white rounded-tr-none shadow-sm' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 size={16} className="animate-spin text-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="상담 내용을 입력하세요..."
                className="w-full bg-slate-100 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-[#1e3a5f] transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-1 p-2 rounded-full transition-all ${
                  input.trim() && !isTyping ? 'text-[#1e3a5f] hover:bg-slate-200' : 'text-slate-300'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3">
              AI 기술을 통해 생성된 정보입니다.
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group relative ${
          isOpen ? 'bg-slate-100 text-slate-900 rotate-90' : 'bg-[#1e3a5f] text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={28} /> : (
          <>
            <MessageSquare size={28} />
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#1e3a5f] group-hover:animate-ping"></div>
          </>
        )}
        
        {!isOpen && (
          <div className="absolute right-full mr-4 whitespace-nowrap bg-white px-4 py-2 rounded-full text-slate-900 font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
            전문가 AI 상담
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
