import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminService } from '../../../services/admin.service';
import { useAuth } from '../../../context/AuthContextInstance';
import '../styles/AdminOverview.css'
import '../styles/adminloader.css'

const AdminOverview = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ users: 0, products: 0, reviews: 0 });
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await adminService.getStats()
                setStats(data)
            } catch {
                //
            } finally {
                setLoading(false)
            }
        }
        loadStats();
    }, []);

    const cards = [
        { title: 'Communauté', value: stats?.users || 0, label: 'Utilisateurs inscrits' },
        { title: 'Catalogue', value: stats?.products || 0, label: 'Produits au menu' },
        { title: 'Retours', value: stats?.reviews || 0, label: 'Avis récoltés' }
    ];

    if (loading) return <div className="admin-loader">Chargement du dashboard...</div>;

    return (
        <div className="overview-wrapper">
            <header className="admin-overview-header">
                <h1 className="admin-title">Tableau de bord</h1>
                <div className="admin-separator"></div>
                <p>Bienvenue {user?.username} Voici l'état actuel de FBurger.</p>
            </header>

            <div className="admin-stats-grid">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className="admin-stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="card-top-accent"></div>
                        <h3 className="card-title">{card.title}</h3>
                        <span className="card-value">{card.value}</span>
                        <p className="card-label">{card.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminOverview;