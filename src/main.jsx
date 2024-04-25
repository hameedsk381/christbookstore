import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

        

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
   <Provider store={store}>
   <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
    </Provider>

  </React.StrictMode>,
)
