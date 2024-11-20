import React, { useEffect } from 'react';
import { Container, ShoppingBag, Utensils } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure to import the AOS CSS

const Services = () => {
  const services = [
    {
      icon: <Utensils size={100} className="text-custom-black" />,
      title: 'Dine-in',
      description:
        'Enjoy a comfortable dining experience with personalized service and fresh meals served directly to your table.',
    },
    {
      icon: <ShoppingBag size={100} className="text-custom-black" />,
      title: 'Take-out',
      description:
        'Order your favorite meals and pick them up conveniently, prepared and ready to go for your busy schedule.',
    },
    {
      icon: <Container size={100} className="text-custom-black" />,
      title: 'Delivery',
      description:
        'Get your meals delivered right to your doorstep with fast and reliable delivery service to ensure maximum freshness.',
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,  // animation duration
      once: false,     // animations will trigger every time element is in view
      mirror: true,    // makes the animation repeat when scrolling back
    });
  }, []);

  return (
    <section id="services" className="py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-custom-brown shadow-lg rounded-lg p-16 text-center"
              data-aos="fade-up"          // AOS animation type
              data-aos-delay={`${index * 300}`} // Delay based on index
            >
              {/* Centering the icon */}
              <div className="flex justify-center items-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-custom-black mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
