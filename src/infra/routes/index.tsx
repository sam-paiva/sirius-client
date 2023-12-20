import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/About';
import Admin from '../../pages/Admin';
import Callback from '../../pages/Callback';
import CollectUserInfo from '../../pages/CollectUserInfo';
import Home from '../../pages/Home';
import SignIn from '../../pages/SignIn';
import { checkifUserIsAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }: any) => {
  // Check if the user is authenticated (you can replace this logic with your authentication check)
  const isAuthenticated = checkifUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to="/login" />;
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
    element: <Admin />,
  },
  {
    path: '/collect-info',
    element: <CollectUserInfo />,
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
