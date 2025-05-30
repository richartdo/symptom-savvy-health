
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from '@/components/ui/button';
import { UserIcon, Heart } from 'lucide-react';

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 bg-gradient-to-br from-health-primary to-health-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-health-primary leading-tight tracking-wide">
              PORTABLE
            </span>
            <span className="text-sm font-semibold text-health-secondary -mt-1 tracking-widest">
              HEALTH CENTRE
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-health-primary transition-colors">
            Home
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-health-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/diagnosis" className="text-gray-600 hover:text-health-primary transition-colors">
                Diagnosis
              </Link>
              <Link to="/tracking" className="text-gray-600 hover:text-health-primary transition-colors">
                Health Tracking
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-health-primary/10 text-health-primary flex items-center justify-center">
                  <UserIcon size={18} />
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
