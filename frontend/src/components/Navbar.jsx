// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png'
import './navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="p-4 fixed w-full z-10 top-0" style={{ backgroundColor: '#89735C' }}>
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
                </div>
                
                <div className={`hidden md:flex space-x-4 ${isOpen ? "block" : "hidden"}`}> {/* Menu items */}
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
            </div>
        </nav>
    )
}

export default Navbar