import { BaseLLM } from './BaseLLM';
import OllamaConfig from '../providers/OllamaConfig';

export class OllamaLLM extends BaseLLM {
  async testConnection() {
    try {
      const response = await fetch(`${this.config.settings.url}:${this.config.settings.port}/api/tags`);
      if (!response.ok) {
        throw new Error('Failed to connect to Ollama server');
      }
      const data = await response.json();
      return data.models?.some(m => m.name === this.config.settings.model);
    } catch (error) {
      throw new Error(`Connection failed: ${error.message}`);
    }
  }

  async generateResponse(prompt, onChunk, onError) {
    const requestBody = {
      model: this.config.settings.model,
      prompt: prompt,
      stream: true,
      system: this.config.systemPrompt,
      options: {
        temperature: 0.7,
        keep_alive: "5m"
      }
    };

    try {
      const response = await fetch(`${this.config.settings.url}:${this.config.settings.port}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const data = JSON.parse(chunk);
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        onChunk(data.response);
      }
    } catch (error) {
      onError(`AI Response Error: ${error.message}`);
    }
  }

  getConfigComponent() {
    return OllamaConfig;
  }
}