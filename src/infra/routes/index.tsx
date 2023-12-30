import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/About';
import Admin from '../../pages/Admin';
import Callback from '../../pages/Callback';
import CollectUserInfo from '../../pages/CollectUserInfo';
import Home from '../../pages/Home';
import SignIn from '../../pages/SignIn';
import { checkifUserIsAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }: any) => {
  const isAuthenticated = checkifUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to="/home" />;
};

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/callback',
    element: <Callback />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute><Admin /></ProtectedRoute>,
  },
  {
    path: '/collect-info',
    element: <ProtectedRoute><CollectUserInfo /></ProtectedRoute>,
  },
];

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
