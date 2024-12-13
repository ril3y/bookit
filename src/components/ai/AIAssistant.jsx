import React, { useState } from 'react';
import { characterPrompt } from '../ai/prompts/characterPrompt';
import { plotPrompt } from '../ai/prompts/plotPrompt';
import { themePrompt } from '../ai/prompts/themePrompt';
import LLMConfig from './LLMConfig';
import ChatInterface from './ChatInterface';
import { OllamaLLM } from './llms/OllamaLLM';
import { OpenAILLM } from './llms/OpenAILLM';
import './AIAssistant.css';

const AIAssistant = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('character');
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('llmConfig');
    return savedConfig ? JSON.parse(savedConfig) : {
      settings: {
        url: 'http://localhost',
        port: '11434',
        model: '',
        apiKey: ''
      }
    };
  });

  const getPrompt = () => {
    switch (selectedPrompt) {
      case 'character':
        return characterPrompt;
      case 'plot':
        return plotPrompt;
      case 'theme':
        return themePrompt;
      default:
        return '';
    }
  };

  const createLLM = (config) => {
    switch (config.provider) {
      case 'ollama':
        return new OllamaLLM(config);
      case 'openai':
        return new OpenAILLM(config);
      default:
        throw new Error('Unsupported provider');
    }
  };

  const saveConfig = async (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('llmConfig', JSON.stringify(newConfig));
    const llm = createLLM(newConfig);
    const isConnected = await llm.testConnection();
    setIsConfigured(isConnected);
    if (isConnected) {
      setShowConfig(false);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <h2>AI Writing Assistant</h2>
        <div className="ai-status">
          {isConfigured && (
            <span className="configured-status">
              Connected to: {config.provider} ({config.settings.model})
            </span>
          )}
          <button 
            className="config-toggle"
            onClick={() => setShowConfig(!showConfig)}
          >
            {showConfig ? '✕ Close Settings' : '⚙️ Configure AI'}
          </button>
        </div>
      </div>

      {showConfig ? (
        <div className="ai-config-panel">
          <LLMConfig config={config} onSave={saveConfig} />
        </div>
      ) : (
        <>
          <div className="prompt-selector">
            <button 
              className={`prompt-button ${selectedPrompt === 'character' ? 'active' : ''}`}
              onClick={() => setSelectedPrompt('character')}
            >
              Characters
            </button>
            <button 
              className={`prompt-button ${selectedPrompt === 'plot' ? 'active' : ''}`}
              onClick={() => setSelectedPrompt('plot')}
            >
              Plots
            </button>
            <button 
              className={`prompt-button ${selectedPrompt === 'theme' ? 'active' : ''}`}
              onClick={() => setSelectedPrompt('theme')}
            >
              Themes
            </button>
          </div>

          <ChatInterface 
            config={config} 
            isConfigured={isConfigured}
            selectedPrompt={selectedPrompt}
            promptData={getPrompt()}
          />
        </>
      )}
    </div>
  );
};

export default AIAssistant;