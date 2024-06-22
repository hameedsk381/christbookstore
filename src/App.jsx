import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import ProductDetailsPage from './components/ProductDetailsPage';
import CheckoutPage from './components/CheckoutPage';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StorePage from './components/StorePage';
import LandingPage from './components/LandingPage';
import SongStore from './components/SongStore';

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
    
    <ScrollToTop /> 
<Routes>
  
  <Route exact path="/" element={ <LandingPage/>} />
  <Route exact path="/store" element={<StorePage />} />
  <Route exact path="/songs" element={<SongStore />} />
  <Route exact path="/product-details/:id" element={<ProductDetailsPage />} />
  <Route exact path="/checkout" element={<CheckoutPage />} />
  <Route path="/admin" element={<Admin/>} />
  <Route path='/profile' element={<Profile/>}/>
<Route exact path="/about" element={<AboutUs />} />
<Route path="/terms" element={<TermsOfService />} />
<Route path="/privacy" element={<PrivacyPolicy />} />

</Routes>

<Footer/>
</Router>
</ThemeProvider>
    </>
    
  );
};

export default App;
