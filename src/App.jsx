
import '../src/styles/index.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminsPages from './pages/AdminsPage.jsx';
import Review from './pages/Review.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NavBarComponents from './components/layout/NavBar.jsx';
import About from './pages/About.jsx';
import FooterComponents from './components/layout/Footer.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';
const AppLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <NavBarComponents />
      <Outlet />
      <FooterComponents />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/menu', element: <Menu /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: '/review', element: <Review /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/admins', element: <AdminsPages /> },
      { path: '/admins/:profileId', element: <AdminPage /> },
    ]
  }
]);


function App() {
  return (
    <div>  <RouterProvider router={router} /></div>
  )
}

export default App
