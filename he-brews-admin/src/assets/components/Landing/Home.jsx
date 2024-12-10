import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure to import the AOS CSS

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // trigger only once when the element comes into view
      mirror: true,   // repeat animation when scrolling back
    });
  }, []);

  return (
    <section
      id="home"
      className="bg-cover bg-center h-screen relative"
      style={{ backgroundImage: "url('https://hebrewscafeserver.onrender.com/uploads/hebrews-bg.jpg')" }}
    >
      {/* Gradient with three stops: 100% opacity, 50% opacity, and transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-custom-black/100 via-custom-black/80 to-transparent"></div>

      <div className="container mx-auto h-full flex items-center justify-center relative">
        <div className="text-center text-custom-brown p-6 rounded-lg">
          {/* Animating the header */}
          <h1
            className="text-5xl md:text-6xl font-bold"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            He Brews Cafe
          </h1>
          {/* Animating the paragraph */}
          <p
            className="text-xl md:text-2xl mb-8"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            Have a cup of rest.
          </p>
          {/* Animating the button */}
          <a
            href="#services"
            className="bg-custom-brown hover:bg-custom-black text-custom-black hover:text-custom-brown font-bold py-3 px-6 rounded-full transition-transform duration-300 transform hover:scale-110"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="400"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
