import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlanProvider from './store/PlanProvider.tsx';
import { Routes } from './Routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlanProvider>
      <Routes />
    </PlanProvider>
  </StrictMode>,
);
