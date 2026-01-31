import { NavLink } from 'react-router-dom';
import './Button.css';

function Button({ type = 'btn', text, to, onClick, htmlType = 'button', disabled }) {
  // Si 'to' existe, c'est un lien de navigation
  if (to) {
    return (
      <NavLink to={to} className={type} onClick={onClick}>
        {text}
      </NavLink>
    );
  }

  // Sinon, c'est un vrai bouton (pour les formulaires ou actions)
  return (
    <button
      type={htmlType}
      className={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;