
import ErrorMessage from './custom_components/Error';
import NotesPage from './pages/NotePage';
import { Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import { lazyImport } from './utils/lazyImport';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Landing, NotFound } from './features/misc';

const { AuthRoutes } = lazyImport(() => import('./features/auth'), 'AuthRoutes');


const ProtectedRoute = ({children}) => {
  const {authenticated} = useContext(AuthContext)
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/notes",
    element: <ProtectedRoute><NotesPage /></ProtectedRoute>,
    errorElement: <ErrorMessage/>
  },
  {
    path: "/",
    element: <Landing/>,
    errorElement: <ErrorMessage/>
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
    errorElement: <ErrorMessage/>
  },
  {
    path: "*",
    element: <NotFound/>,
    errorElement: <ErrorMessage/>
  }
]);

const App = () => {
  console.log('app')
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}



export default App;
