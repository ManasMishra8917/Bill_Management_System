
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import customersReducer from './slices/customersSlice.jsx'
import billReducer from './slices/billSlice.jsx'

const store = configureStore({
  reducer: {
    customers: customersReducer,
    bill: billReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    </Provider> 
)
