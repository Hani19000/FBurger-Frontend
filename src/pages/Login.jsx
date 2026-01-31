import LoginForm from '../features/auth/components/LoginForm.jsx';
import '../styles/auth.css';

const Login = () => {
    return (
        <section className="login-split-screen">
            <div className="login-container">
                <div className="left-panel">
                    <div className="overlay-content">
                        <h2>Connectez-vous ou créez un compte pour laisser un avis et partager votre expérience chez Fburger.</h2>
                    </div>
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                </div>
                <div className="right-panel">
                    <LoginForm />
                </div>
            </div>
        </section>
    );
};

export default Login;