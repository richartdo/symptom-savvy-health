
import { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Clock, Phone, Info, Search, Building, ArrowRight } from 'lucide-react';

// Mock medical facilities data
const mockFacilities = [
  {
    id: 1,
    name: "Central Hospital",
    type: "Hospital",
    address: "123 Healthcare Ave, Cityville",
    phone: "(555) 123-4567",
    hours: "24 hours",
    distance: "1.2",
    emergency: true
  },
  {
    id: 2,
    name: "Westside Urgent Care",
    type: "Urgent Care",
    address: "456 Medical Dr, Cityville",
    phone: "(555) 234-5678",
    hours: "8 AM - 10 PM",
    distance: "0.8",
    emergency: false
  },
  {
    id: 3,
    name: "Eastside Medical Center",
    type: "Hospital",
    address: "789 Physician Rd, Cityville",
    phone: "(555) 345-6789",
    hours: "24 hours",
    distance: "2.4",
    emergency: true
  },
  {
    id: 4,
    name: "North Community Clinic",
    type: "Clinic",
    address: "101 Health Street, Cityville",
    phone: "(555) 456-7890",
    hours: "9 AM - 6 PM",
    distance: "1.5",
    emergency: false
  },
  {
    id: 5,
    name: "South Medical Group",
    type: "Clinic",
    address: "202 Wellness Way, Cityville",
    phone: "(555) 567-8901",
    hours: "8 AM - 5 PM",
    distance: "3.1",
    emergency: false
  }
];

const MapPage = () => {
  const [location, setLocation] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [facilities, setFacilities] = useState(mockFacilities);
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSearch = () => {
    if (!location.trim()) {
      toast({
        title: "Please enter a location",
        description: "We need your location to find nearby healthcare facilities.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Sort facilities by distance (mock behavior)
      const sortedFacilities = [...mockFacilities].sort((a, b) => 
        parseFloat(a.distance) - parseFloat(b.distance)
      );
      
      setFacilities(sortedFacilities);
      setSearchPerformed(true);
      setIsLoading(false);
      
      toast({
        title: "Facilities found",
        description: `Found ${sortedFacilities.length} healthcare facilities near ${location}.`,
      });
    }, 1500);
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use these coordinates to fetch nearby facilities
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // For demo purposes, we'll just set a generic location name
          setLocation("Current Location");
          
          setTimeout(() => {
            const sortedFacilities = [...mockFacilities].sort((a, b) => 
              parseFloat(a.distance) - parseFloat(b.distance)
            );
            
            setFacilities(sortedFacilities);
            setSearchPerformed(true);
            setIsLoading(false);
            
            toast({
              title: "Location detected",
              description: "Found healthcare facilities near your current location.",
            });
          }, 1000);
        },
        (error) => {
          setIsLoading(false);
          toast({
            title: "Location error",
            description: "Unable to get your current location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Healthcare Facilities</h1>
          <p className="text-gray-600">
            Locate hospitals, urgent care centers, and clinics near you when you need professional medical care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <Card className="shadow-md mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="location"
                        placeholder="Enter your location or city"
                        className="pl-9"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                    <Button
                      variant="outline"
                      className="border-health-primary text-health-primary hover:bg-health-primary/10"
                      onClick={handleUseCurrentLocation}
                      disabled={isLoading}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Use Current Location
                    </Button>
                    
                    <Button
                      onClick={handleSearch}
                      className="bg-health-primary hover:bg-health-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Find Facilities
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {searchPerformed && (
            <>
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Healthcare Facilities Near {location}</h2>
                
                {facilities.length > 0 ? (
                  <div className="space-y-4">
                    {facilities.map((facility) => (
                      <Card 
                        key={facility.id}
                        className={`hover:shadow-md transition-shadow cursor-pointer ${
                          selectedFacility === facility.id ? 'ring-2 ring-health-primary' : ''
                        }`}
                        onClick={() => setSelectedFacility(facility.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{facility.name}</h3>
                                {facility.emergency && (
                                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                    24/7 Emergency
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Building className="mr-1.5 h-3.5 w-3.5" />
                                  {facility.type}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                                  {facility.hours}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                                  {facility.distance} miles away
                                </div>
                              </div>
                              
                              <p className="mt-2 text-gray-600">{facility.address}</p>
                              <p className="mt-1 text-health-primary font-medium">{facility.phone}</p>
                            </div>
                            
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">No healthcare facilities found near this location.</p>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Facility Map</h2>
                <Card className="shadow-md">
                  <CardContent className="p-0 overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                      <div className="p-8 text-center">
                        <p className="text-gray-600 mb-3">
                          Interactive map showing nearby healthcare facilities would appear here.
                        </p>
                        <Button variant="outline" size="sm" className="mx-auto">
                          View Full Map
                        </Button>
                      </div>
                      {/* In a real app, this would be where the map component would be rendered */}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm mt-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-3">
                      <Info className="h-5 w-5 mr-2 text-health-primary" />
                      <h3 className="font-semibold">Types of Care</h3>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <h4 className="font-medium">Hospital Emergency Rooms</h4>
                        <p className="text-gray-600">For life-threatening emergencies, severe injuries, or critical conditions.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Urgent Care Centers</h4>
                        <p className="text-gray-600">For non-life-threatening issues that need same-day care.</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Primary Care Clinics</h4>
                        <p className="text-gray-600">For routine care, check-ups, and non-urgent medical issues.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {!searchPerformed && (
            <div className="md:col-span-3">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">When to Visit Different Healthcare Facilities</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 flex items-center mb-2">
                        <span className="h-6 w-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center mr-2 text-sm">ER</span>
                        Emergency Room
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Chest pain or difficulty breathing</li>
                        <li>• Severe injuries or burns</li>
                        <li>• Uncontrolled bleeding</li>
                        <li>• Severe abdominal pain</li>
                        <li>• Stroke symptoms</li>
                        <li>• Severe allergic reactions</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-800 flex items-center mb-2">
                        <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mr-2 text-sm">UC</span>
                        Urgent Care
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Minor burns or injuries</li>
                        <li>• Sprains and strains</li>
                        <li>• Fever or flu symptoms</li>
                        <li>• Moderate pain</li>
                        <li>• Infections</li>
                        <li>• Rashes or minor allergic reactions</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 flex items-center mb-2">
                        <span className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2 text-sm">PC</span>
                        Primary Care
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Routine check-ups</li>
                        <li>• Preventive care</li>
                        <li>• Chronic condition management</li>
                        <li>• Vaccinations</li>
                        <li>• Mild symptoms or illnesses</li>
                        <li>• Medication management</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-gray-600 mb-4">Enter your location to find healthcare facilities near you.</p>
                    <Button
                      onClick={() => document.getElementById('location')?.focus()}
                      className="bg-health-primary hover:bg-health-primary/90"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Start Your Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0" />
            <p className="text-blue-800">
              <strong>Important:</strong> Always call 911 in life-threatening emergencies. This tool is designed to help 
              you find healthcare facilities, but in urgent situations, emergency services should be contacted immediately.
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

export default MapPage;
