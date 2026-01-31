import RegisterForm from '../features/auth/components/RegisterForm';
import '../styles/auth.css';
import SEO from '../components/atoms/SEO.jsx';

const Register = () => {
    return (
        <>
            <SEO
                title="Inscription"
                description="Rejoignez la communauté FBurger. Créez votre compte pour partager vos avis sur nos burgers gourmets."
                path="/register"
            />

            <section className="login-split-screen">
                <div className="login-container">

                    <div className="left-panel">
                        <div className="overlay-content">
                            <h2>Rejoignez la communauté FBurger et profitez d'avantages exclusifs.</h2>
                        </div>

                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                    </div>

                    <div className="right-panel">
                        <RegisterForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;