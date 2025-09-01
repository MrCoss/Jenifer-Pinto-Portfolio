import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-background bg-opacity-80 backdrop-blur-md fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-accent">Jenifer Pinto</a>
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-secondary hover:text-primary transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="block px-6 py-3 text-secondary hover:bg-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
