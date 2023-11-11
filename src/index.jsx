import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { App } from './components/App';
import './global.css';
import { JourneyPicker } from './components/JourneyPicker';
import { ReservationPage } from './components/ReservationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <JourneyPicker />
      },
      {
        path: '/reservation',
        element: <ReservationPage />
      },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);
