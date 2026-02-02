import ScrollToTop from '../../utils/ScrollToTop.js';
import FooterComponents from './Footer.jsx';
import NavBarComponents from './NavBar.jsx';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
    <>
        <ScrollToTop />
        <NavBarComponents />
        <main>
            <Outlet />
        </main>
        <FooterComponents />
    </>
);