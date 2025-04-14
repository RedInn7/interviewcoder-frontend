import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import MarketingPage from "./marketing-page/MarketingPage";
import Login from './marketing-page/components/Login';
import SignUp from './marketing-page/components/SignUp';
import AppAppBar from './marketing-page/components/AppAppBar';
import Box from '@mui/material/Box';

// Layout component that includes the AppBar
function Layout({ children }) {
  return (
    <Box>
      <AppAppBar />
      {children}
    </Box>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
