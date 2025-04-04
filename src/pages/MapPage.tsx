
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Navigation, BuildingHospital, Phone, Clock, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Sample data for dropdown selections
const regions = ["Africa", "Asia", "Europe", "North America", "South America", "Australia/Oceania"];
const countries = {
  "Africa": ["Kenya", "Nigeria", "South Africa", "Ethiopia", "Egypt"],
  "Asia": ["India", "China", "Japan", "Singapore", "Malaysia"],
  "Europe": ["United Kingdom", "France", "Germany", "Spain", "Italy"],
  "North America": ["United States", "Canada", "Mexico"],
  "South America": ["Brazil", "Argentina", "Chile"],
  "Australia/Oceania": ["Australia", "New Zealand"]
};
const counties = {
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
  "United States": ["California", "Texas", "New York", "Florida", "Washington"]
  // Add more as needed
};
const constituencies = {
  "Nairobi": ["Westlands", "Dagoretti North", "Embakasi East", "Roysambu", "Langata"],
  "Mombasa": ["Mvita", "Nyali", "Likoni", "Changamwe", "Jomvu"]
  // Add more as needed
};
const wards = {
  "Westlands": ["Parklands", "Highridge", "Mountain View", "Kitisuru", "Spring Valley"],
  "Dagoretti North": ["Kilimani", "Kawangware", "Gatina", "Kileleshwa", "Kabiro"]
  // Add more as needed
};
const localAreas = {
  "Parklands": ["Parklands 1", "Parklands 2", "Parklands 3", "Parklands 4", "Parklands 5"],
  "Highridge": ["Highridge A", "Highridge B", "Highridge C", "Highridge D"]
  // Add more as needed
};

// Sample healthcare facilities data
const healthcareFacilities = [
  {
    id: 1,
    name: "City General Hospital",
    type: "Hospital",
    distance: "1.2 km",
    address: "123 Main Street",
    phone: "+1 (555) 123-4567",
    hours: "24/7",
    specialties: ["Emergency Care", "Surgery", "Pediatrics"]
  },
  {
    id: 2,
    name: "Community Health Clinic",
    type: "Clinic",
    distance: "0.8 km",
    address: "456 Park Avenue",
    phone: "+1 (555) 987-6543",
    hours: "8:00 AM - 8:00 PM",
    specialties: ["General Practice", "Vaccinations", "Minor Injuries"]
  },
  {
    id: 3,
    name: "Wellness Medical Center",
    type: "Medical Center",
    distance: "2.3 km",
    address: "789 Health Boulevard",
    phone: "+1 (555) 456-7890",
    hours: "9:00 AM - 5:00 PM",
    specialties: ["Internal Medicine", "Physical Therapy", "Cardiology"]
  }
];

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedLocalArea, setSelectedLocalArea] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [facilities, setFacilities] = useState(healthcareFacilities);

  // Filter facilities based on search query
  const filteredFacilities = searchQuery 
    ? facilities.filter(facility => 
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : facilities;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-800">Healthcare Facilities Map</h1>
          <p className="text-gray-600">
            Find healthcare facilities near your location for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="region">Region</Label>
                  <Select 
                    value={selectedRegion} 
                    onValueChange={(value) => {
                      setSelectedRegion(value);
                      setSelectedCountry("");
                      setSelectedCounty("");
                      setSelectedConstituency("");
                      setSelectedWard("");
                      setSelectedLocalArea("");
                    }}
                  >
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRegion && (
                  <div className="space-y-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={selectedCountry} 
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                        setSelectedCounty("");
                        setSelectedConstituency("");
                        setSelectedWard("");
                        setSelectedLocalArea("");
                      }}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries[selectedRegion as keyof typeof countries]?.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedCountry && counties[selectedCountry as keyof typeof counties] && (
                  <div className="space-y-1.5">
                    <Label htmlFor="county">County/State</Label>
                    <Select 
                      value={selectedCounty} 
                      onValueChange={(value) => {
                        setSelectedCounty(value);
                        setSelectedConstituency("");
                        setSelectedWard("");
                        setSelectedLocalArea("");
                      }}
                    >
                      <SelectTrigger id="county">
                        <SelectValue placeholder="Select a county/state" />
                      </SelectTrigger>
                      <SelectContent>
                        {counties[selectedCountry as keyof typeof counties]?.map((county) => (
                          <SelectItem key={county} value={county}>{county}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedCounty && constituencies[selectedCounty as keyof typeof constituencies] && (
                  <div className="space-y-1.5">
                    <Label htmlFor="constituency">Constituency/District</Label>
                    <Select 
                      value={selectedConstituency} 
                      onValueChange={(value) => {
                        setSelectedConstituency(value);
                        setSelectedWard("");
                        setSelectedLocalArea("");
                      }}
                    >
                      <SelectTrigger id="constituency">
                        <SelectValue placeholder="Select a constituency" />
                      </SelectTrigger>
                      <SelectContent>
                        {constituencies[selectedCounty as keyof typeof constituencies]?.map((constituency) => (
                          <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedConstituency && wards[selectedConstituency as keyof typeof wards] && (
                  <div className="space-y-1.5">
                    <Label htmlFor="ward">Ward/Neighborhood</Label>
                    <Select 
                      value={selectedWard} 
                      onValueChange={(value) => {
                        setSelectedWard(value);
                        setSelectedLocalArea("");
                      }}
                    >
                      <SelectTrigger id="ward">
                        <SelectValue placeholder="Select a ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards[selectedConstituency as keyof typeof wards]?.map((ward) => (
                          <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedWard && localAreas[selectedWard as keyof typeof localAreas] && (
                  <div className="space-y-1.5">
                    <Label htmlFor="localArea">Local Area</Label>
                    <Select 
                      value={selectedLocalArea} 
                      onValueChange={setSelectedLocalArea}
                    >
                      <SelectTrigger id="localArea">
                        <SelectValue placeholder="Select a local area" />
                      </SelectTrigger>
                      <SelectContent>
                        {localAreas[selectedWard as keyof typeof localAreas]?.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="pt-2">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800" onClick={() => console.log("Searching nearby facilities")}>
                    <Navigation className="mr-2 h-4 w-4" /> Find Nearby Facilities
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-blue-600" />
                  Search Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by name, type, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6 bg-white rounded-lg shadow-md p-4 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BuildingHospital className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                <p>Map will display here once location is selected</p>
              </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-800">Nearby Facilities</h2>
              <span className="text-sm text-gray-600">{filteredFacilities.length} found</span>
            </div>

            <div className="space-y-4">
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((facility) => (
                  <Card key={facility.id} className="shadow-sm hover:shadow transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-blue-700">{facility.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{facility.address} ({facility.distance})</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-2 py-0.5 text-xs rounded-full">
                          {facility.type}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                          <span>{facility.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                          <span>{facility.hours}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-start gap-1.5">
                          <Info className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                          <div className="text-sm flex flex-wrap gap-1">
                            {facility.specialties.map((specialty, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <Info className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No healthcare facilities found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} IBRAHsoft HEALTHCARE CENTRE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MapPage;
