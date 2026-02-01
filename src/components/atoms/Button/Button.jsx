import { NavLink } from 'react-router-dom';
import './Button.css';

export function Button({ className = '', children, text, ...props }) {
  const { htmlType = 'button', variant = '', ...domProps } = props;

  const combinedClass = `btn ${variant ? `btn-${variant}` : ''} ${className}`.trim();

  return (
    <button
      className={combinedClass}
      type={htmlType}
      {...domProps}
    >
      {text || children}
    </button>
  );
}

export function LinkButton({ to, className = '', children, text, ...props }) {
  // Ici on extrait pour "nettoyer" ce qui part vers le NavLink (DOM)
  const { htmlType, variant, ...domProps } = props;

  // pas d'utilisation u htmlType pour un lien, utilisation uniquement dans un log de dev ou une simple opération pour faire taire le linter
  const variantClass = variant ? `btn-${variant}` : '';

  //  on consome le htmltype sans impacter le rendu
  void htmlType;

  return (
    <NavLink
      to={to}
      className={`btn ${variantClass} ${className}`.trim()}
      {...domProps}
    >
      {text || children}
    </NavLink>
  );
}