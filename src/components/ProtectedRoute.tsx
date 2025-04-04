
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
