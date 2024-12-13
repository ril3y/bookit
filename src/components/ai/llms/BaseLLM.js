export class BaseLLM {
  constructor(config) {
    this.config = config;
  }

  async testConnection() {
    throw new Error('testConnection must be implemented');
  }

  async generateResponse(prompt, onChunk) {
    throw new Error('generateResponse must be implemented');
  }

  getConfigComponent() {
    throw new Error('getConfigComponent must be implemented');
  }
}
