
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Info } from 'lucide-react';
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
      text: '안녕하십니까. 백승룡 프로의 AI 어시스턴트입니다. 경영 전략, IR, ESG 실무 등 궁금하신 사항에 대해 전문적인 조언을 드릴 수 있습니다.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

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
      /**
       * 환경 변수 접근 해결책:
       * 1. process.env.API_KEY (Vercel 기본)
       * 2. import.meta.env.VITE_API_KEY (Vite 브라우저 노출용)
       * 이 두 가지를 모두 체크하여 가장 확실한 값을 사용합니다.
       */
      // @ts-ignore
      const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;

      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // 시스템 가이드라인에 최적화된 모델 사용
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `
            당신은 '백승룡(Daniel SR, Paik) 프로'의 AI 상담 어시스턴트입니다. 
            30년의 경영전략, VC 투자심사, 상장사 IR/PR/ESG 실무 경력을 보유한 백승룡 프로의 전문성을 대변하십시오.

            [핵심 페르소나 및 호칭 규칙]
            - 백승룡 전문가를 지칭할 때는 반드시 "백승룡 프로" 또는 "백 프로"라고 칭하십시오.
            - 정중하고 격조 있는 비즈니스 경어체를 사용하십시오.
            - 마크다운(별표, 샵 등)을 사용하지 말고 깔끔한 텍스트로만 구성하십시오.
            - "50억 투자 유치", "22년 CEO 경력", "LS그룹 계열사 경영" 등 실제 성과를 자연스럽게 언급하십시오.
            - 마지막에는 항상 "상세한 상담은 Contact 메뉴를 통해 요청하실 수 있습니다."를 덧붙이십시오.
          `,
          temperature: 0.7,
        },
        history: messages.slice(1).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const responseStream = await chat.sendMessageStream({ message: userMessage });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const next = [...prev];
            next[next.length - 1].text = fullText;
            return next;
          });
        }
      }
    } catch (error: any) {
      console.error("Connection Error:", error);
      let errorDisplay = '서비스 연결이 원활하지 않습니다.';
      
      if (error.message === "API_KEY_MISSING") {
        errorDisplay = 'API 키 설정을 읽어오지 못했습니다. Vercel 배포 시 VITE_API_KEY가 포함되었는지 확인이 필요합니다.';
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `죄송합니다. ${errorDisplay} 잠시 후 다시 시도해 주시기 바랍니다.`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#0f172a] p-5 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] tracking-tight">백승룡 AI 어시스턴트</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Consulting Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 bg-[#f8fafc]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#0f172a] text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="궁금하신 내용을 입력해 주세요..."
                className="w-full bg-slate-100 border-none rounded-full py-3.5 pl-6 pr-12 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-1.5 p-2.5 rounded-full transition-all ${
                  input.trim() && !isTyping ? 'bg-[#0f172a] text-white shadow-lg' : 'text-slate-300'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <Info size={11} className="text-slate-400" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Powered by Gemini AI Technology</p>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
          isOpen ? 'bg-white text-slate-900 rotate-90 scale-90' : 'bg-[#0f172a] text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageSquare size={28} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-[#0f172a] rounded-full"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
