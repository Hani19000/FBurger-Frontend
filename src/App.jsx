import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Styles
import '../src/styles/index.css';
import './styles/toasts.css';

// Context & Guards
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './guards/ProtecteRoute.jsx';
import GuestGuard from './guards/GuestGuard.jsx';
import RoleGuard from './guards/RoleGuard.jsx';

// Layouts & Pages Critiques (Import immédiat pour la rapidité)
import { AppLayout } from './components/layout/AppLayout.jsx';
import { AdminLayout } from './pages/AdminLayout.jsx';
import Home from './pages/Home.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// --- IMPORTS LAZY (Chargés à la demande) ---
const Menu = lazy(() => import('./pages/Menu.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Review = lazy(() => import('./pages/Review.jsx'));

// Admin Features (Lazy pour alléger le bundle principal)
const AdminOverview = lazy(() => import('./features/dashboard/components/AdminOverview.jsx'));
const AdminUserList = lazy(() => import('./features/dashboard/components/AdminUsersList.jsx').then(module => ({ default: module.AdminUserList })));
const AdminReviewList = lazy(() => import('./features/dashboard/components/AdminReviewList.jsx').then(module => ({ default: module.AdminReviewList })));
const AdminProductList = lazy(() => import('./features/dashboard/components/AdminProductList.jsx').then(module => ({ default: module.AdminProductList })));

// Loader simple pour le Suspense
const PageLoader = () => <div className="admin-loader">Chargement...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'about', element: <About /> },
      { path: 'menu', element: <Menu /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'login', element: <GuestGuard><Login /></GuestGuard> },
      { path: 'register', element: <GuestGuard><Register /></GuestGuard> },
      { path: 'review', element: <ProtectedRoute><Review /></ProtectedRoute> },
    ]
  },
  {
    path: '/admin',
    element: (
      <RoleGuard allowedRoles={['ADMIN']}>
        <Suspense fallback={<PageLoader />}>
          <AdminLayout />
        </Suspense>
      </RoleGuard>
    ),
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'users', element: <AdminUserList /> },
      { path: 'reviews', element: <AdminReviewList /> },
      { path: 'products', element: <AdminProductList /> },
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Toaster position="top-center"
          gutter={8}
          toastOptions={{
            className: 'custom-toast',
            duration: 3000,

            success: {
              className: 'custom-toast toast-success',
              icon: null,
            },
            error: {
              className: 'custom-toast toast-error',
              icon: null,
            },
            loading: {
              className: 'custom-toast toast-loading',
              icon: null,
            },
          }} />
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;