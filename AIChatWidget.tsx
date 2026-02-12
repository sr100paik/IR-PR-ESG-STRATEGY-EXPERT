
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
      // @ts-ignore
      const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;

      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `
            당신은 '백승룡(Daniel SR, Paik) 프로'의 AI 상담 어시스턴트입니다. 

            [답변 스타일 가이드라인 - 초강력 준수]
            1. **가독성 극대화 (줄바꿈 엄격)**: 
               - '첫째', '둘째', '셋째' 또는 '1.', '2.', '3.' 등으로 내용을 나열할 때는 **반드시 해당 항목이 시작되기 전에 두 번의 줄바꿈(\\n\\n)**을 하여 앞 문단과 완전히 분리된 빈 줄을 만드십시오.
               - 한 단락은 최대 2~3문장을 넘지 않게 구성하고, 내용이 바뀌면 무조건 빈 줄을 삽입하십시오.

            2. **경력 반복 절대 금지**: 
               - '30년 경력', '50억 투자', '22년 CEO' 등의 자기소개성 문구를 매 답변마다 넣지 마십시오. 
               - 이미 대화 초반에 언급되었다면, 이후에는 질문에 대한 답변만 간결하게 핵심 위주로 전달하십시오.

            3. **포맷 제약**: 
               - 마크다운(별표, 샵, 불렛 포인트 기호 등)을 사용하지 마십시오. 
               - 오직 '텍스트'와 '빈 줄(줄바꿈)'만으로 가독성을 확보하십시오.

            4. **호칭 및 태도**: 
               - "백승룡 프로" 또는 "백 프로" 호칭을 사용하고 비즈니스 경어체를 유지하십시오.

            5. **고정 마감 문구**: 
               - 답변 본문이 끝난 후, 반드시 한 줄을 띄우고 다음 문장으로만 마무리하십시오: "상세한 상담은 Contact 메뉴를 통해 요청하실 수 있습니다."

            [핵심 배경 정보]
            - 경영전략, VC 투자심사, 상장사 IR/PR/ESG 실무 경력 30년
            - 22년 벤처 CEO 및 LS그룹 계열사 경영 경험
            - 50억 규모 투자 유치 및 다수의 IPO/M&A 자문 성공
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
        errorDisplay = 'API 키 설정을 읽어오지 못했습니다.';
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
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13.5px] whitespace-pre-wrap leading-relaxed shadow-sm ${
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
