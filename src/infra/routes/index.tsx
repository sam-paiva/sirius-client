import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Callback from '../../pages/Callback';
import Checkout from '../../pages/Checkout';
import CheckoutSuccess from '../../pages/Checkout/CheckoutSuccess';
import Home from '../../pages/Home';
import PositionDetails from '../../pages/JobDetails';
import PostJob from '../../pages/PostJob';
import Prices from '../../pages/Prices';
import Admin from '../../pages/Profile';
import MyBundles from '../../pages/Profile/MyBundles';
import SearchJobs from '../../pages/SearchJobs';
import SignIn from '../../pages/SignIn';
import PrivacyAndTerms from '../../shared/components/PrivacyAndTerms';
import { checkifUserIsAuthenticated } from '../services/auth/authService';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const isAuthenticated = checkifUserIsAuthenticated();

  return isAuthenticated ? children : <Navigate to="/sign-in" state={{ from: location.pathname }} />;
};

interface ChildRoute {
  path: string;
  element: React.JSX.Element;
  index: boolean;
}

interface CustomRoute {
  path: string;
  element: React.JSX.Element;
  children: ChildRoute[];
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
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/post-job',
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/position-details/:jobId',
    element: <PositionDetails />,
    children: []
  },
  {
    path: '/prices',
    element: <Prices />,
    children: []
  },
  {
    path: '/checkout/:id',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/profile/bundles',
    element: (
      <ProtectedRoute>
        <MyBundles />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/checkout/success',
    element: (
      <ProtectedRoute>
        <CheckoutSuccess />
      </ProtectedRoute>
    ),
    children: []
  },
  {
    path: '/search-jobs',
    element: <SearchJobs />,
    children: []
  },
  {
    path: '/privacy-and-terms',
    element: <PrivacyAndTerms />,
    children: []
  }
];

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} element={route.element}>
          {route.children &&
            route.children?.map((child, key) => {
              return <Route path={child.path} index={child.index ?? false} key={key} element={child.element} />; // Nested Routes
            })}
          )
        </Route>
      ))}
    </Routes>
  );
};

export default Router;
