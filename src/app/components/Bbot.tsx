import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_REPLIES = [
  'Tell me about your projects',
  'What are your skills?',
  'How can I contact you?',
  'Your experience?',
  'What technologies do you use?',
  'Tell me about your education',
  'What are you passionate about?',
  'Any certifications?',
];

const BOT_RESPONSES: { [key: string]: string } = {
  'tell me about your projects':
    'I have built several projects, including the Smart Security Private Room (IoT), the AI-Powered Financial Digital Twin for Systemic Risk & Shock Propagation, and this Portfolio Website. I am also working on an upcoming AI-powered Health Monitoring system!',

  'what technologies do you use?':
    'I work with Python, C, Java, JavaScript, SQL, HTML, CSS, Django, React, VS Code, Figma, and Git, matching the technical toolbox on my resume.',

  'how can i contact you?':
    'You can contact me through email at komallasahith@gmail.com, or connect with me on GitHub, LinkedIn, or Instagram from the contact section.',

  'what are you learning currently?':
    'Currently, I am deepening my expertise in advanced AI/ML techniques, edge computing, health tech AI, and improving my full-stack development skills.',

  'tell me about your education':
    'I am pursuing my B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning) at Vidya Jyothi Institute of Technology (2024-2028), currently maintaining a 9.05/10 CGPA.',

  'what are you passionate about?':
    'I am passionate about creating practical AI solutions, building IoT systems that solve real problems, developing financial technology, and creating seamless user experiences through web development.',

  'any certifications?':
    'I hold Cisco certifications in Python Essentials, Java, and DBMS, as well as an IoT Bootcamp Certificate from ABTechVille/VJIT.',

  'your experience?':
    'I have experience participating in hackathons (like the Smart India Hackathon and 24-Hour hackathons) and building academic & personal projects. I have worked on IoT systems, AI applications, financial analysis tools, and full-stack web development.',

  'tell me about iot project':
    'My Smart Security Private Room (IoT) project uses a NodeMCU ESP8266 microcontroller integrated with PIR, IR, and MC-38 magnetic sensors. It implements real-time intrusion detection, buzzer alerts, and remote web monitoring.',

  'tell me about financial project':
    'The AI-Powered Financial Digital Twin for Systemic Risk & Shock Propagation uses Python and React to model systemic risk across assets and simulate shock propagation using historical market data and shock-detection modules.',

  'tell me about portfolio website':
    'This Portfolio Website was built using React, Vite, GSAP animations, and Tailwind CSS. It showcases my projects, skills, certifications, and coursework with interactive features.',

  'tell me about upcoming project':
    'My upcoming project is an AI-powered Health Monitoring system that combines wearable technology with machine learning for real-time health tracking, anomaly detection, and personalized health insights. Expected completion in Q2 2026.',

  default:
    "Hi! I'm Sahith's portfolio assistant. Feel free to ask about projects, skills, experience, or anything else about Sahith!",
};
export default function Bbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm B Bot 👋 Welcome to Sahith's portfolio! How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (buttonRef.current) {
      // Floating animation for the button
      gsap.to(buttonRef.current, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, transformOrigin: 'bottom right' },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const normalizedInput = messageText.toLowerCase();
      let response = BOT_RESPONSES.default;

      for (const key in BOT_RESPONSES) {
        if (normalizedInput.includes(key)) {
          response = BOT_RESPONSES[key];
          break;
        }
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 md:bottom-28 right-6 w-[90vw] md:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            minHeight: '520px',
            maxHeight: '80vh',
            height: 'auto',
            border: '1px solid rgba(0,0,0,0.1)',
            zIndex: 99998,
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles size={20} color="white" />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Bbot
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: '#888',
                  }}
                >
                  AI Assistant
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} color="white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ background: '#f5f5f0' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl"
                  style={{
                    background: msg.sender === 'user' ? '#1a1a1a' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#1a1a1a',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    boxShadow: msg.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl bg-white"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-6 py-3 flex flex-wrap gap-2" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(reply)}
                  className="px-3 py-1.5 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: '#1a1a1a',
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-6 py-4 bg-white border-t border-black/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  background: '#f5f5f0',
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-3 bg-black text-white rounded-xl hover:bg-black/80 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Toggle chat"
        className="fixed bottom-6 right-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-black to-gray-800 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all"
        style={{
          border: '2px solid rgba(255,255,255,0.2)',
          zIndex: 99999,
          boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
            style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.4)' }}
          />
        )}
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 0 rgba(0,0,0,0.4);
          }
          50% {
            box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 8px rgba(0,0,0,0.1);
          }
        }
      `}</style>
    </>
  );
}
