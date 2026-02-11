
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Key, AlertCircle, Info, ExternalLink } from 'lucide-react';
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
      text: '안녕하세요. 백승룡 전문가의 AI 상담 어시스턴트입니다. 전략, IR/PR, ESG 경영 등 궁금하신 점을 편하게 물어보세요.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<'none' | 'key_missing' | 'api_error'>('none');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `
    당신은 '백승룡(Daniel SR, Paik)' 전문가의 AI 상담 어시스턴트입니다. 
    사용자의 질문에 백승룡 전문가의 경력과 역량을 바탕으로 전문적이고 친절하게 답변하세요.

    [백승룡 전문가 핵심 정보]
    - 경력: 30년 이상의 경영전략 및 자본시장 전문가.
    - 주요 역량: IR, PR, ESG 경영체계 구축, IPO 자문, M&A 전략, 벤처투자.
    - 주요 경력: 1. ㈜엠플러스 ESG 기획실장, 2. ㈜플레넷 대표이사 (22년), 3. VC 책임심사역 (7년).
    - 답변 원칙: 마크다운(별표 등) 기호를 절대 사용하지 마세요. 텍스트로만 정중하게 답변하세요.
  `;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOpenKeySelector = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setErrorStatus('none');
    } else {
      setErrorStatus('key_missing');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const currentHistory = [...messages];
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    setErrorStatus('none');

    try {
      const apiKey = process.env.API_KEY;
      
      if (!apiKey || apiKey === "undefined" || apiKey === "") {
        throw new Error("API_KEY_MISSING");
      }

      // 가이드라인: 호출 직전 인스턴스 생성
      const ai = new GoogleGenAI({ apiKey });
      
      // 첫 환영 메시지를 제외하고 히스토리 구성
      const chatHistory = currentHistory.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        },
        history: chatHistory
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
    } catch (error: any) {
      console.error("AI Chat Error Detail:", error);
      
      if (error.message === "API_KEY_MISSING" || error.message?.includes("403")) {
        setErrorStatus('key_missing');
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'API 키가 설정되지 않았거나 접근 권한이 없습니다. 아래 Vercel 배포 가이드를 확인해 주세요.' 
        }]);
      } else {
        setErrorStatus('api_error');
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: '죄송합니다. 서비스와 통신하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' 
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[360px] md:w-[400px] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#1e3a5f] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm">백승룡 AI 어시스턴트</h3>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${errorStatus === 'none' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <p className="text-[10px] text-slate-300 uppercase tracking-tighter">Strategic Consultant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleOpenKeySelector}
                title="API 키 설정"
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
              >
                <Key size={18} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1e3a5f] text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vercel Specific Error Guide */}
            {errorStatus === 'key_missing' && (
              <div className="mx-2 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={20} className="text-amber-600" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">Vercel 환경 변수 설정 필요</span>
                </div>
                <div className="space-y-3 text-[11px] leading-relaxed">
                  <p>현재 Vercel 서버에 <b>API_KEY</b>가 등록되어 있지 않습니다.</p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-600">
                    <li>Vercel 대시보드 → 해당 프로젝트 선택</li>
                    <li><b>Settings</b> → <b>Environment Variables</b> 클릭</li>
                    <li>Key: <code className="bg-amber-100 px-1 py-0.5 rounded">API_KEY</code> 입력</li>
                    <li>Value: <b>Gemini API 키</b> 입력 후 Save</li>
                    <li><b>Redeploy</b>를 실행해야 반영됩니다.</li>
                  </ol>
                  <a 
                    href="https://vercel.com/docs/projects/environment-variables" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-700 font-bold hover:underline mt-2"
                  >
                    Vercel 설정 방법 자세히 보기 <ExternalLink size={10} />
                  </a>
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
                placeholder={errorStatus === 'key_missing' ? "API 키 설정 후 시도해 주세요" : "상담 내용을 입력하세요..."}
                disabled={errorStatus === 'key_missing'}
                className="w-full bg-slate-100 border-none rounded-full py-3.5 pl-5 pr-12 text-sm focus:ring-2 focus:ring-[#1e3a5f]/20 transition-all outline-none disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping || errorStatus === 'key_missing'}
                className={`absolute right-1.5 p-2.5 rounded-full transition-all ${
                  input.trim() && !isTyping ? 'bg-[#1e3a5f] text-white shadow-lg' : 'text-slate-300'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-slate-400">
              <Info size={10} />
              <p className="text-[9px] uppercase tracking-widest font-medium">Powered by Gemini 3 Flash</p>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-white text-slate-900 rotate-90 scale-90' : 'bg-[#1e3a5f] text-white hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageSquare size={28} />
            <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 border-2 border-[#1e3a5f] rounded-full ${errorStatus === 'none' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
