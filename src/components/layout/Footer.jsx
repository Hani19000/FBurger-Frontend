import { NavLink } from 'react-router-dom';
import './footer.css';
import FooterIcons from '../atoms/Icon/FooterIcons';


const FooterComponents = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <NavLink to="/home" className="footer-logo">FBURGER</NavLink>

                <ul className="footer-links">
                    <li><NavLink to="/home" className='footer-link'>Accueil</NavLink></li>
                    <li><NavLink to="/about" className='footer-link'>Menu</NavLink></li>
                    <li><NavLink to="/menu" className='footer-link'>Découvrir</NavLink></li>
                </ul>

                <div className='footer-divider'>
                    <hr />
                </div>

                <div className='footer-socials'>
                    <FooterIcons />
                </div>

                <div className="footer-copyright">
                    <p>&copy; {currentYear} &nbsp;  FBurger. &nbsp; All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponents;