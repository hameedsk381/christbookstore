import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/Homepage';
import { CssBaseline, Divider, ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import ProductDetailsPage from './components/ProductDetailsPage';
import CheckoutPage from './components/CheckoutPage';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Navbar from './components/Navbar';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // This hook returns the location object that represents the current URL.

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location]); // React to changes in location.

  return null; // This component does not render anything.
};

const App = () => {
  
  return (
    <>
     <ThemeProvider theme={theme}>
            <CssBaseline />
      
         
    
   
    <Router>
    <Navbar/> 
    <ScrollToTop /> 
<Routes>
  
  <Route exact path="/" element={<HomePage />} />
  <Route exact path="/product-details/:id" element={<ProductDetailsPage />} />
  <Route exact path="/checkout" element={<CheckoutPage />} />
  <Route path="/admin" element={<Admin/>} />
  <Route path='/profile' element={<Profile/>}/>
<Route exact path="/about" element={<AboutUs />} />
<Route path="/terms" element={<TermsOfService />} />
<Route path="/privacy" element={<PrivacyPolicy />} />

</Routes>
<Divider sx={{mt:4}}/>
<Footer/>
</Router>
</ThemeProvider>
    </>
    
  );
};

export default App;
