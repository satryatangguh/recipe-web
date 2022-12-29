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
import Rating from './pages/Rating/Rating';

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
        path: "/rating/:foodID",
        element: <Rating />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
