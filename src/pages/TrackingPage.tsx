
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, Bell, Info, Heart, AlertTriangle, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
};

type DiagnosisReport = {
  possibleConditions: Array<{
    name: string;
    probability: string;
    description: string;
  }>;
  recommendations: string[];
  urgencyLevel: string;
};

const TrackingPage = () => {
  const [diagnosisReport, setDiagnosisReport] = useState<DiagnosisReport | null>(null);
  const [linkedToReport, setLinkedToReport] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '08:00',
  });
  const [symptomsNote, setSymptomsNote] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a saved diagnosis report
    const savedDiagnosis = localStorage.getItem('diagnosisResult');
    if (savedDiagnosis) {
      try {
        setDiagnosisReport(JSON.parse(savedDiagnosis));
      } catch (e) {
        console.error('Error parsing diagnosis result:', e);
      }
    }
    
    // Check for saved medications
    const savedMedications = localStorage.getItem('healthAssistMedications');
    if (savedMedications) {
      try {
        setMedications(JSON.parse(savedMedications));
      } catch (e) {
        console.error('Error parsing saved medications:', e);
      }
    }
    
    // Check for saved tracking status
    const trackingStatus = localStorage.getItem('healthAssistTrackingActive');
    setIsTracking(trackingStatus === 'true');
    
    // Check if already linked to report
    const reportLinkStatus = localStorage.getItem('healthAssistLinkedToReport');
    setLinkedToReport(reportLinkStatus === 'true');
  }, []);

  const handleLinkReport = () => {
    setLinkedToReport(true);
    localStorage.setItem('healthAssistLinkedToReport', 'true');
    
    toast({
      title: "Report linked successfully",
      description: "Your diagnosis report has been linked to your health tracking.",
    });
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    localStorage.setItem('healthAssistTrackingActive', 'true');
    
    toast({
      title: "Health tracking activated",
      description: "You've successfully started your health tracking journey.",
    });
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      toast({
        title: "Missing information",
        description: "Please provide both medication name and dosage.",
        variant: "destructive",
      });
      return;
    }
    
    const medication = {
      id: `med-${Date.now()}`,
      ...newMedication
    };
    
    const updatedMedications = [...medications, medication];
    setMedications(updatedMedications);
    
    // Reset form
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: '08:00',
    });
    
    // Save to localStorage
    localStorage.setItem('healthAssistMedications', JSON.stringify(updatedMedications));
    
    toast({
      title: "Medication added",
      description: `${medication.name} has been added to your tracking list.`,
    });
  };

  const removeMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    localStorage.setItem('healthAssistMedications', JSON.stringify(updatedMedications));
    
    toast({
      description: "Medication removed from your tracking list.",
    });
  };

  const saveSymptomsNote = () => {
    if (!symptomsNote.trim()) return;
    
    localStorage.setItem('healthAssistSymptomsNote', symptomsNote);
    
    toast({
      title: "Symptoms notes saved",
      description: "Your symptoms tracking notes have been saved.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Health Tracking</h1>
          <p className="text-gray-600">
            Monitor your health progress, set medication reminders, and track your symptoms over time.
          </p>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="shadow-md mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 h-5 w-5 text-health-primary" />
                      Tracking Status
                    </CardTitle>
                    <CardDescription>
                      Manage your health tracking journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={isTracking}
                          onCheckedChange={(checked) => {
                            setIsTracking(checked);
                            localStorage.setItem('healthAssistTrackingActive', checked.toString());
                          }}
                          id="tracking-active"
                        />
                        <Label htmlFor="tracking-active" className="font-medium">
                          {isTracking ? "Tracking Active" : "Start Tracking"}
                        </Label>
                      </div>
                      <Badge className={isTracking ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {isTracking ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    {!isTracking && (
                      <div className="p-4 bg-health-primary/5 rounded-lg mb-4">
                        <h3 className="font-medium mb-2">Why start health tracking?</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-health-primary mt-0.5" />
                            <span>Monitor your symptoms progression over time</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-health-primary mt-0.5" />
                            <span>Get medication reminders at scheduled times</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-health-primary mt-0.5" />
                            <span>Keep a record of your health journey for medical consultations</span>
                          </li>
                        </ul>

                        <Button 
                          className="mt-4 w-full md:w-auto bg-health-primary hover:bg-health-primary/90"
                          onClick={handleStartTracking}
                        >
                          Start Tracking Now
                        </Button>
                      </div>
                    )}
                    
                    {diagnosisReport && !linkedToReport && (
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Link to your recent diagnosis report?</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          We've detected a recent diagnosis report. Would you like to link it to your 
                          health tracking for better monitoring and recommendations?
                        </p>
                        <Button 
                          variant="outline"
                          className="border-amber-500 text-amber-600 hover:bg-amber-50"
                          onClick={handleLinkReport}
                        >
                          Link Diagnosis Report
                        </Button>
                      </div>
                    )}
                    
                    {diagnosisReport && linkedToReport && (
                      <div className="border rounded-lg overflow-hidden mb-4">
                        <div className="bg-health-primary/10 p-3">
                          <h3 className="font-medium">Linked Diagnosis Report</h3>
                        </div>
                        <div className="p-4">
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700">Possible Conditions:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {diagnosisReport.possibleConditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className={`
                                  ${condition.probability === 'High' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''} 
                                  ${condition.probability === 'Moderate' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                                  ${condition.probability === 'Low' ? 'bg-green-50 border-green-200 text-green-700' : ''}
                                `}>
                                  {condition.name} ({condition.probability})
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Key Recommendations:</h4>
                            <ul className="mt-1 text-sm space-y-1 text-gray-600">
                              {diagnosisReport.recommendations.slice(0, 2).map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-health-secondary shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3">
                              <Link to="/diagnosis" className="text-sm text-health-primary hover:underline">
                                View full diagnosis report
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isTracking && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">Medication Tracking</h3>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {medications.length} Active
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {medications.length > 0 
                                  ? "You have medication reminders set up."
                                  : "No medications added yet. Add your first medication."}
                              </p>
                              <Button variant="outline" asChild className="w-full" size="sm">
                                <Link to="#medications" onClick={() => document.querySelector('[value="medications"]')?.click()}>
                                  Manage Medications
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">Symptoms Journal</h3>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Active
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Record and track your symptoms over time.
                              </p>
                              <Button variant="outline" asChild className="w-full" size="sm">
                                <Link to="#symptoms" onClick={() => document.querySelector('[value="symptoms"]')?.click()}>
                                  Track Symptoms
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="p-4 bg-health-secondary/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-health-secondary" />
                            <h3 className="font-medium">Upcoming Reminders</h3>
                          </div>
                          
                          {medications.length > 0 ? (
                            <ul className="space-y-2">
                              {medications.slice(0, 3).map((med) => (
                                <li key={med.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                  <div>
                                    <p className="font-medium">{med.name} ({med.dosage})</p>
                                    <p className="text-xs text-gray-500">
                                      {med.frequency} at {med.time}
                                    </p>
                                  </div>
                                  <Bell className="h-4 w-4 text-health-secondary" />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-600">
                              No reminders scheduled. Add medications to set up reminders.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-health-primary" />
                      Health Tracking Benefits
                    </h3>
                    
                    <ul className="space-y-3 text-gray-600 text-sm">
                      <li className="flex gap-2">
                        <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                          1
                        </div>
                        <p>Consistent monitoring helps identify patterns in your health.</p>
                      </li>
                      <li className="flex gap-2">
                        <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                          2
                        </div>
                        <p>Medication reminders ensure you never miss a dose.</p>
                      </li>
                      <li className="flex gap-2">
                        <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                          3
                        </div>
                        <p>Symptom tracking helps your healthcare provider make better-informed decisions.</p>
                      </li>
                      <li className="flex gap-2">
                        <div className="h-5 w-5 bg-health-primary text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                          4
                        </div>
                        <p>Regular monitoring can lead to early detection of health changes.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        <h4 className="font-medium">Health Data Privacy</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Your health data is stored locally on your device. HealthAssist AI does not 
                        transmit or share your personal health information with third parties.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {isTracking && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      className="border-health-primary text-health-primary hover:bg-health-primary/10"
                      onClick={() => navigate('/map')}
                    >
                      Find Healthcare Facilities
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="medications">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="shadow-md mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-health-primary" />
                      Medication Reminders
                    </CardTitle>
                    <CardDescription>
                      Set up reminders for your medications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="med-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Medication Name
                          </Label>
                          <Input
                            id="med-name"
                            value={newMedication.name}
                            onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                            placeholder="e.g., Ibuprofen, Vitamin D"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="med-dosage" className="block text-sm font-medium text-gray-700 mb-1">
                            Dosage
                          </Label>
                          <Input
                            id="med-dosage"
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                            placeholder="e.g., 200mg, 1 tablet"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="med-frequency" className="block text-sm font-medium text-gray-700 mb-1">
                            Frequency
                          </Label>
                          <Select
                            value={newMedication.frequency}
                            onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}
                          >
                            <SelectTrigger id="med-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="twice-daily">Twice Daily</SelectItem>
                              <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="as-needed">As Needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="med-time" className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </Label>
                          <Input
                            id="med-time"
                            type="time"
                            value={newMedication.time}
                            onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          onClick={addMedication}
                          className="bg-health-primary hover:bg-health-primary/90"
                        >
                          Add Medication
                        </Button>
                      </div>
                    </div>
                    
                    {medications.length > 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <h3 className="font-medium mb-3">Your Medications</h3>
                        <div className="space-y-3">
                          {medications.map((med) => (
                            <div key={med.id} className="flex items-center justify-between p-3 bg-white border rounded-md">
                              <div>
                                <div className="font-medium">{med.name}</div>
                                <div className="text-sm text-gray-500">
                                  {med.dosage} • {med.frequency} at {med.time}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeMedication(med.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-health-primary" />
                      Medication Tips
                    </h3>
                    
                    <ul className="space-y-3 text-gray-600 text-sm">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Take medications at the same time each day to establish a routine.</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Some medications should be taken with food, while others work better on an empty stomach.</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Store medications in a cool, dry place unless otherwise specified.</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Always inform your doctor about all medications you're taking, including supplements.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        <h4 className="font-medium">Important Note</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        Always follow your healthcare provider's instructions for medication use. This reminder 
                        system is designed as a convenience tool and is not a replacement for medical advice.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="symptoms">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="shadow-md mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-health-primary" />
                      Symptoms Journal
                    </CardTitle>
                    <CardDescription>
                      Track and record your symptoms over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="symptoms-notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Symptoms Notes
                      </Label>
                      <Textarea
                        id="symptoms-notes"
                        value={symptomsNote}
                        onChange={(e) => setSymptomsNote(e.target.value)}
                        placeholder="Describe your symptoms, their intensity, when they occur, and any patterns you've noticed..."
                        rows={6}
                        className="mb-4"
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="symptom-date" className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </Label>
                          <Input
                            id="symptom-date"
                            type="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="symptom-time" className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </Label>
                          <Input
                            id="symptom-time"
                            type="time"
                            defaultValue={new Date().toTimeString().slice(0, 5)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={saveSymptomsNote}
                        className="bg-health-primary hover:bg-health-primary/90"
                      >
                        Save Symptoms Note
                      </Button>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-3">Symptom Tracking Tips</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex gap-2 items-start">
                          <Check className="h-4 w-4 text-health-secondary mt-0.5" />
                          <p>Be specific about symptom location, intensity, and duration</p>
                        </li>
                        <li className="flex gap-2 items-start">
                          <Check className="h-4 w-4 text-health-secondary mt-0.5" />
                          <p>Note any triggers that seem to worsen your symptoms</p>
                        </li>
                        <li className="flex gap-2 items-start">
                          <Check className="h-4 w-4 text-health-secondary mt-0.5" />
                          <p>Record any treatments you've tried and their effectiveness</p>
                        </li>
                        <li className="flex gap-2 items-start">
                          <Check className="h-4 w-4 text-health-secondary mt-0.5" />
                          <p>Track symptom patterns related to time of day, activities, or foods</p>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-health-primary" />
                      Health Journal Benefits
                    </h3>
                    
                    <ul className="space-y-3 text-gray-600 text-sm">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Helps identify patterns and potential triggers of your symptoms</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Provides valuable information to share with your healthcare provider</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Increases awareness of how lifestyle factors impact your health</p>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                        <p>Allows you to track the effectiveness of treatments over time</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-4">
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-health-primary text-health-primary hover:bg-health-primary/10"
                      >
                        <Link to="/diagnosis">
                          Get New AI Diagnosis
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HealthAssist AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TrackingPage;
