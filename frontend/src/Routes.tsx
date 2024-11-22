import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Authentication } from './pages/Authentication/Authentication';
import { MealSchedule } from './pages/Dashboard/MealSchedule/MealSchedule';
import { Pantry } from './pages/Dashboard/Pantry/Pantry';
import Groceries from './pages/Dashboard/Groceries/Groceries';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Analytics } from './pages/Dashboard/Analytics/Analytics';
import AddMealSchedule from './pages/Dashboard/MealSchedule/AddMealSchedule/AddMealSchedule';
import ViewMealSchedule from './pages/Dashboard/MealSchedule/ViewMealSchedule/ViewMealSchedule';
import AddGroceries from './pages/Dashboard/Groceries/AddGroceries/AddGroceries';

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
        path: 'meal-schedule/add',
        element: <AddMealSchedule />,
      },
      {
        path: 'meal-schedule/:planId',
        element: <ViewMealSchedule />,
      },
      {
        path: 'groceries',
        element: <Groceries />,
      },
      {
        path: 'groceries/add',
        element: <AddGroceries />,
      },
      {
        path: 'pantry',
        element: <Pantry />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={route} />;
}
