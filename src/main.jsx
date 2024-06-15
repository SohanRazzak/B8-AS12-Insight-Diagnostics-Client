import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import routers from './routers.jsx';


const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
            <QueryClientProvider client={client}>
            <AuthProvider>
                <HelmetProvider>
                    <RouterProvider router={routers} />
                </HelmetProvider>
            </AuthProvider>
        </QueryClientProvider>
  </React.StrictMode>,
)
