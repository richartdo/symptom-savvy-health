
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Heart, Calendar, Map, Shield, Stethoscope } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Index = () => {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-health-primary/10 via-health-secondary/10 to-health-accent/10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233498db' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Health Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="h-20 w-20 bg-gradient-to-br from-health-primary to-health-secondary rounded-full flex items-center justify-center shadow-xl animate-pulse-slow">
                    <Stethoscope className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-health-accent rounded-full flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-health-primary via-health-secondary to-health-accent bg-clip-text text-transparent mb-6 animate-fade-in leading-tight">
                AI-Powered Personal Health Assistant
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in max-w-3xl mx-auto leading-relaxed">
                Track your health, get AI-powered diagnosis insights, and access personalized 
                recommendations to take control of your wellbeing journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button asChild size="lg" className="bg-gradient-to-r from-health-primary to-health-secondary hover:from-health-primary/90 hover:to-health-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6">
                  <Link to={user ? "/dashboard" : "/signup"}>
                    {user ? "Go to Dashboard" : "Start Your Health Journey"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-health-primary text-health-primary hover:bg-health-primary hover:text-white transition-all duration-300 text-lg px-8 py-6">
                  <Link to="/login">
                    {user ? "Your Health Profile" : "Learn More"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent mb-4">
                How PORTABLE HEALTH CENTRE Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive health management powered by advanced AI technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature 1 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-primary/10 hover:shadow-2xl hover:border-health-primary/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-primary to-health-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">Symptom Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Input your symptoms through text, dropdown selections, or even sign language videos, and our AI will analyze them for you.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-secondary/10 hover:shadow-2xl hover:border-health-secondary/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-secondary to-health-secondary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">Health Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your health journey, set medication reminders, and track your progress over time with personalized insights.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-accent/10 hover:shadow-2xl hover:border-health-accent/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-accent to-health-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">Medicine Reminders</h3>
                <p className="text-gray-600 leading-relaxed">
                  Never miss a dose with customizable medication reminders and scheduling tools to keep your treatment on track.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-primary/10 hover:shadow-2xl hover:border-health-primary/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-primary to-health-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">First Aid Guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access critical first aid information and step-by-step guidance for common emergencies and health concerns.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-secondary/10 hover:shadow-2xl hover:border-health-secondary/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-secondary to-health-secondary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Map className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">Healthcare Facilities Map</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find the nearest healthcare facilities based on your location for when you need professional medical attention.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-health-accent/10 hover:shadow-2xl hover:border-health-accent/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-health-accent to-health-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-health-dark">Multilingual Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Communicate in your preferred language with our AI translator to ensure accurate symptom reporting and understanding.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-health-primary/10 via-health-secondary/10 to-health-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-health-primary to-health-secondary rounded-full mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who are already making smarter health decisions with the help of our AI-powered health assistant.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-health-primary to-health-secondary hover:from-health-primary/90 hover:to-health-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-12 py-6">
                <Link to={user ? "/dashboard" : "/signup"}>
                  {user ? "Go to Dashboard" : "Get Started Now"}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-r from-health-dark to-health-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  © {new Date().getFullYear()} PORTABLE HEALTH CENTRE
                </p>
                <p className="text-sm text-white/70">All rights reserved.</p>
              </div>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Terms of Service</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
