import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Import Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Pages
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Favorite from './pages/Favorite/Favorite';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AllUsers from './pages/AllUsers/AllUsers';
import FoodList from './pages/FoodList/FoodList';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:foodID",
        element: <Detail />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },
      {
        path: "/food-list",
        element: <FoodList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
