import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Heart, Calendar, Map, Shield } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Index = () => {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-pattern py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-health-dark mb-6 animate-fade-in">
                AI-Powered Personal Health Assistant
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in">
                Track your health, get AI-powered diagnosis insights, and access personalized 
                recommendations to take control of your wellbeing.
              </p>
              <div className="space-x-4 animate-fade-in">
                <Button asChild size="lg" className="bg-health-primary hover:bg-health-primary/90 text-white">
                  <Link to={user ? "/dashboard" : "/signup"}>
                    {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">
                    {user ? "Your Health Profile" : "Learn More"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Portable health centre Works</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-health-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Symptom Analysis</h3>
                <p className="text-gray-600">
                  Input your symptoms through text, dropdown selections, or even sign language videos, and our AI will analyze them for you.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-secondary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-health-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Health Tracking</h3>
                <p className="text-gray-600">
                  Monitor your health journey, set medication reminders, and track your progress over time with personalized insights.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-accent/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-health-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Medicine Reminders</h3>
                <p className="text-gray-600">
                  Never miss a dose with customizable medication reminders and scheduling tools to keep your treatment on track.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-health-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">First Aid Guidance</h3>
                <p className="text-gray-600">
                  Access critical first aid information and step-by-step guidance for common emergencies and health concerns.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-secondary/10 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-health-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Healthcare Facilities Map</h3>
                <p className="text-gray-600">
                  Find the nearest healthcare facilities based on your location for when you need professional medical attention.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-health-accent/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-health-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
                <p className="text-gray-600">
                  Communicate in your preferred language with our AI translator to ensure accurate symptom reporting and understanding.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-health-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of users who are already making smarter health decisions with the help of our AI-powered health assistant.
              </p>
              <Button asChild size="lg" className="bg-health-primary hover:bg-health-primary/90">
                <Link to={user ? "/dashboard" : "/signup"}>
                  {user ? "Go to Dashboard" : "Get Started Now"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-health-dark py-8 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} Portable health centre. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
