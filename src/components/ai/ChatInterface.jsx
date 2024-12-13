import React, { useState, useEffect, useRef } from 'react';
import { createLLM } from './llms/LLMRegistry';

const ChatInterface = ({ config, selectedPrompt, promptData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentContext, setCurrentContext] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const messagesEndRef = useRef(null);
  const llm = createLLM(config);

  useEffect(() => {
    testConnection();
  }, [config]);

  const testConnection = async () => {
    try {
      setIsConnected(await llm.testConnection());
    } catch {
      setIsConnected(false);
    }
  };

  const updatePreview = (content) => {
    if (selectedPrompt === 'character') {
      try {
        const characterStart = content.indexOf('[CHARACTER_START]');
        const characterEnd = content.indexOf('[CHARACTER_END]');
        
        if (characterStart !== -1 && characterEnd !== -1) {
          const jsonStr = content.substring(characterStart + 15, characterEnd).trim();
          const characterData = JSON.parse(jsonStr);
          setPreviewData({ type: 'character', data: characterData });
        }
      } catch (e) {
        console.log('Still building character data...');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming || !selectedPrompt) return;

    const userMessage = { role: 'user', content: input };
    const promptedInput = `${promptData}\n\n${input}`;
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    try {
      let assistantMessage = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      await llm.generateResponse(
        promptedInput,
        (chunk) => {
          assistantMessage.content += chunk;
          setMessages(prev => [...prev.slice(0, -1), { ...assistantMessage }]);
          updatePreview(assistantMessage.content);
        },
        (error) => {
          setMessages(prev => [...prev, { 
            role: 'error',
            content: error
          }]);
        }
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="chat-interface-layout">
      <div className="chat-section">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
    
        <div className="input-section">
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isConnected ? "Type your message..." : "Configure LLM settings first"}
              disabled={!isConnected || isStreaming}
              className="chat-input"
            />
            <button 
              type="submit" 
              disabled={!isConnected || isStreaming}
              className="send-button"
            >
              {isStreaming ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>

      <div className="preview-section">
        <h3>Character Preview</h3>
        <div className="preview-content">
          {previewData && (
            <div className="character-card">
              <h4>{previewData.data.name}</h4>
              <div className="attribute">
                <label>Species:</label>
                <span>{previewData.data.species}</span>
              </div>
              <div className="attribute">
                <label>Origin:</label>
                <span>{previewData.data.background?.origin}</span>
              </div>
              <div className="attribute">
                <label>Traits:</label>
                <span>{previewData.data.personality?.traits?.join(', ')}</span>
              </div>
              <div className="attribute">
                <label>Special Talent:</label>
                <span>{previewData.data.personality?.specialTalent}</span>
              </div>
            </div>
          )}
        </div>
        {previewData && (
          <button className="add-to-mindmap">
            Add to Characters
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;