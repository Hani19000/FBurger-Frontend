
import '../src/styles/index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Review from './pages/Review.jsx'
import Login from './pages/Login.jsx'
import { AdminLayout } from './pages/AdminLayout.jsx'
import AdminOverview from './features/dashboard/components/AdminOverview.jsx'
import { AdminUserList } from './features/dashboard/components/AdminUsersList.jsx'
import Register from './pages/Register.jsx'
import About from './pages/About.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppLayout } from './components/layout/AppLayout.jsx'
import ProtectedRoute from './guards/ProtecteRoute.jsx'
import { Toaster } from 'react-hot-toast'
import GuestGuard from './guards/GuestGuard.jsx'
import RoleGuard from './guards/RoleGuard.jsx'
import { HelmetProvider } from 'react-helmet-async'
import './styles/toasts.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />, // Gestion globale du 404
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'about', element: <About /> },
      { path: 'menu', element: <Menu /> },
      { path: 'product/:id', element: <ProductDetail /> },

      // Routes Publiques : uniquement pour les non-connectés
      { path: 'login', element: <GuestGuard><Login /></GuestGuard> },
      { path: 'register', element: <GuestGuard><Register /></GuestGuard> },

      // Route Protégée : n'importe quel utilisateur connecté
      { path: 'review', element: (<ProtectedRoute><Review /></ProtectedRoute>) },
    ]
  },
  {
    path: '/admin',
    element: (
      // Routes Admin : Uniquement roleName 'admin'
      <RoleGuard allowedRoles={['ADMIN']}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'users', element: <AdminUserList /> },
    ]
  },
  // Fallback (si aucune route ne correspond)
  { path: '*', element: <NotFoundPage /> }
]);

const helmetContext = {};
function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <AuthProvider>
        <Toaster
          position="top-center"
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
          }}
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
