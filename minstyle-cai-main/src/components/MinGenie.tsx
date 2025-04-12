
import React, { useState } from 'react';
import { MessageSquare, X, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MinGenie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: "Hi there! I'm minGenie, your AI fashion assistant. Tell me what you're looking for or about an event, and I'll suggest the perfect outfit!" 
    }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Simulate bot response (in a real app, this would call an AI API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "Based on your style, I'd recommend a minimal outfit with sustainable pieces. How about a recycled cotton oversized tee, paired with high-waisted jeans and eco-friendly sneakers? Would you like to see some options?"
      }]);
    }, 1000);
    
    setInput('');
  };
  
  return (
    <>
      {/* Chat button */}
      <Button 
        onClick={() => setIsOpen(true)} 
        className={`fixed z-40 bottom-6 right-6 rounded-full w-14 h-14 shadow-lg ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } transition-opacity duration-300 bg-minOrange hover:bg-minOrange/90`}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
      
      {/* Chat panel */}
      <div 
        className={`fixed z-40 bottom-6 right-6 w-full sm:max-w-sm bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat header */}
        <div className="flex justify-between items-center px-4 py-3 bg-minBlack border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
            <h3 className="font-semibold text-white">minGenie Stylist</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X size={18} className="text-gray-400" />
          </Button>
        </div>
        
        {/* Chat messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-minOrange text-white' 
                    : 'bg-gray-800 text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask minGenie for outfit ideas..."
            className="flex-1 bg-gray-800 border-gray-700 focus-visible:ring-minOrange"
          />
          <Button type="submit" size="icon" className="bg-minOrange hover:bg-minOrange/90">
            <Send size={18} />
          </Button>
        </form>
        
        {/* Quick prompts */}
        <div className="px-3 pb-3 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-gray-700 hover:bg-gray-800 flex items-center"
            onClick={() => setInput("I need an outfit for a casual date")}
          >
            Date night <ArrowUpRight size={12} className="ml-1" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-gray-700 hover:bg-gray-800 flex items-center"
            onClick={() => setInput("Show me sustainable brands")}
          >
            Sustainable <ArrowUpRight size={12} className="ml-1" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MinGenie;
