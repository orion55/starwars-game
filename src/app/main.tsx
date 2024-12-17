import 'modern-normalize/modern-normalize.css';
import './main.css';
import { Provider } from '@/shared/ui/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryProvider } from './providers/ReactQueryProvider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@/app/routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ReactQueryProvider>
        <BrowserRouter basename='/starwars-game'>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  </StrictMode>,
);
