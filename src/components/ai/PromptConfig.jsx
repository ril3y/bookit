import React, { useState } from 'react';

const PromptConfig = ({ prompt, onSave }) => {
  const [currentPrompt, setCurrentPrompt] = useState(prompt);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(currentPrompt);
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-config-form">
      <div className="form-group">
        <label>System Prompt</label>
        <textarea 
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
          rows={6}
          placeholder="Enter your system prompt here..."
        />
      </div>
      <button type="submit">Save Prompt</button>
    </form>
  );
};

export default PromptConfig;
