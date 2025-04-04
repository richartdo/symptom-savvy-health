
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { X, Loader2, Upload, Languages, List, AlertTriangle, Globe } from 'lucide-react';

// Mock symptoms for the dropdown
const commonSymptoms = [
  "Headache", "Fever", "Cough", "Sore throat", "Fatigue", 
  "Nausea", "Vomiting", "Diarrhea", "Abdominal pain",
  "Chest pain", "Shortness of breath", "Dizziness", "Back pain",
  "Joint pain", "Muscle pain", "Rash", "Swelling", "Blurred vision"
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ar", label: "Arabic" },
  { value: "ru", label: "Russian" }
];

// Mock API response delay
const mockDiagnosisAPI = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        possibleConditions: [
          { name: "Common Cold", probability: "High", description: "A viral infection of the upper respiratory tract." },
          { name: "Seasonal Allergies", probability: "Moderate", description: "An immune system response to allergens like pollen." },
          { name: "Migraine", probability: "Low", description: "A headache of varying intensity, often with nausea and sensitivity to light." }
        ],
        recommendations: [
          "Get plenty of rest and stay hydrated",
          "Over-the-counter pain relievers may help alleviate symptoms",
          "Avoid potential triggers like strong odors or bright lights",
          "If symptoms persist for more than 7 days, consult a healthcare professional"
        ],
        urgencyLevel: "Low",
        disclaimer: "This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice."
      });
    }, 2000);
  });
};

const DiagnosisPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSymptomSelect = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSymptomInput('');
  };
  
  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };
  
  const handleVideoUpload = () => {
    setVideoUploading(true);
    
    // Simulate video upload
    setTimeout(() => {
      setHasVideo(true);
      setVideoUploading(false);
      toast({
        title: "Video uploaded successfully",
        description: "Your sign language video has been processed.",
      });
      
      // Auto-populate some symptoms based on the "video"
      setSelectedSymptoms([...selectedSymptoms, "Headache", "Fatigue"]);
    }, 2000);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const diagnosisData = {
        name,
        age: parseInt(age),
        language: selectedLanguage,
        symptoms: selectedSymptoms,
        additionalInfo,
        hasVideo
      };
      
      const result = await mockDiagnosisAPI(diagnosisData);
      setDiagnosisResult(result);
      
      toast({
        title: "Diagnosis report generated",
        description: "AI has analyzed your symptoms and provided insights.",
      });
    } catch (error) {
      toast({
        title: "Error generating diagnosis",
        description: "There was a problem analyzing your symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToTracking = () => {
    // Save diagnosis result to local storage for tracking page
    localStorage.setItem('diagnosisResult', JSON.stringify(diagnosisResult));
    navigate('/tracking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Diagnosis Assistant</h1>
          <p className="text-gray-600">
            Describe your symptoms and our AI will analyze them to provide health insights. 
            Remember, this is not a replacement for professional medical advice.
          </p>
        </div>
        
        {!diagnosisResult ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Age
                        </label>
                        <Input
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Enter your age"
                          min="0"
                          max="120"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                          Preferred Language
                        </label>
                        <div className="flex items-center text-xs text-gray-500">
                          <Globe className="h-3 w-3 mr-1" />
                          Translation Available
                        </div>
                      </div>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            {languages.map((language) => (
                              <SelectItem key={language.value} value={language.value}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Symptoms
                      </label>
                      
                      <div className="flex items-center mb-2 space-x-2">
                        <div className="flex-1">
                          <Select onValueChange={handleSymptomSelect}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select from common symptoms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Common Symptoms</SelectLabel>
                                {commonSymptoms.map((symptom) => (
                                  <SelectItem key={symptom} value={symptom}>
                                    {symptom}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            className="flex items-center"
                            onClick={handleVideoUpload}
                            disabled={videoUploading || hasVideo}
                          >
                            {videoUploading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : hasVideo ? (
                              <>
                                <Languages className="h-4 w-4 mr-2" />
                                Sign Video Added
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Sign Language Video
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Input
                          placeholder="Type another symptom and press Enter"
                          value={symptomInput}
                          onChange={(e) => setSymptomInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && symptomInput.trim()) {
                              e.preventDefault();
                              handleSymptomSelect(symptomInput.trim());
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedSymptoms.map((symptom) => (
                          <Badge key={symptom} variant="outline" className="flex items-center gap-1 bg-health-primary/5">
                            {symptom}
                            <button
                              type="button"
                              onClick={() => removeSymptom(symptom)}
                              className="ml-1 rounded-full hover:bg-health-primary/10 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Information or Questions
                      </label>
                      <Textarea
                        id="additionalInfo"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Please provide any other details about your condition or specific questions you have..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center pt-4">
                      <p className="text-xs text-gray-500 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        This is not a substitute for professional medical advice
                      </p>
                      <Button
                        type="submit"
                        className="bg-health-primary hover:bg-health-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing Symptoms...
                          </>
                        ) : (
                          'Generate Diagnosis Report'
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <List className="h-5 w-5 mr-2 text-health-primary" />
                    How It Works
                  </h3>
                  
                  <ol className="space-y-3 text-gray-600">
                    <li className="flex gap-2">
                      <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        1
                      </div>
                      <p>Enter your basic information including age and name.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        2
                      </div>
                      <p>Select or type your symptoms. You can also upload a sign language video.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        3
                      </div>
                      <p>Add any additional information or specific questions you may have.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        4
                      </div>
                      <p>Submit your information for AI analysis and receive insights about your health.</p>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                        5
                      </div>
                      <p>After receiving your report, you can set up health tracking and reminders.</p>
                    </li>
                  </ol>
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center text-amber-600 mb-2">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <h4 className="font-semibold">Important Disclaimer</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      This AI tool provides health insights based on the symptoms you describe, but is not a replacement for 
                      professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-health-primary">AI Diagnosis Report</h2>
                      <Badge className={`
                        ${diagnosisResult.urgencyLevel === 'Low' ? 'bg-green-100 text-green-800' : ''} 
                        ${diagnosisResult.urgencyLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${diagnosisResult.urgencyLevel === 'High' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {diagnosisResult.urgencyLevel} Urgency
                      </Badge>
                    </div>
                    
                    <div className="p-4 mb-4 bg-health-primary/5 rounded-md">
                      <p className="italic text-gray-600">
                        Based on the symptoms you've provided: <strong>{selectedSymptoms.join(", ")}</strong>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Possible Conditions</h3>
                    <div className="space-y-3">
                      {diagnosisResult.possibleConditions.map((condition: any, index: number) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-semibold">{condition.name}</h4>
                            <Badge variant="outline" className={`
                              ${condition.probability === 'High' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''} 
                              ${condition.probability === 'Moderate' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                              ${condition.probability === 'Low' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                            `}>
                              {condition.probability} Probability
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{condition.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {diagnosisResult.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="text-gray-600">{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-md mb-6">
                    <p className="text-amber-800 text-sm">
                      <strong>Disclaimer:</strong> {diagnosisResult.disclaimer}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-between border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDiagnosisResult(null)}
                    >
                      Start New Diagnosis
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/first-aid')}
                        className="border-health-accent text-health-accent hover:bg-health-accent/10"
                      >
                        First Aid Guidance
                      </Button>
                      <Button 
                        className="bg-health-secondary hover:bg-health-secondary/90"
                        onClick={handleGoToTracking}
                      >
                        Set Up Health Tracking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Next Steps</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-health-primary/5 rounded-md">
                      <h4 className="font-medium mb-1">Set up health tracking</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Track your symptoms over time and set medication reminders to help manage your condition.
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-health-primary w-full"
                        onClick={handleGoToTracking}
                      >
                        Go to Health Tracking
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-health-accent/5 rounded-md">
                      <h4 className="font-medium mb-1">First aid guidance</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Get immediate first aid guidance for common health issues and emergencies.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-health-accent text-health-accent w-full hover:bg-health-accent/10"
                        onClick={() => navigate('/first-aid')}
                      >
                        View First Aid Guide
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-health-secondary/5 rounded-md">
                      <h4 className="font-medium mb-1">Find healthcare facilities</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Locate healthcare facilities near you when professional medical assistance is needed.
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-health-secondary text-health-secondary w-full hover:bg-health-secondary/10"
                        onClick={() => navigate('/map')}
                      >
                        Find Healthcare Facilities
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HealthAssist AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DiagnosisPage;
