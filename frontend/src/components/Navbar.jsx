import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png'
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Check if it's mobile view
    const isDesktop = useMediaQuery({ query: "(min-width: 769px)" }); // Check if it's desktop view

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className=" nav p-4 fixed w-full z-10 top-0" style={{ backgroundColor: '#89735C' }}>
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
                </div>
                
                {/* Show the menu items on desktop */}
                {isDesktop && (
                    <div className="hidden md:flex space-x-4">
                        <ul className="md:flex space-x-4">
                            <li>
                                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                            </li>
                            
                            <li>
                                <Link to="/booking" className="text-white hover:text-gray-300">Book Appointment</Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-white hover:text-gray-300">Signin</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Show the hamburger menu on mobile */}
                {isMobile && (
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="text-black focus:outline-none focus:text-black"
                        >
                            <svg 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Show the menu items in mobile view if the menu is toggled */}
            {isOpen && isMobile && (
                <div className="md:hidden">
                    <ul className="md:flex space-x-4">
                        <li>
                            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/blogs" className="text-white hover:text-gray-300">Blogs</Link>
                        </li>
                        <li>
                            <Link to="/booking" className="text-white hover:text-gray-300">Book Appointment</Link>
                        </li>
                        <li>
                            <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar