import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const RoleGuard = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Rediriger si non connecté
    if (loading) return <div className="loader">Vérification des droits...</div>;

    // Si pas connecté -> redirection login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si connecté mais n'a pas le bon rôle -> redirection home
    if (!allowedRoles.includes(user?.roleName)) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default RoleGuard;