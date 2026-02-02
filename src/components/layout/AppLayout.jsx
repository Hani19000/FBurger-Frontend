import ScrollToTop from '../../utils/ScrollToTop.jsx';
import FooterComponents from './Footer.jsx';
import NavBarComponents from './NavBar.jsx';
import { Outlet } from 'react-router-dom';
import { AnimatedSection } from '../atoms/AnimatedSection.jsx';

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