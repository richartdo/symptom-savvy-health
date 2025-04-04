
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Stethoscope, Clock, CheckCircle, Calendar, Map, Bell } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Manage your health with our AI-powered tools and resources.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-health-primary">
                <Stethoscope className="mr-2 h-6 w-6" />
                AI Diagnosis
              </CardTitle>
              <CardDescription>
                Get AI-powered insights based on your symptoms
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <p className="text-gray-600 mb-4">
                Describe your symptoms in your own words or select from common symptoms. 
                Our AI will analyze them and provide insights and recommendations.
              </p>
              <Button asChild className="bg-health-primary hover:bg-health-primary/90">
                <Link to="/diagnosis">Start Diagnosis</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-health-secondary">
                <Activity className="mr-2 h-6 w-6" />
                Health Tracking
              </CardTitle>
              <CardDescription>
                Monitor your health journey and track medications
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <p className="text-gray-600 mb-4">
                Track your medications, set reminders, and monitor your progress 
                over time to improve your health outcomes.
              </p>
              <Button asChild className="bg-health-secondary hover:bg-health-secondary/90">
                <Link to="/tracking">Track Health</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/diagnosis" className="group">
            <Card className="hover:shadow-md transition-all border-l-4 border-l-health-primary h-full">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 rounded bg-health-primary/10 flex items-center justify-center mr-3">
                  <Stethoscope className="h-5 w-5 text-health-primary" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-health-primary transition-colors">AI Diagnosis</h3>
                  <p className="text-sm text-gray-500">Analyze symptoms</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/tracking" className="group">
            <Card className="hover:shadow-md transition-all border-l-4 border-l-health-secondary h-full">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 rounded bg-health-secondary/10 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-health-secondary" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-health-secondary transition-colors">Medication Tracking</h3>
                  <p className="text-sm text-gray-500">Set pill reminders</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/first-aid" className="group">
            <Card className="hover:shadow-md transition-all border-l-4 border-l-health-accent h-full">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 rounded bg-health-accent/10 flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-health-accent" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-health-accent transition-colors">First Aid</h3>
                  <p className="text-sm text-gray-500">Emergency guidance</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/map" className="group">
            <Card className="hover:shadow-md transition-all border-l-4 border-l-health-primary h-full">
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 rounded bg-health-primary/10 flex items-center justify-center mr-3">
                  <Map className="h-5 w-5 text-health-primary" />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-health-primary transition-colors">Healthcare Map</h3>
                  <p className="text-sm text-gray-500">Find nearby facilities</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-health-primary mr-3" />
                    <div>
                      <p className="font-medium">Health check reminder</p>
                      <p className="text-sm text-gray-500">Tomorrow at 9:00 AM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-health-secondary mr-3" />
                    <div>
                      <p className="font-medium">Medication reminder set</p>
                      <p className="text-sm text-gray-500">Daily at 8:00 AM and 8:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-health-accent mr-3" />
                    <div>
                      <p className="font-medium">Last diagnosis report</p>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default Dashboard;
