import React from 'react';
import Navbar from '../assets/components/Landing/Navbar';
import Home from '../assets/components/Landing/Home';
import Services from '../assets/components/Landing/Services';
import Gallery from '../assets/components/Landing/Gallery';
import ContactUs from '../assets/components/Landing/ContactUs';
import Footer from '../assets/components/Landing/Footer';


function Landing() {
    return (
        <>
          <Navbar />
          <Home />
          <Services />
          <Gallery />
          <ContactUs />
          <Footer />
        </>
      );
    };
  
export default Landing;