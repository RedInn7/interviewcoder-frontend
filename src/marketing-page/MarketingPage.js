import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Commands from './components/Commands';
import SuccessfulStories from './components/SuccessfulStories';
import CodeSolution from './components/CodeSolution';
import Login from './components/Login';
export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        {/* <Features />*/}
        <Divider />
        <Login />
        <Divider />
        <SuccessfulStories />
        <Divider />
        <CodeSolution />
        <Divider />
        <Highlights />
        <Divider />
        <Commands />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
