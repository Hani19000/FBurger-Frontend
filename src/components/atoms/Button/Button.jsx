import { NavLink } from 'react-router-dom';
import './Button.css';

function Button({ type = 'btn', text, to, className = '', children, ...props }) {
  const combinedClasses = `${type} ${className}`.trim();

  // Si "to" existe, on rend un NavLink, sinon un button
  if (to) {
    return (
      <NavLink to={to} className={combinedClasses} {...props}>
        {text || children}
      </NavLink>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {text || children}
    </button>
  );
}

export default Button;