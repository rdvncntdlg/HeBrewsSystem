import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure to import the AOS CSS

const Gallery = () => {
  const item = [
    {
      image: 'http://localhost:3000/uploads/new-products.jpg',
      title: 'New Drinks',
      description: 'Explore our new range of refreshing drinks designed to energize and refresh your day.',
    },
    {
      image: 'http://localhost:3000/uploads/products.jpg',
      title: 'Meals',
      description: 'Savor our delicious and nutritious meals, prepared with the finest ingredients.',
    },
    {
      image: 'http://localhost:3000/uploads/cup-of-coffee.jpg',
      title: 'Cup of Coffee to Enjoy',
      description: 'Enjoy a hot cup of freshly brewed coffee, perfect for any time of the day.',
    },
    {
      image: 'http://localhost:3000/uploads/enjoy.jpg',
      title: 'Seize the Moment',
      description: 'Take a moment to enjoy the little things in life with our curated selection of products.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
    }, 3000); // Change slide every 3 seconds

    AOS.init({
      duration: 1000, // animation duration
      once: false,    // trigger every time slide comes into view
      mirror: true,   // repeat animation when scrolling back
    });

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Handle dot click to navigate to specific slide
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="py-28 min-h-[50vh] relative">
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
        </div>
        <div className="relative">
          {/* Carousel Image */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Move to the appropriate slide
              }}
            >
              {item.map((work, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  data-aos="fade-up" // Add AOS animation to each slide
                  data-aos-delay={`${index * 300}`} // Delay each slide animation
                >
                  <div
                    className="bg-white shadow-lg rounded-lg overflow-hidden relative"
                    style={{
                      backgroundImage: `url(${work.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '70vh', // Set responsive height
                    }}
                  >
                    {/* Card Content (title and description at the bottom) */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-custom-black to-transparent text-white p-6">
                      <h3 className="text-xl font-bold">{work.title}</h3>
                      <p className="text-sm">{work.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {item.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-custom-black' : 'bg-gray-400'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
