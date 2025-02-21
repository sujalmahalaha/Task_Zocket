"use client";

import { useState } from "react";
import { Send, Bot, Loader2 } from "lucide-react";

export default function AiChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    // Simulating an AI response
    setTimeout(() => {
      const dummyResponses = [
        "Here's a productivity tip: Break the task into smaller, manageable parts and set specific deadlines for each. This makes large tasks less overwhelming and easier to track.",
        "Consider using the Pomodoro technique: Work for 25 minutes, then take a 5-minute break. This helps maintain focus while preventing burnout.",
        "Try prioritizing tasks using the Eisenhower Matrix: Organize them by urgency and importance to better manage your workflow.",
        "Set SMART goals for each task: Specific, Measurable, Achievable, Relevant, and Time-bound objectives help ensure clear progress tracking.",
      ];
      const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];

      setMessages(prev => [...prev, { type: 'ai', content: randomResponse }]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-violet-500" />
          <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">Ask for task management suggestions and productivity tips</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No messages yet. Ask me anything about task management!</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                message.type === 'user'
                  ? 'bg-violet-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-xl rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleAskAI}
            disabled={loading || !input.trim()}
            className="bg-violet-500 hover:bg-violet-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
