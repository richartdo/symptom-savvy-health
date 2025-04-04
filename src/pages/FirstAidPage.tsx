
import { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Search, Info, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// First aid data
const firstAidData = [
  {
    id: "cuts-and-scrapes",
    title: "Cuts and Scrapes",
    urgency: "Low",
    steps: [
      "Clean your hands with soap and water.",
      "Apply gentle pressure with a clean cloth to stop bleeding.",
      "Clean the wound with cool running water or saline solution.",
      "Apply antibiotic ointment to prevent infection.",
      "Cover with a clean bandage or dressing."
    ],
    when_to_seek_help: "If the cut is deep, gaping, or won't stop bleeding after 10-15 minutes of pressure."
  },
  {
    id: "burns",
    title: "Burns",
    urgency: "Moderate",
    steps: [
      "Remove the source of heat or stop the burning process.",
      "Remove clothing and jewelry from the burned area unless stuck to the skin.",
      "Cool the burn with cool (not cold) running water for 10-15 minutes.",
      "Cover with a clean, non-stick bandage or cloth.",
      "Do not apply butter, oil, or ice to burns."
    ],
    when_to_seek_help: "For burns larger than the size of your palm, burns on the face/hands/feet, or if blisters form."
  },
  {
    id: "choking",
    title: "Choking",
    urgency: "High",
    steps: [
      "If the person can speak, cough, or breathe, encourage them to keep coughing.",
      "If they can't speak, cough, or breathe, stand behind them and place one foot slightly forward for balance.",
      "Put your arms around their waist, make a fist with one hand and place it just above their navel.",
      "Grasp your fist with your other hand and pull inward and upward with quick, forceful thrusts.",
      "Repeat until the object is dislodged or emergency help arrives."
    ],
    when_to_seek_help: "Call emergency services immediately if the person cannot speak, cough, or breathe."
  },
  {
    id: "sprain-strain",
    title: "Sprains and Strains",
    urgency: "Low",
    steps: [
      "Rest the injured area and avoid activities that cause pain.",
      "Apply ice wrapped in a thin cloth for 15-20 minutes several times a day.",
      "Use compression with an elastic bandage to reduce swelling.",
      "Elevate the injured area above the level of the heart when possible.",
      "Over-the-counter pain relievers may help reduce pain and inflammation."
    ],
    when_to_seek_help: "If you can't bear weight on the injured limb, have severe pain, or if swelling doesn't improve within 2-3 days."
  },
  {
    id: "fever",
    title: "Fever",
    urgency: "Moderate",
    steps: [
      "Rest and get plenty of fluids to prevent dehydration.",
      "Take over-the-counter fever reducers like acetaminophen or ibuprofen as directed.",
      "Dress in lightweight clothing and use light blankets.",
      "Take a lukewarm bath or apply cool cloths to the forehead, neck, and wrists.",
      "Monitor temperature regularly."
    ],
    when_to_seek_help: "For adults: fever above 103°F (39.4°C), lasting more than 3 days, or accompanied by severe headache, stiff neck, confusion, or difficulty breathing."
  },
  {
    id: "allergic-reaction",
    title: "Allergic Reaction",
    urgency: "High",
    steps: [
      "Remove the allergen if possible (e.g., stop eating suspected food).",
      "If prescribed, use an epinephrine auto-injector (like an EpiPen) for severe reactions.",
      "Take an antihistamine if the reaction is mild and you can swallow safely.",
      "Apply cold compress to itchy areas for mild reactions.",
      "Monitor for worsening symptoms."
    ],
    when_to_seek_help: "Immediately if there's difficulty breathing, facial/throat swelling, dizziness, or severe vomiting."
  },
];

const FirstAidPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const filteredGuides = firstAidData.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">First Aid Guidance</h1>
          <p className="text-gray-600">
            Quick reference guides for common emergencies and health concerns. 
            Always seek professional medical help for serious situations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-health-primary" />
                  Find First Aid Guide
                </CardTitle>
                <CardDescription>
                  Search for specific conditions or emergencies
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search first aid guides..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {filteredGuides.map((guide) => (
                    <Button
                      key={guide.id}
                      variant="outline"
                      className={`h-auto py-3 px-4 justify-start flex-col items-start text-left ${
                        activeGuide === guide.id ? 'border-health-primary bg-health-primary/5' : ''
                      }`}
                      onClick={() => setActiveGuide(guide.id)}
                    >
                      <div className="w-full flex justify-between items-start mb-1.5">
                        <span className="font-medium line-clamp-1">{guide.title}</span>
                        <Badge className={`
                          ml-1 shrink-0
                          ${guide.urgency === 'Low' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${guide.urgency === 'Moderate' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                          ${guide.urgency === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                        `}>
                          {guide.urgency}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">View steps</span>
                    </Button>
                  ))}
                </div>
                
                {filteredGuides.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No first aid guides found for "{searchTerm}"</p>
                    <Button
                      variant="link"
                      onClick={() => setSearchTerm('')}
                      className="mt-2"
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {activeGuide && (
              <Card className="shadow-md animate-fade-in">
                {firstAidData.filter(guide => guide.id === activeGuide).map((guide) => (
                  <CardContent key={guide.id} className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">{guide.title}</h2>
                      <Badge className={`
                        ${guide.urgency === 'Low' ? 'bg-green-100 text-green-800' : ''}
                        ${guide.urgency === 'Moderate' ? 'bg-amber-100 text-amber-800' : ''}
                        ${guide.urgency === 'High' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {guide.urgency} Urgency
                      </Badge>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Steps to Take</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        {guide.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-md">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                        <h3 className="font-semibold text-amber-800">When to Seek Medical Help</h3>
                      </div>
                      <p className="text-amber-700">
                        {guide.when_to_seek_help}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        asChild
                        className="bg-health-primary hover:bg-health-primary/90"
                      >
                        <Link to="/map">
                          Find Nearby Healthcare Facilities
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                ))}
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                    <h3 className="font-medium text-red-800 mb-1">Emergency Services</h3>
                    <p className="text-xl font-bold text-red-700">911</p>
                    <p className="text-xs text-red-600 mt-1">
                      Call for life-threatening emergencies
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <h3 className="font-medium text-blue-800 mb-1">Poison Control</h3>
                    <p className="text-lg font-bold text-blue-700">1-800-222-1222</p>
                    <p className="text-xs text-blue-600 mt-1">
                      For suspected poisoning or exposure to toxic substances
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-health-primary" />
                  Common First Aid FAQs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      When should I call emergency services?
                    </AccordionTrigger>
                    <AccordionContent>
                      Call emergency services (911) immediately for:
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Difficulty breathing or shortness of breath</li>
                        <li>Chest or upper abdominal pain or pressure</li>
                        <li>Fainting, sudden dizziness, or weakness</li>
                        <li>Changes in vision</li>
                        <li>Confusion or changes in mental status</li>
                        <li>Any sudden or severe pain</li>
                        <li>Uncontrolled bleeding</li>
                        <li>Severe burns or injuries</li>
                        <li>Seizures</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      What should be in a basic first aid kit?
                    </AccordionTrigger>
                    <AccordionContent>
                      A basic first aid kit should include:
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li>Adhesive bandages in various sizes</li>
                        <li>Sterile gauze pads and adhesive tape</li>
                        <li>Antiseptic wipes or solution</li>
                        <li>Antibiotic ointment</li>
                        <li>Scissors and tweezers</li>
                        <li>Disposable gloves</li>
                        <li>Thermometer</li>
                        <li>Pain relievers (acetaminophen, ibuprofen)</li>
                        <li>Instant cold pack</li>
                        <li>Emergency contact information</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      How do I perform CPR?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 mb-2">
                        CPR should only be performed by trained individuals. However, the basic steps for adult CPR are:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                        <li>Check if the person is responsive and not breathing</li>
                        <li>Call 911 immediately</li>
                        <li>Place the person on their back on a firm surface</li>
                        <li>Place your hands on the center of the chest</li>
                        <li>Push hard and fast (100-120 compressions per minute)</li>
                        <li>Allow chest to return to normal position between compressions</li>
                      </ol>
                      <p className="mt-2 text-gray-600">
                        Consider taking a certified CPR course to learn proper technique.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      How do I treat a nosebleed?
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                        <li>Sit upright and lean slightly forward</li>
                        <li>Pinch the soft part of your nose just below the bony ridge</li>
                        <li>Apply constant pressure for 10-15 minutes</li>
                        <li>Breathe through your mouth</li>
                        <li>Apply a cold compress to the bridge of your nose</li>
                        <li>Avoid blowing your nose for several hours afterward</li>
                      </ol>
                      <p className="mt-2 text-amber-600">
                        Seek medical help if bleeding persists for more than 20 minutes or is severe.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                asChild
                variant="outline"
                className="border-health-primary text-health-primary hover:bg-health-primary/10"
              >
                <Link to="/map">
                  Find Healthcare Facilities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-md">
          <div className="flex items-start md:items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-amber-800">
              <strong>Disclaimer:</strong> This information is provided as a general guide only and should not replace professional medical advice. 
              For all serious or life-threatening situations, please call emergency services immediately.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HealthAssist AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FirstAidPage;
