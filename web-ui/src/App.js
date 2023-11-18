

import { Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import { lazyImport } from './utils/lazyImport';
import { Error } from './components/Error';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Landing, NotFound } from './features/misc';

const { AuthRoutes } = lazyImport(() => import('./features/auth'), 'AuthRoutes');
const { NotesRoutes } = lazyImport(() => import('./features/notes'), 'NotesRoutes');


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
    element: <ProtectedRoute><NotesRoutes /></ProtectedRoute>,
    errorElement: <Error/>
  },
  {
    path: "/",
    element: <Landing/>,
    errorElement: <Error/>
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
    errorElement: <Error/>
  },
  {
    path: "*",
    element: <NotFound/>,
    errorElement: <Error/>
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
