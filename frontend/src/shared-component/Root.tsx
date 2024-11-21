import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authentication } from '../pages/Authentication/Authentication';
import { MealSchedule } from '../pages/Dashboard/MealSchedule/MealSchedule';
import { Pantry } from '../pages/Dashboard/Pantry/Pantry';
import { Groceries } from '../pages/Dashboard/Groceries/Groceries';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Analytics } from '../pages/Dashboard/Analytics/Analytics';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Authentication />,
  },
  {
    path: '/app',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Analytics />,
      },
      {
        path: 'meal-schedule',
        element: <MealSchedule />,
      },
      {
        path: 'groceries',
        element: <Groceries />,
      },
      {
        path: 'pantry',
        element: <Pantry />,
      },
    ],
  },
]);

export function Root() {
  return <RouterProvider router={route} />;
}
