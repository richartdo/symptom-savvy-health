
import { useState } from 'react';
import { translateText } from '../services/geminiService';

export const useTranslation = () => {
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = async (text: string, targetLanguage: string = 'en'): Promise<string> => {
    if (!text || targetLanguage === 'en') return text;
    
    setIsTranslating(true);
    try {
      const translatedText = await translateText(text, targetLanguage);
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  return { translate, isTranslating };
};
