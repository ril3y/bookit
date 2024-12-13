import React from 'react';
import Terminal from 'react-console-emulator';
import { createLLM } from '../ai/llms/LLMRegistry';
import './LLMTerminal.css';

const LLMTerminal = ({ config, isVisible }) => {
  const llm = createLLM(config);
  
  const commands = {
    ask: {
      description: 'Ask the LLM a question',
      usage: 'ask <question>',
      fn: async (...args) => {
        const question = args.join(' ');
        let response = '';
        
        await llm.generateResponse(
          question,
          (chunk) => {
            response += chunk;
            return response;
          },
          (error) => `Error: ${error}`
        );
        
        return response;
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="terminal-overlay">
      <Terminal
        commands={commands}
        noDefaults
        welcomeMessage="Welcome to the LLM Terminal! Type 'ask' followed by your question."
        promptLabel="❯"
        style={{
          height: '50vh',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          padding: '20px',
          fontFamily: 'Fira Code, monospace',
          fontSize: '14px',
        }}
      />
    </div>
  );
};

export default LLMTerminal;