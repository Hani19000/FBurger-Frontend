import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const GuestGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (isAuthenticated) {
        // Si déjà connecté, on le renvoie à l'accueil
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default GuestGuard;