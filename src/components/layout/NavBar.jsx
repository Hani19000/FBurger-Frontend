// Ajout de useEffect dans l'import
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { toast } from 'react-hot-toast';
import './navbar.css';
import { useNavbarScroll } from "../../hooks/useScrollDirection.jsx"
import { Button } from '../atoms/Button/Button.jsx';

const NavBar = () => {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const isHidden = useNavbarScroll(600);
    const [menuOpen, setMenuOpen] = useState(false);

    // Bloquer/Débloquer le scroll du corps de page
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'unset';

        // Cleanup : s'assure que le scroll revient si on change de page subitement
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        toast.success("Déconnexion réussie");
    };

    if (loading) return null;

    return (
        <nav className={`navbar ${isHidden ? 'nav-hidden' : ''}`}>
            <Link to="/home" className="nav-logo">FBURGER</Link>

            <div className={`menu ${menuOpen ? 'nav-active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span><span></span><span></span>
            </div>

            <div className={`nav-content ${menuOpen ? 'nav-active' : ''}`}>
                <ul className="nav-links">
                    <li><NavLink to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>Accueil</NavLink></li>
                    <li><NavLink to="/menu" className="nav-link" onClick={() => setMenuOpen(false)}>Menu</NavLink></li>
                    <li><NavLink to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>À propos</NavLink></li>
                    {isAuthenticated && (
                        <li><NavLink to="/review" className="nav-link" onClick={() => setMenuOpen(false)}>Avis</NavLink></li>
                    )}
                </ul>

                <div className="auth-zone">
                    {isAuthenticated ? (
                        <>
                            <span className="user-name">{user?.username}</span>
                            <Button
                                text="Déconnexion"
                                type="btn"
                                onClick={handleLogout}
                            />
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Connexion</Link>
                            <Link to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>Inscription</Link>
                        </>
                    )}
                </div>
            </div>
            {menuOpen && (
                <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
            )}
        </nav>
    );
};

export default NavBar;