import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContextInstance'
import '../styles/AdminLayout.css'

export const AdminLayout = () => {
    const { user } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [menuOpen]);

    return (
        <div className="dash-wrapper">
            <header className="dash-mobile-header">
                <div className={`dash-burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span><span></span><span></span>
                </div>
                <span className="dash-mobile-logo">FBURGER ADMIN</span>
            </header>

            <aside className={`dash-sidebar ${menuOpen ? 'active' : ''}`}>
                <div className="dash-sidebar-header">
                    <h2 className="dash-username">{user?.username}</h2>
                    <div className="dash-separator"></div>
                </div>

                <nav className="dash-nav">
                    <NavLink to="/admin" end className="dash-link" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/admin/users" className="dash-link" onClick={() => setMenuOpen(false)}>Utilisateurs</NavLink>
                    <NavLink to="/admin/products" className="dash-link" onClick={() => setMenuOpen(false)}>Produits</NavLink>
                    <NavLink to="/admin/reviews" className="dash-link" onClick={() => setMenuOpen(false)}>Avis</NavLink>
                </nav>

                <div className="dash-footer">
                    <Link to="/" className="dash-back">← Retour au site</Link>
                </div>
            </aside>

            {menuOpen && <div className="dash-overlay" onClick={() => setMenuOpen(false)} />}

            <main className="dash-main">
                <Outlet />
            </main>
        </div>
    );
};