import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import MarketingPage from "./marketing-page/MarketingPage";
import Login from './marketing-page/components/Login';
import SignUp from './marketing-page/components/SignUp';
import AppTheme from './shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Success from './marketing-page/components/Success';
import Cancel from './marketing-page/components/Cancel';
import SettingsPage from './marketing-page/components/SettingsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="488907926930-a14hq5rnugcmgu1rhd9rudkgsgokvvt2.apps.googleusercontent.com">
      <AppTheme>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </AppTheme>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
