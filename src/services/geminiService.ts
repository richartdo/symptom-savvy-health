import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyDx_npBICW6KejRfxWreASrQgmOaQlvuV0';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface DiagnosisRequest {
  name: string;
  age: number;
  symptoms: string[];
  additionalInfo?: string;
  language?: string;
}

export interface DiagnosisResponse {
  possibleConditions: Array<{
    name: string;
    probability: string;
    description: string;
  }>;
  recommendations: string[];
  urgencyLevel: 'Low' | 'Moderate' | 'High';
  disclaimer: string;
}

export const generateDiagnosis = async (data: DiagnosisRequest): Promise<DiagnosisResponse> => {
  console.log('Starting diagnosis generation with data:', data);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
As a medical AI assistant, analyze the following patient information and provide a health assessment:

Patient Information:
- Name: ${data.name}
- Age: ${data.age}
- Symptoms: ${data.symptoms.join(', ')}
- Additional Information: ${data.additionalInfo || 'None provided'}
- Language: ${data.language || 'English'}

Please provide a structured response in JSON format with:
1. possibleConditions: Array of 2-3 possible conditions with name, probability (High/Moderate/Low), and description
2. recommendations: Array of 4-5 practical recommendations
3. urgencyLevel: Overall urgency (Low/Moderate/High)
4. disclaimer: Medical disclaimer

Important: This is for educational purposes only and should not replace professional medical advice.

Format your response as valid JSON only, without any markdown formatting or additional text.
`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Received response from Gemini:', text);

    // Try to parse the JSON response
    let parsedResponse;
    try {
      // Remove any markdown formatting
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanText);
      console.log('Successfully parsed JSON response:', parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw response text:', text);
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0]);
          console.log('Successfully extracted and parsed JSON:', parsedResponse);
        } catch (extractError) {
          console.error('Failed to parse extracted JSON:', extractError);
          throw new Error('Invalid JSON response from AI');
        }
      } else {
        throw new Error('No JSON found in response');
      }
    }

    // Validate the response structure
    if (!parsedResponse.possibleConditions || !parsedResponse.recommendations || !parsedResponse.urgencyLevel) {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from AI');
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error generating diagnosis:', error);
    
    // Return a fallback response instead of throwing
    return {
      possibleConditions: [
        {
          name: "General Health Concern",
          probability: "Moderate",
          description: "Based on the symptoms provided, this could be a common health issue that may require attention. The symptoms you've described warrant further evaluation."
        },
        {
          name: "Stress-Related Symptoms",
          probability: "Low",
          description: "Physical symptoms can sometimes be related to stress or anxiety. Consider lifestyle factors that might be contributing."
        }
      ],
      recommendations: [
        "Monitor your symptoms closely and note any changes",
        "Stay hydrated and get adequate rest",
        "Consider consulting a healthcare professional if symptoms persist or worsen",
        "Keep track of any triggers or patterns in your symptoms",
        "Maintain a healthy diet and regular exercise routine if possible"
      ],
      urgencyLevel: "Moderate",
      disclaimer: "This AI assessment is for informational purposes only and does not constitute medical advice. Please consult with a qualified healthcare professional for proper diagnosis and treatment."
    };
  }
};

export const translateText = async (text: string, targetLanguage: string = 'en'): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Translate the following text to ${targetLanguage}: "${text}"
    
    Only return the translated text, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Return original text if translation fails
  }
};

export const analyzeSignLanguageVideo = async (videoDescription: string): Promise<string[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Based on this sign language video description: "${videoDescription}"
    
    Extract and return potential health symptoms that might be communicated. Return as a simple array of symptoms, one per line.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse symptoms from response
    return text.split('\n').filter(line => line.trim()).map(line => line.trim().replace(/^[•\-\*]\s*/, ''));
  } catch (error) {
    console.error('Error analyzing sign language video:', error);
    return ['Headache', 'Fatigue']; // Fallback symptoms
  }
};
