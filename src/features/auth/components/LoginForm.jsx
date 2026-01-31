import { Link } from 'react-router-dom';
import Button from '../../../components/atoms/Button/Button';
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
                {LOGIN_FIELDS.map(({ id, ...fieldProps }) => (
                    <div className="input-group" key={id}>
                        <label htmlFor={id}>{fieldProps.label}</label>
                        <input
                            {...fieldProps}
                            id={id}
                            name={id}
                            value={credentials[id]}
                            onChange={handleChange}
                            className="input-beige"
                            required
                        />
                    </div>
                ))}

                {errorMessage && <p className="error-message text-center">{errorMessage}</p>}

                <div className="btn-container-center">
                    <Button
                        type="btn"
                        htmlType="submit"
                        text={isLoading ? "Connexion..." : "Se connecter"}
                        disabled={isSubmitting}
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