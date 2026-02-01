import { NavLink } from 'react-router-dom';
import './Button.css';

export function Button({ htmlType = 'button', className = '', children, ...props }) {
  return (
    <button
      type={htmlType}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({ to, className = '', children, ...props }) {
  return (
    <NavLink
      to={to}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </NavLink>
  );
}


