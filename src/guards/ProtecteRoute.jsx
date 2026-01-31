import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // 1. Acune action tant que l'auth n'a pas fini de s'initialiser (refresh token)
    if (loading) {
        return <div className="loader">Chargement...</div>;
    }

    // 2. Si pas connecté, on redirige vers login en gardant en mémoire la page demandée
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. Si connecté, on affiche la page demandée
    return children;
};

export default ProtectedRoute;