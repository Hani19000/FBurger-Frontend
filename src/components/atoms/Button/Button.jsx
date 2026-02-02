import { NavLink } from 'react-router-dom';
import './Button.css';
import { getButtonClassName } from '../../../utils/button';

export function Button({ htmlType = 'button', ...props }) {
  const { className, variant, children, text, ...rest } = props;

  return (
    <button
      className={getButtonClassName(variant, className)}
      type={htmlType}
      {...rest}
    >
      {text || children}
    </button>
  );
}

export function LinkButton({ to, ...props }) {
  const { className, variant, children, text, ...rest } = props;

  return (
    <NavLink
      to={to}
      className={getButtonClassName(variant, className)}
      {...rest}
    >
      {text || children}
    </NavLink>
  );
}