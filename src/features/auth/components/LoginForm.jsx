import { Link } from 'react-router-dom';
import { LinkButton } from '../../../components/atoms/Button/Button';
import { useLoginForm } from '../hooks/useLoginForm';

const LOGIN_FIELDS = [
    { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
    { id: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
];

const LoginForm = () => {
    const { credentials, isLoading, errorMessage, handleChange, handleSubmit, isSubmitting } = useLoginForm();

    return (
        <div className="login-card-dark">
            <form onSubmit={handleSubmit} className="form-content">
                {LOGIN_FIELDS.map((field) => (
                    <div className="input-group" key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={credentials[field.id] || ''}
                            onChange={handleChange}
                            className="input-beige"
                            autoComplete={field.type === 'password' ? 'current-password' : 'email'}
                            required
                        />
                    </div>
                ))}

                {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

                <div className="btn-container-center">
                    <LinkButton
                        type="btn"
                        htmlType="submit"
                        text={isLoading ? "Connexion..." : "Se connecter"}
                        disabled={isSubmitting || isLoading}
                    />
                </div>

                <p className="form-footer">
                    Pas encore de compte ? <Link to="/register">Créez-en un</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;