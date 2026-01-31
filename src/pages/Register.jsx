import RegisterForm from '../features/auth/components/RegisterForm';
import '../styles/auth.css';

const Register = () => {
    return (
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
    );
};

export default Register;