import { Link } from 'react-router-dom';
import Button from '../../../components/atoms/Button/Button';
import { useRegisterForm } from '../hooks/useRegisterForm';

// Configuration extraite : évite de recréer l'objet à chaque render
const FORM_FIELDS = [
    { id: 'userName', label: "Nom d'utilisateur", type: 'text', placeholder: 'Votre pseudo' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'nom@exemple.com' },
    { id: 'password', label: 'Mot de passe', type: 'password' },
    { id: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password' },
];

const RegisterForm = () => {
    const { formData, errorMessage, isLoading, handleChange, handleSubmit, isSubmitting } = useRegisterForm();

    return (
        <div className="login-card-dark">
            <form onSubmit={handleSubmit} className="form-content">
                {FORM_FIELDS.map(({ id, ...fieldProps }) => (
                    <div className="input-group" key={id}>
                        <label htmlFor={id}>{fieldProps.label}</label>
                        <input
                            {...fieldProps}
                            id={id}
                            name={id}
                            value={formData[id] || ''}
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
                        text={isLoading ? "Création..." : "S'inscrire"}
                        disabled={isSubmitting} // Sécurité : empêche le double clic
                    />
                </div>

                <p className="form-footer">
                    Déjà un compte ? <Link to="/login">Connectez-vous</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;