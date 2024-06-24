import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import store from './global/states/store';
import AppRoutes from './routes/route';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <AppRoutes />
    {/* </React.StrictMode> */}
  </Provider>
)
