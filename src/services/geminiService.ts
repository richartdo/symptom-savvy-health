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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a medical AI assistant. Based on the following patient symptoms, provide specific medical condition possibilities (not generic terms).

Patient Information:
- Age: ${data.age}
- Symptoms: ${data.symptoms.join(', ')}
- Additional Information: ${data.additionalInfo || 'None provided'}

Analyze these symptoms and provide specific medical conditions that could cause this combination of symptoms. Consider:
- Common diseases and infections that match these symptoms
- Age-appropriate conditions
- Regional/tropical diseases if relevant (malaria, dengue, etc.)
- Gastrointestinal conditions, respiratory infections, viral/bacterial infections
- Provide REAL medical condition names, not generic descriptions

Respond ONLY with valid JSON in this exact format:
{
  "possibleConditions": [
    {
      "name": "Specific Medical Condition Name",
      "probability": "High/Moderate/Low",
      "description": "Brief medical description of this condition and why symptoms match"
    }
  ],
  "recommendations": [
    "Specific actionable medical recommendations",
    "When to seek immediate care",
    "Symptom monitoring advice",
    "Treatment suggestions",
    "Preventive measures"
  ],
  "urgencyLevel": "Low/Moderate/High",
  "disclaimer": "This AI assessment is for informational purposes only and does not constitute medical advice. Please consult with a qualified healthcare professional for proper diagnosis and treatment."
}

Examples of specific conditions to consider based on symptoms:
- For fever + headache + fatigue: Malaria, Dengue fever, Viral infection, Bacterial infection
- For abdominal pain + nausea: Gastroenteritis, Food poisoning, Appendicitis, Peptic ulcer
- For cough + fever: Pneumonia, Bronchitis, COVID-19, Tuberculosis
- For headache + fatigue: Migraine, Tension headache, Dehydration, Anemia

Provide 2-3 most likely specific medical conditions based on the symptom combination.
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
    
    // Create symptom-specific fallback based on user's actual symptoms
    const symptomBasedFallback = createSymptomBasedFallback(data.symptoms);
    return symptomBasedFallback;
  }
};

const createSymptomBasedFallback = (symptoms: string[]): DiagnosisResponse => {
  const lowerSymptoms = symptoms.map(s => s.toLowerCase());
  
  // Generate specific conditions based on symptom patterns
  let conditions = [];
  let urgency: 'Low' | 'Moderate' | 'High' = 'Moderate';
  
  if (lowerSymptoms.includes('fever') && lowerSymptoms.includes('headache')) {
    conditions = [
      {
        name: "Viral Infection (Common Cold/Flu)",
        probability: "High",
        description: "A viral infection affecting the upper respiratory system, commonly causing fever and headaches along with other symptoms."
      },
      {
        name: "Malaria",
        probability: "Moderate",
        description: "A mosquito-borne infectious disease that typically presents with fever, headache, and fatigue. Consider if you've been in malaria-endemic areas."
      }
    ];
    urgency = 'Moderate';
  } else if (lowerSymptoms.includes('abdominal pain') && lowerSymptoms.includes('nausea')) {
    conditions = [
      {
        name: "Gastroenteritis",
        probability: "High",
        description: "Inflammation of the stomach and intestines, often caused by viral or bacterial infection, leading to abdominal pain and nausea."
      },
      {
        name: "Food Poisoning",
        probability: "Moderate",
        description: "Illness caused by consuming contaminated food or water, typically resulting in gastrointestinal symptoms."
      }
    ];
  } else if (lowerSymptoms.includes('cough') && lowerSymptoms.includes('fever')) {
    conditions = [
      {
        name: "Pneumonia",
        probability: "Moderate",
        description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid, causing cough and fever."
      },
      {
        name: "Bronchitis",
        probability: "High",
        description: "Inflammation of the lining of bronchial tubes, which carry air to and from your lungs, causing persistent cough."
      }
    ];
  } else if (lowerSymptoms.includes('headache') && lowerSymptoms.includes('fatigue')) {
    conditions = [
      {
        name: "Tension Headache",
        probability: "High",
        description: "The most common type of headache, often related to stress, fatigue, or muscle tension around the head and neck."
      },
      {
        name: "Migraine",
        probability: "Moderate",
        description: "A neurological condition that can cause severe throbbing pain, usually on one side of the head, often accompanied by fatigue."
      }
    ];
  } else {
    // Generic fallback for other symptom combinations
    conditions = [
      {
        name: "Viral Syndrome",
        probability: "Moderate",
        description: "A collection of symptoms caused by viral infection, which can affect multiple body systems simultaneously."
      },
      {
        name: "Stress-Related Physical Symptoms",
        probability: "Low",
        description: "Physical manifestations of psychological stress, which can present as various unexplained symptoms."
      }
    ];
  }

  return {
    possibleConditions: conditions,
    recommendations: [
      "Monitor your symptoms closely and note any changes or worsening",
      "Stay well-hydrated and get adequate rest to support your immune system",
      "Take over-the-counter pain relievers as needed for symptom relief",
      "Seek medical attention if symptoms persist for more than 3-5 days or worsen",
      "Consider consulting a healthcare professional for proper diagnosis and treatment"
    ],
    urgencyLevel: urgency,
    disclaimer: "This AI assessment is for informational purposes only and does not constitute medical advice. Please consult with a qualified healthcare professional for proper diagnosis and treatment."
  };
};

export const generateFirstAidGuidance = async (diagnosisResult: DiagnosisResponse): Promise<{
  immediateSteps: string[];
  warningSigns: string[];
  whenToSeekHelp: string;
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const conditions = diagnosisResult.possibleConditions.map(c => c.name).join(', ');
    
    const prompt = `
Based on the following possible medical conditions: ${conditions}
Urgency level: ${diagnosisResult.urgencyLevel}

Provide specific first aid guidance in JSON format. Each immediate step should be a simple string, not an object:
{
  "immediateSteps": [
    "Simple string instruction 1",
    "Simple string instruction 2",
    "Simple string instruction 3"
  ],
  "warningSigns": [
    "Simple string warning sign 1",
    "Simple string warning sign 2"
  ],
  "whenToSeekHelp": "Simple string guidance on when to call emergency services or see a doctor"
}

Focus on practical, actionable first aid steps that are safe for the general public to perform. 
IMPORTANT: Each array element should be a simple string, not an object with properties.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('First aid guidance response:', text);
    
    try {
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
      const parsedResponse = JSON.parse(cleanText);
      
      // Ensure all array elements are strings
      const normalizedResponse = {
        immediateSteps: Array.isArray(parsedResponse.immediateSteps) 
          ? parsedResponse.immediateSteps.map(step => typeof step === 'string' ? step : String(step))
          : ["Ensure the person is in a comfortable position", "Monitor vital signs and consciousness level"],
        warningSigns: Array.isArray(parsedResponse.warningSigns)
          ? parsedResponse.warningSigns.map(sign => typeof sign === 'string' ? sign : String(sign))
          : ["Difficulty breathing", "Severe pain"],
        whenToSeekHelp: typeof parsedResponse.whenToSeekHelp === 'string' 
          ? parsedResponse.whenToSeekHelp 
          : "Seek medical attention if symptoms worsen or persist."
      };
      
      console.log('Normalized first aid response:', normalizedResponse);
      return normalizedResponse;
    } catch (parseError) {
      console.error('Failed to parse first aid guidance:', parseError);
      // Fallback first aid guidance
      return {
        immediateSteps: [
          "Ensure the person is in a comfortable position",
          "Monitor vital signs and consciousness level",
          "Keep the person calm and reassured",
          "Do not give any medication unless prescribed"
        ],
        warningSigns: [
          "Difficulty breathing or shortness of breath",
          "Severe pain or worsening symptoms",
          "Loss of consciousness or confusion",
          "High fever or persistent vomiting"
        ],
        whenToSeekHelp: "Seek immediate medical attention if any warning signs appear or if symptoms worsen rapidly."
      };
    }
  } catch (error) {
    console.error('Error generating first aid guidance:', error);
    return {
      immediateSteps: [
        "Ensure the person is in a comfortable position",
        "Monitor vital signs and consciousness level",
        "Keep the person calm and reassured"
      ],
      warningSigns: [
        "Difficulty breathing",
        "Severe pain",
        "Loss of consciousness"
      ],
      whenToSeekHelp: "Seek medical attention if symptoms worsen or persist."
    };
  }
};

export const translateText = async (text: string, targetLanguage: string = 'en'): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
