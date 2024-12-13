import React, { useState, useEffect } from 'react';
import { createLLM } from './llms/LLMRegistry';import OllamaConfig from './providers/OllamaConfig';
import OpenAIConfig from './providers/OpenAIConfig';

const LLMConfig = ({ config, onSave }) => {
  const [currentConfig, setCurrentConfig] = useState(config);
  const [testStatus, setTestStatus] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);  // Added missing state

  const providers = [
    { id: 'ollama', name: 'Ollama (Local)', component: OllamaConfig },
    { id: 'openai', name: 'ChatGPT (OpenAI)', component: OpenAIConfig }
  ];

  const testConnection = async () => {
    try {
      const llm = createLLM(currentConfig);
      const isConnected = await llm.testConnection();
      setTestStatus({
        success: isConnected,
        message: isConnected ? 'Connection successful!' : 'Connection failed'
      });
    } catch (error) {
      setTestStatus({
        success: false,
        message: `Connection failed: ${error.message}`
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(currentConfig);
    setSaveStatus('Settings saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="llm-config-form">
      <div className="form-group">
        <label>Select LLM Provider</label>
        <select 
          value={currentConfig.provider}
          onChange={(e) => setCurrentConfig({
            ...currentConfig,
            provider: e.target.value
          })}
        >
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      {providers.map(provider => (
        provider.id === currentConfig.provider && (
          <provider.component 
            key={provider.id}
            config={currentConfig}
            onChange={setCurrentConfig}
          />
        )
      ))}

      <div className="config-actions">
        <button type="button" onClick={testConnection} className="test-btn">
          Test Connection
        </button>
        <button type="submit" className="save-btn">
          Save Configuration
        </button>
      </div>

      {testStatus && (
        <div className={`status-message ${testStatus.success ? 'success' : 'error'}`}>
          {testStatus.message}
        </div>
      )}
      
      {saveStatus && (
        <div className="status-message success">
          {saveStatus}
        </div>
      )}
    </form>
  );
};

export default LLMConfig;