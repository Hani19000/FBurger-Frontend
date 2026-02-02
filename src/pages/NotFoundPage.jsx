import { useNavigate } from 'react-router-dom';
import SEO from '../components/atoms/SEO.jsx';
import { Button } from '../components/atoms/Button/Button.jsx';
import '../styles/notfound.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <SEO
                title="Oups ! Page Perdue"
                description="Il semble que ce burger ait été déjà dévoré. Retournez à la carte FBurger."
                path="/404"
            />

            <main className="notfound-page">
                <div className="notfound-container">
                    <div className="notfound-content-card">
                        <h1 className="notfound-code">404</h1>
                        <h2 className="notfound-title">BURGER INTROUVABLE</h2>
                        <p className="notfound-text">
                            Désolé, la page que vous cherchez a été dévorée ou n'a jamais existé.
                            Nos chefs sont sur le coup, mais en attendant...
                        </p>

                        <Button
                            text="RETOUR AU MENU"
                            variant="black"
                            onClick={() => navigate('/menu')}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default NotFound;