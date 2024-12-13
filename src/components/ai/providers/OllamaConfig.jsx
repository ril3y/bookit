import React, { useState, useEffect } from 'react';

const OllamaConfig = ({ config, onChange }) => {
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch(`${config.settings.url}:${config.settings.port}/api/tags`);
      const data = await response.json();
      setAvailableModels(data.models || []);
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
    }
  };

  return (
    <div className="provider-config">
      <div className="form-group">
        <label>URL</label>
        <input 
          type="text"
          value={config.settings.url}
          onChange={(e) => onChange({
            ...config,
            settings: { ...config.settings, url: e.target.value }
          })}
        />
      </div>
      <div className="form-group">
        <label>Port</label>
        <input 
          type="text"
          value={config.settings.port}
          onChange={(e) => onChange({
            ...config,
            settings: { ...config.settings, port: e.target.value }
          })}
        />
      </div>
      <div className="form-group">
        <label>Model</label>
        <select
          value={config.settings.model}
          onChange={(e) => onChange({
            ...config,
            settings: { ...config.settings, model: e.target.value }
          })}
        >
          {availableModels.map(model => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OllamaConfig;