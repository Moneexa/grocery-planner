import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlanProvider from './store/PlanProvider.tsx';
import { Routes } from './Routes.tsx';
import { AuthProvider } from './store/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PlanProvider>
        <Routes />
      </PlanProvider>
    </AuthProvider>
  </StrictMode>,
);
