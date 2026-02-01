import { NavLink } from 'react-router-dom';
import './Button.css';

// Button.jsx
export function Button({ className = '', children, text, variant, htmlType = 'button', ...props }) {
  const combinedClass = `btn ${variant ? `btn-${variant}` : ''} ${className}`.trim();

  return (
    <button className={combinedClass} type={htmlType} {...props}>
      {text || children}
    </button>
  );
}

export function LinkButton({ to, className = '', children, text, variant, ...props }) {
  const combinedClass = `btn ${variant ? `btn-${variant}` : ''} ${className}`.trim();

  return (
    <NavLink to={to} className={combinedClass} {...props}>
      {text || children}
    </NavLink>
  );
}