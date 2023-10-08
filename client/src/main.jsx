import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Upload from './pages/Upload'
import Home from './pages/Home';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/upload',
        element: <Upload />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
