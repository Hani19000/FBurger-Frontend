import { NavLink } from 'react-router-dom'
import './Button.css'

function Button({ type, text, to }) {
  return (
    <NavLink to={to} className={type}>
      {text}
    </NavLink>
  )
}

export default Button
