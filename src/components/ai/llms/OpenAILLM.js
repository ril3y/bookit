import { BaseLLM } from './BaseLLM';
import OpenAIConfig from '../providers/OpenAIConfig';

export class OpenAILLM extends BaseLLM {
  async testConnection() {
    if (!this.config.settings.apiKey) return false;
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': `Bearer ${this.config.settings.apiKey}` }
    });
    return response.ok;
  }

  async generateResponse(prompt, onChunk) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.settings.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.config.settings.model,
        messages: [{ role: 'user', content: prompt }],
        stream: true
      })
    });

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') return;
        const data = JSON.parse(message);
        const content = data.choices[0].delta.content;
        if (content) onChunk(content);
      }
    }
  }

  getConfigComponent() {
    return OpenAIConfig;
  }
}
