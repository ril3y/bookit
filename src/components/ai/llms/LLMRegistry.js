import { OllamaLLM } from './OllamaLLM';
import { OpenAILLM } from './OpenAILLM';

export const LLMRegistry = {
  ollama: OllamaLLM,
  openai: OpenAILLM
};

export function createLLM(config) {
  const LLMClass = LLMRegistry[config.provider];
  if (!LLMClass) throw new Error(`Unknown LLM provider: ${config.provider}`);
  return new LLMClass(config);
}
