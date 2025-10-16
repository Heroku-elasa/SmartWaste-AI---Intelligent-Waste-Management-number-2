import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, Message } from '../types';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 px-6 pb-2">
            <span className="text-xs text-gray-400 font-medium self-center">{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="px-2.5 py-1 bg-secondary/30 text-gray-200 text-xs font-medium rounded-full hover:bg-secondary/50 hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};


interface AIAssistantPageProps {
  chatHistory: Message[];
  isStreaming: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
}

const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ chatHistory, isStreaming, error, onSendMessage }) => {
  const { t } = useLanguage();
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isStreaming]);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isStreaming) {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isUser = msg.role === 'user';
    const isLastMessage = index === chatHistory.length - 1;
    
    return (
      <div key={index} className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-primary/50">
             <svg className="h-5 w-5 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3V4m0 0H9m4 0h2" />
             </svg>
          </div>
        )}
        <div className={`max-w-xl p-4 rounded-2xl shadow-md ${isUser ? 'bg-primary text-white rounded-br-lg' : 'bg-secondary/30 text-light rounded-bl-lg'}`}>
          <p className="text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
            {msg.parts[0].text}
            {isStreaming && isLastMessage && !isUser && msg.parts[0].text !== '' && <span className="inline-block w-2 h-4 bg-light ml-1 animate-pulse"></span>}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="ai-assistant" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">{t('aiAssistantPage.title')}</h1>
          <p className="mt-4 text-lg text-gray-300">{t('aiAssistantPage.subtitle')}</p>
        </div>

        <div className="mt-12 bg-dark/50 rounded-lg shadow-2xl backdrop-blur-sm border border-secondary/30 flex flex-col h-[70vh] max-h-[700px]">
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {chatHistory.map(renderMessage)}
            <div ref={chatEndRef}></div>
          </div>

          {error && <div className="p-4 mx-4 mb-2 text-sm text-red-300 bg-red-900/40 border border-red-500/50 rounded-lg">{error}</div>}

          {chatHistory.length <= 1 && (
            <ExamplePrompts 
              prompts={t('examplePrompts.aiAssistant')} 
              onPromptClick={(p) => onSendMessage(p)}
              t={t} 
            />
          )}

          <div className="p-4 border-t border-secondary/30">
            <form onSubmit={handleSend} className="flex items-start gap-3">
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                placeholder={t('aiAssistantPage.placeholder')}
                className="flex-grow bg-secondary/20 border-secondary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary text-light resize-none max-h-32 placeholder-gray-400"
                rows={1}
                disabled={isStreaming}
                aria-label={t('aiAssistantPage.placeholder')}
              />
              <button 
                type="submit" 
                disabled={isStreaming || !userInput.trim()} 
                className="p-3 bg-primary text-white rounded-full hover:bg-primary-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPage;