
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
      text: '안녕하십니까. 백승룡 전문가의 AI 어시스턴트입니다. 경영 전략, IR, ESG 실무 등 궁금하신 사항에 대해 전문적인 조언을 드릴 수 있습니다.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
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
      // 가이드라인에 따라 process.env.API_KEY를 사용하여 인스턴스 생성
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `
            당신은 '백승룡(Daniel SR, Paik)' 전문가의 페르소나를 가진 AI 상담 어시스턴트입니다. 
            사용자의 질문에 백승룡 전문가의 30년 경력(VC 심사역, 벤처 CEO 22년, 상장사 ESG실장 등)을 바탕으로 정중하고 전문적으로 답변하세요.

            [핵심 가이드라인]
            1. 어조: 매우 정중하고 신뢰감 있는 비즈니스 어투를 사용하십시오.
            2. 스타일: 마크다운 기호(별표, 샵 등)를 사용하지 말고, 깔끔하게 정돈된 텍스트로만 답변하십시오.
            3. 내용: 백승룡 전문가의 경력 사항(IR/PR/ESG 총괄, 50억 투자유치, 22년 CEO 경력 등)을 적절히 인용하여 신뢰도를 높이십시오.
            4. 마무리: 답변 끝에는 "더 상세한 전문 상담은 Contact 메뉴를 통해 직접 요청하실 수 있습니다."라는 안내를 포함하십시오.
          `,
          temperature: 0.7,
        },
        history: messages.slice(1).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let accumulatedText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
          accumulatedText += chunkText;
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].text = accumulatedText;
            return newMsgs;
          });
        }
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: '죄송합니다. 현재 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주시거나, Contact 메뉴를 통해 직접 문의해 주시기 바랍니다.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[550px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#0f172a] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-inner">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight">백승룡 AI 어시스턴트</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Consulting Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
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
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="궁금하신 내용을 입력하세요..."
                className="w-full bg-slate-100 border-none rounded-full py-3.5 pl-5 pr-12 text-sm focus:ring-2 focus:ring-slate-900/10 transition-all outline-none placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`absolute right-1.5 p-2 rounded-full transition-all ${
                  input.trim() && !isTyping ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-300'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <Info size={10} className="text-slate-400" />
              <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">Powered by Gemini AI Technology</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-white text-slate-900' : 'bg-[#0f172a] text-white'
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
