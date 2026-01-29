import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Button from '../atoms/Button/Button';
import { useNavbarScroll } from '../../hooks/useScrollDirection';

const NavBarComponents = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isHidden = useNavbarScroll(600);
    const closeMenu = () => setMenuOpen(false);


    return (
        <>
            <nav className={`navbar ${menuOpen ? "nav-active" : ""} ${isHidden ? "nav-hidden" : ""}`}>
                <NavLink to="/home" className="nav-logo" onClick={closeMenu}>FBurger</NavLink>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul onClick={closeMenu} className={menuOpen ? "nav-links nav-active" : "nav-links"}>
                    <li>
                        <NavLink to="/home" className='nav-link'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className='nav-link'>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className='nav-link'>Menu</NavLink>
                    </li>
                </ul>
                <div onClick={closeMenu} className={menuOpen ? "nav-btn nav-active" : "nav-btn"}>
                    <Button type="btnVariant" to="/login" text="Sign Up" />
                </div>
            </nav>
        </>
    );
};

export default NavBarComponents;
