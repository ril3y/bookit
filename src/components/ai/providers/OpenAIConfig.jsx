import React from 'react';

const OpenAIConfig = ({ config, onChange }) => {
  return (
    <div className="provider-config">
      <div className="form-group">
        <label>API Key</label>
        <input 
          type="password"
          value={config.settings.apiKey}
          onChange={(e) => onChange({
            ...config,
            settings: { ...config.settings, apiKey: e.target.value }
          })}
          placeholder="Enter your OpenAI API key"
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
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </div>
    </div>
  );
};

export default OpenAIConfig;