import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/About';
import Admin from '../../pages/Admin';
import NewJob from '../../pages/Admin/NewJob';
import Callback from '../../pages/Callback';
import CollectUserInfo from '../../pages/CollectUserInfo';
import Home from '../../pages/Home';
import SignIn from '../../pages/SignIn';
import { checkifUserIsAuthenticated } from '../services/auth/authService';

const ProtectedRoute = ({ children }: any) => {
  const isAuthenticated = checkifUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to="/home" />;
};

interface ChildRoute {
  path: string,
  element: React.JSX.Element,
  index: boolean
}

interface CustomRoute {
  path: string,
  element: React.JSX.Element,
  children: ChildRoute[]
}

const routes: CustomRoute[] = [
  {
    path: '/',
    element: <Home />,
    children: []
  },
  {
    path: '/home',
    element: <Home />,
    children: []
  },
  {
    path: '/callback',
    element: <Callback />,
    children: []
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    children: []
  },
  {
    path: '/about',
    element: <About />,
    children: []
  },
  {
    path: '/admin',
    element: <ProtectedRoute><Admin /></ProtectedRoute>,
    children: []
  },
  {
    path: '/admin/new-job',
    element: <ProtectedRoute><NewJob /></ProtectedRoute>,
    children: []
  },
  {
    path: '/collect-info',
    element: <ProtectedRoute><CollectUserInfo /></ProtectedRoute>,
    children: []
  },
];

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} element={route.element}>
          {route.children && route.children?.map((child, key) => {
            return <Route path={child.path} index={child.index ?? false} key={key} element={child.element} /> // Nested Routes
          })})
        </Route>
      ))}
    </Routes>
  );
};

export default Router;
