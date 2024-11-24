import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    // Function to toggle the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Disable scrolling when the modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        // Cleanup: Revert to default overflow when the component is unmounted or modal is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-custom-black shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <a href="#" className="text-custom-brown flex items-center">
                    <img
                        src="https://hebrewssystem.onrender.com/uploads/logo-cream.png"
                        alt="logo"
                        className="w-48 h-14 mr-2 object-cover"
                    />
                </a>

                <ul className="hidden md:flex space-x-8">
                    <li className="text-custom-brown hover:text-white">
                        <a href="#home">Home</a>
                    </li>
                    <li className="text-custom-brown hover:text-white">
                        <a href="#services">Services</a>
                    </li>
                    <li className="text-custom-brown hover:text-white">
                        <a href="#gallery">Gallery</a>
                    </li>
                    <li className="text-custom-brown hover:text-white">
                        <a href="#contact-us">Contact Us</a>
                    </li>
                </ul>

                {/* Menu Icon Button */}
                <button
                    className="block md:hidden"
                    onClick={toggleModal}
                >
                    <MenuIcon size={24} className="text-custom-brown" />
                </button>
            </div>

            {/* Modal for Mobile Menu */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start transition-opacity duration-300 ease-in-out"
                    onClick={toggleModal} // Close modal when clicking outside
                >
                    <div
                        className={`bg-custom-black p-8 rounded-lg w-11/12 transition-all transform 
                            ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} 
                            mt-20 duration-500 ease-in-out`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <ul className="space-y-6 text-center text-custom-brown">
                            <li className="hover:text-black">
                                <a href="#home" onClick={toggleModal}>Home</a>
                            </li>
                            <li className="hover:text-black">
                                <a href="#services" onClick={toggleModal}>Services</a>
                            </li>
                            <li className="hover:text-black">
                                <a href="#gallery" onClick={toggleModal}>Work</a>
                            </li>
                            <li className="hover:text-black">
                                <a href="#contact-us" onClick={toggleModal}>Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
