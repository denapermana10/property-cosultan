import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Sparkles, User, ArrowRight, RefreshCw } from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Saya **Asisten Properti AI Dena Permana**. ✨\n\nSaya siap membantu Anda mencari rekomendasi properti di Bandung Raya, hitung estimasi KPR, atau menjelaskan syarat legalitas tanah.\n\nApa yang ingin Anda tanyakan hari ini?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Cari rumah di bawah Rp 1.5 Milyar di Bandung",
    "Berapa estimasi cicilan KPR rumah 2 Milyar?",
    "Apa bedanya SHM dan AJB?",
    "Bagaimana cara jadwal survei ke Podomoro Park?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
          userProfile: { budget, location }
        })
      });

      const data = await response.json();
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Maaf, terjadi kesalahan teknis. Silakan langsung hubungi Pak Dena melalui WhatsApp di 081324421411 untuk respon cepat!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      // Offline fallback
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `**Tips dari Asisten AI Dena Permana:**\n\nUntuk pertanyaan mengenai "${query}", saya sarankan Anda langsung berkonsultasi dengan Pak Dena secara pribadi.\n\n📲 Hubungi WhatsApp resmi: **081324421411** atau klik tombol konsultasi di bawah ini untuk respon langsung dari Pak Dena!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToWA = () => {
    const chatSummary = messages
      .slice(1)
      .map(m => `${m.sender === 'user' ? 'Pertanyaan Saya' : 'Jawaban AI'}: ${m.text.replace(/\*\*/g, '')}`)
      .join('\n\n');

    openWhatsAppGeneral("", location, budget, `Ringkasan chat dengan Asisten AI:\n${chatSummary.substring(0, 500)}...`);
  };

  // Simple Markdown-like formatter for bold and bullets
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Bold syntax
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={idx} className={`${line.startsWith('-') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') ? 'ml-3 my-1' : 'my-1'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold text-emerald-600 dark:text-emerald-400">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition duration-300 border border-emerald-400/30 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border border-white"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">AI Powered</div>
            <div className="text-xs font-bold leading-tight">Asisten Properti AI</div>
          </div>
          <Sparkles className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-[90vw] sm:w-[400px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm leading-tight flex items-center gap-1.5">
                  Asisten Properti AI Dena <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                </h4>
                <p className="text-[11px] text-emerald-100">Aktif • Siap Bantu Cari Rumah & KPR</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User preferences filter row */}
          <div className="bg-gray-50 dark:bg-gray-800/80 px-3 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs">
            <input
              type="text"
              placeholder="Budget (cth: 1.5M)"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-1/2 bg-white dark:bg-gray-700 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Lokasi (cth: Padalarang)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-1/2 bg-white dark:bg-gray-700 px-2.5 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-gray-950/30 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  {msg.sender === 'ai' ? (
                    <div className="text-xs sm:text-sm leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 w-fit">
                <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
                <span className="text-xs text-gray-500">Asisten AI sedang memikirkan jawaban...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap text-[11px] bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 font-medium transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Direct WhatsApp Convert Button */}
          <div className="px-3 py-1.5 bg-emerald-50 dark:bg-gray-800/90 border-t border-emerald-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              💬 Puas dengan jawaban AI?
            </span>
            <button
              onClick={handleTransferToWA}
              className="text-[11px] font-bold bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs transition"
            >
              <span>Lanjut Chat WA Pak Dena</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Tulis pertanyaan seputar properti..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-100 dark:bg-gray-800 px-3.5 py-2 rounded-xl text-sm border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
