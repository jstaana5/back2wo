import { useEffect, useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';

interface AgentChatProps {
  isAnalyzing: boolean;
  showResults: boolean;
}

interface Message {
  agent: 'seller' | 'buyer';
  text: string;
  timestamp: number;
}

const chatMessages: Omit<Message, 'timestamp'>[] = [
  {
    agent: 'seller',
    text: "Hello! I've analyzed this product - it's a cotton t-shirt with excellent potential. Made from 100% organic cotton, sustainably sourced. Let me pitch this to you!"
  },
  {
    agent: 'buyer',
    text: "Interesting! Tell me more about the material sourcing and production costs."
  },
  {
    agent: 'seller',
    text: "Great question! I've identified 3 certified suppliers: EcoTextile Co. ($4.20/unit), GreenThread ($4.50/unit with GOTS certification), and SustainWeave ($4.80/unit, carbon-neutral). All use organic cotton from verified sustainable farms."
  },
  {
    agent: 'buyer',
    text: "The pricing is competitive. What about the environmental impact and quality certifications?"
  },
  {
    agent: 'seller',
    text: "All suppliers have OEKO-TEX Standard 100 certification. The fabric is 180 GSM weight, breathable, and biodegradable. Carbon footprint is 2.3kg CO2 per unit - 40% lower than conventional cotton. Perfect for eco-conscious brands!"
  },
  {
    agent: 'buyer',
    text: "Excellent pitch! The sustainability metrics are impressive. I'm particularly interested in the GreenThread option with GOTS certification. Let's proceed with a sample order to verify quality."
  },
  {
    agent: 'seller',
    text: "Perfect! I'll connect you with GreenThread. They can provide samples within 5-7 business days. MOQ is 100 units, with bulk discounts at 500+ units. Shall I initiate the connection?"
  },
  {
    agent: 'buyer',
    text: "Yes, please proceed! This looks like a great sustainable product opportunity. Looking forward to the partnership."
  }
];

export function AgentChat({ isAnalyzing, showResults }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (showResults && currentMessageIndex < chatMessages.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { ...chatMessages[currentMessageIndex], timestamp: Date.now() }
        ]);
        setCurrentMessageIndex(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showResults, currentMessageIndex]);

  useEffect(() => {
    if (isAnalyzing) {
      setMessages([]);
      setCurrentMessageIndex(0);
    }
  }, [isAnalyzing]);

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-600" />
          AI Agents Conversation
        </h3>
        <p className="text-sm text-gray-600">Seller & Buyer negotiating</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isAnalyzing && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
              <p className="text-gray-600">Analyzing product...</p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.agent === 'seller' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.agent === 'seller' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.agent === 'seller'
                  ? 'bg-gradient-to-br from-purple-100 to-blue-100'
                  : 'bg-gradient-to-br from-green-100 to-emerald-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wide opacity-70">
                  {message.agent === 'seller' ? 'AI Seller' : 'AI Buyer'}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>

            {message.agent === 'buyer' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {currentMessageIndex < chatMessages.length && messages.length > 0 && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {showResults && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-center text-gray-600">
            {currentMessageIndex >= chatMessages.length 
              ? '🎉 Connection established! Deal in progress...'
              : 'Agents are negotiating...'}
          </p>
        </div>
      )}
    </div>
  );
}
