import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from './assets/hero.png'; // Make sure this path is correct

// --- Helper: CSS Styles ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --bg-dark: #1e1b4b; /* Deep Indigo */
      --bg-med: #312e81; /* Indigo */
      --bg-light: #4338ca; /* Lighter Indigo */
      --bg-accent: rgba(76, 29, 149, 0.4); /* Purple Accent */
      
      --primary: #6ee7b7; /* Bright Teal */
      --secondary: #a78bfa; /* Lavender */
      --text-light: #e0e7ff; /* Light Lavender Text */
      --text-med: #d8b4fe; /* Purple-ish Text */
      --text-dark: #a78bfa; /* Darker Purple Text */

      --border-color: rgba(94, 45, 172, 0.5);

      --sans-font: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    /* --- Base & Reset --- */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-med);
      font-family: var(--sans-font);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3 {
      color: var(--text-light);
      line-height: 1.2;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }

    /* --- App Layout --- */
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* --- Reusable Section Title --- */
    .section-title {
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 700;
      text-align: center;
      margin-bottom: 4rem;
      position: relative;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--primary);
      border-radius: 2px;
      opacity: 0.8;
    }
    
    /* --- Navbar --- */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
    }
    .navbar.scrolled {
      background-color: rgba(30, 27, 75, 0.85);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    .nav-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    .nav-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      transition: transform 0.2s ease;
    }
    .nav-logo:hover {
      transform: scale(1.05);
    }
    .nav-links {
      display: none; /* Hidden on mobile */
    }
    .nav-link {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-med);
      padding: 0.5rem 1rem;
      position: relative;
      transition: color 0.3s ease;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .nav-link .underline {
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--primary);
    }

    /* --- Mobile Menu --- */
    .mobile-menu-button {
      background: none;
      border: none;
      cursor: pointer;
      z-index: 110;
      color: var(--text-med);
    }
    .mobile-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--bg-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .mobile-nav-link {
      font-size: 1.5rem;
      color: var(--text-light);
    }
    @media (min-width: 768px) {
      .nav-links { display: flex; gap: 1rem; }
      .mobile-menu-button { display: none; }
    }

    /* --- Hero Section --- */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap-reverse;
      gap: 2rem;
      padding: 100px 0;
    }
    .hero-text {
      flex: 1 1 500px;
      text-align: center;
    }
    .hero-intro { color: var(--primary); font-weight: 600; margin-bottom: 1rem; font-size: 1.125rem; }
    .hero-name {
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }
    .hero-title { font-size: clamp(1.2rem, 4vw, 1.75rem); color: var(--text-light); font-weight: 600; margin-bottom: 1.5rem; }
    .hero-summary { max-width: 600px; margin: 0 auto 2.5rem auto; color: var(--text-med); }
    .hero-buttons { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
    .hero-image-container {
      flex: 1 1 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hero-image {
      max-width: 350px;
      width: 80%;
      height: auto;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid var(--bg-light);
      box-shadow: 0 0 40px rgba(167, 139, 250, 0.4);
    }
    @media (min-width: 768px) {
      .hero-text { text-align: left; }
      .hero-summary { margin-left: 0; }
      .hero-buttons { justify-content: flex-start; }
    }

    /* --- Reusable Button --- */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.65rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 0.9rem;
      white-space: nowrap;
    }
    .btn svg {
        width: 1.1em;
        height: 1.1em;
    }
    .btn-primary {
      background-color: var(--primary);
      color: var(--bg-dark);
    }
    .btn-primary:hover {
      background-color: transparent;
      border-color: var(--primary);
      color: var(--primary);
    }
    .btn-secondary {
      background-color: transparent;
      border-color: var(--secondary);
      color: var(--secondary);
    }
    .btn-secondary:hover {
      background-color: var(--secondary);
      color: var(--bg-dark);
    }

    /* --- General Section Wrapper --- */
    .section {
      padding: 6rem 0;
    }
    
    /* --- About Section --- */
    .about-box {
      max-width: 750px;
      margin: 0 auto;
      text-align: center;
      font-size: 1.125rem;
      background: var(--bg-accent);
      padding: 2.5rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    /* --- Experience Timeline --- */
    .timeline {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      padding-left: 2rem;
      border-left: 3px solid var(--bg-light);
    }
    .timeline-item {
      margin-bottom: 3rem;
      position: relative;
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -44px; /* Adjust based on padding and border */
      top: 5px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: var(--primary);
      border: 4px solid var(--bg-dark);
    }
    .timeline-date { font-size: 0.9rem; color: var(--secondary); font-weight: 500; margin-bottom: 0.25rem; }
    .timeline-role { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.25rem; color: var(--text-light); }
    .timeline-company { font-size: 1.1rem; color: var(--primary); font-weight: 600; margin-bottom: 0.5rem; }
    .timeline-desc { color: var(--text-med); }

    /* --- Projects Section --- */
    .projects-section {
        background: var(--bg-med);
        padding: 6rem 0;
    }
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
    }
    .project-card {
        background-color: var(--bg-dark);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .project-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 40px rgba(10, 10, 10, 0.4);
    }
    .project-title { font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 1rem; }
    .project-desc { flex-grow: 1; color: var(--text-med); margin-bottom: 1.5rem; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech-tag {
        background-color: var(--bg-light);
        color: var(--text-light);
        font-size: 0.8rem;
        font-weight: 500;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
    }

    /* --- Skills Section (FIXED) --- */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); /* Adjusted minmax for better fit */
      gap: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .skill-card {
      background: var(--bg-light);
      border: 1px solid var(--border-color);
      padding: 1.25rem 0.75rem; /* Adjusted padding */
      border-radius: 8px;
      text-align: center;
      font-size: 1rem; /* Slightly reduced font size */
      font-weight: 600;
      color: var(--text-light);
      transition: transform 0.2s ease, background-color 0.2s ease;
      white-space: nowrap; /* Prevent text wrapping */
      overflow: hidden; /* Hide overflowing text if it still happens */
      text-overflow: ellipsis; /* Add ellipsis for overflow */
    }
    .skill-card:hover {
      transform: translateY(-5px) scale(1.05);
      background-color: var(--secondary);
    }

    /* --- Education Section (IMPROVED) --- */
    .education-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .education-card {
      background: var(--bg-dark); /* Changed background for consistency */
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .education-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    .education-card h3 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--primary); /* Consistent primary color for titles */
    }
    .education-item, .cert-item {
        margin-bottom: 1.25rem;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
    }
    .education-item:last-child, .cert-item:last-child {
        margin-bottom: 0;
    }
    .education-item svg, .cert-item svg {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--secondary);
    }
    .education-item div, .cert-item div {
        display: flex;
        flex-direction: column;
    }
    .education-item p:first-child, .cert-item p:first-child { 
        font-size: 1.1rem; 
        font-weight: bold; 
        color: var(--text-light); 
        line-height: 1.3;
    }
    .education-item p:nth-child(2), .cert-item p:nth-child(2) {
        font-size: 0.95rem;
        color: var(--text-med);
    }
    .cert-list { 
        list-style: none; /* Removed default list style */
        padding: 0;
        margin: 0;
    }
    .cert-list li { 
        margin-bottom: 0.5rem; /* Existing styles */
    }
    @media (min-width: 768px) {
      .education-grid { grid-template-columns: 1fr 1fr; }
    }

    /* --- Contact Section --- */
    .contact-content {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    .contact-text { margin-bottom: 2.5rem; }
    .contact-socials { display: flex; justify-content: center; margin-top: 3rem; gap: 2rem; }
    .social-link svg {
      width: 2rem;
      height: 2rem;
      color: var(--text-dark);
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .social-link:hover svg {
      color: var(--primary);
      transform: scale(1.2);
    }

    /* --- Footer --- */
    .footer {
      text-align: center;
      padding: 2rem 1.5rem;
      margin-top: 4rem;
      border-top: 1px solid var(--border-color);
      color: var(--text-dark);
    }
    
    /* --- Back to Top Button --- */
    .back-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 50;
      background: var(--primary);
      color: var(--bg-dark);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(110, 231, 183, 0.4);
    }

  `}</style>
);

// --- Animation Variants ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
  }
};
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- Icon Components ---
const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const LinkedInIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> );
const DownloadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> );
const ArrowUpIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> );
const MenuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width: '2rem', height: '2rem'}}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg> );
const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width: '2rem', height: '2rem'}}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> );
const GraduationCapIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.045 60.045 0 00-1.29 4.316m6.76-4.316a60.045 60.045 0 00-1.29 4.316m0 0V17.5M8.47 16.5h7.06L12 20.25l-3.53-3.75zM4.26 10.147l6.76 2.85M2.25 9.75l1.96-1.574A60.038 60.038 0 0012 5.5s4.942 0 9.79-2.617c1.3.722 2.352 1.936 2.352 3.824v.25c0 2.221-1.272 4.172-3.153 5.378l-6.223 3.945C11.531 16.653 10.5 17.25 9.5 17.25c-1.031 0-2.062-.601-2.924-1.295L2.25 9.75z" /></svg>);
const CertificateIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.354 18.252A6.598 6.598 0 0112 18a6.598 6.598 0 01.646-.252M11.354 18.252H7.5c-1.5 0-3-1-3-3s1.5-3 3-3h.793c-.453 1.342-.793 2.695-.793 4.252zm0 0c-.896-1.61-1.354-2.693-1.354-4.252V9a6 6 0 0112 0v4.252c0 1.557-.458 2.64-1.354 4.252zm4.004-10.455a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" /></svg>);


// --- Reusable Animated Title ---
const AnimatedTitle = ({ text }) => (
  <motion.h2 className="section-title" variants={itemVariant}>
    {text}
  </motion.h2>
);

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -60% 0px' });
    
    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const links = [
    { name: 'Home', href: '#home' }, { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' }, { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' }, { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href) => {
    const section = document.querySelector(href);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const NavLinks = ({ isMobile = false }) => (
    links.map((link) => (
      <a key={link.name} href={link.href} className={isMobile ? "mobile-nav-link" : "nav-link"} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}>
        {link.name}
        {!isMobile && activeLink === link.href.substring(1) && (
          <motion.div layoutId="underline" className="underline" />
        )}
      </a>
    ))
  );

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="nav-content">
          <a href="#home" className="nav-logo">Jenifer Pinto</a>
          <div className="nav-links"><NavLinks /></div>
          <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
            <MenuIcon />
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
             <button className="mobile-menu-button" onClick={() => setIsOpen(false)} aria-label="Close menu" style={{position: 'absolute', top: '20px', right: '20px'}}>
               <CloseIcon />
             </button>
             <NavLinks isMobile={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Hero Component ---
const Hero = () => (
  <motion.section 
    id="home" className="hero"
    variants={sectionVariant} initial="hidden" animate="visible"
  >
    <motion.div className="hero-text" variants={itemVariant}>
      <p className="hero-intro">Hello, I'm</p>
      <h1 className="hero-name">Jenifer Pinto</h1>
      <p className="hero-title">Business Analyst & MBA Finance Candidate</p>
      <p className="hero-summary">
        I leverage data to drive strategic business decisions, specializing in financial analysis, process optimization, and creating data-driven insights with Excel, Power BI/Tableau, and SQL.
      </p>
      <div className="hero-buttons">
        <motion.a href="#contact" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get In Touch <MailIcon /></motion.a>
        <motion.a href="/Jenifer-Pinto-Resume.pdf" download className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Download Resume <DownloadIcon /></motion.a>
      </div>
    </motion.div>
    <motion.div className="hero-image-container" variants={itemVariant}>
      <motion.img 
        src={heroImage} alt="Jenifer Pinto" className="hero-image"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  </motion.section>
);

// --- Section Wrapper for Animations ---
const Section = ({ children, id }) => (
  <motion.section
    id={id} className="section"
    variants={sectionVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.section>
);

// --- About Component ---
const About = () => (
  <Section id="about">
    <AnimatedTitle text="About Me" />
    <motion.div className="about-box" variants={itemVariant}>
      <p>I am a dedicated and detail-oriented MBA Finance student with a strong foundation in business analysis and financial analytics. My experience spans from co-founding an educational venture to interning at dynamic firms where I've honed my skills in data analysis, reporting, and process improvement. I am driven by a passion for uncovering insights that support strategic decision-making and enhance operational efficiency.</p>
    </motion.div>
  </Section>
);

// --- Experience Component ---
const Experience = () => {
  const experiences = [
    { role: 'Business Analyst Intern', company: 'Unified Mentor', date: 'Sep 2024 - Present', desc: 'Analyzed business requirements, conducted data analysis to identify trends, and created dashboards with insights for stakeholders using Excel, Power BI/Tableau, and SQL.' },
    { role: 'Financial Analyst Intern', company: 'SkillFied Mentor', date: 'Jul 2024 - Aug 2024', desc: 'Developed a fraud detection model and built a portfolio optimization tool using Python. Commended for exceptional dedication and hard work.' },
    { role: 'Co-Founder and Teacher', company: 'JHT SMART STEPS LEARNING', date: 'Feb 2023 - Jun 2024', desc: 'Designed, managed, and delivered educational services independently, creating a specialized tutoring business.' },
    { role: 'Retail Sales Associate', company: 'Tata Tanishq', date: 'Jan 2022 - Jul 2022', desc: 'Assisted customers, met monthly sales targets, and handled billing, inventory, and merchandising.' }
  ];

  return (
    <Section id="experience">
      <AnimatedTitle text="Work Experience" />
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div className="timeline-item" key={index} variants={itemVariant}>
            <p className="timeline-date">{exp.date}</p>
            <h3 className="timeline-role">{exp.role}</h3>
            <p className="timeline-company">{exp.company}</p>
            <p className="timeline-desc">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// --- Projects Component ---
const Projects = () => {
  const projects = [
    { title: 'Fraud Detection in Financial Transactions', description: 'Developed a model to identify fraudulent transactions by addressing severe data imbalance with SMOTE. Achieved 96% precision and 78% recall, balancing fraud capture with accuracy.', tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas', 'Matplotlib'] },
    { title: 'Portfolio Optimization using MPT', description: 'Built a Python-based optimizer using Modern Portfolio Theory. The tool used real-time yFinance data and Sharpe Ratio optimization to find the most risk-efficient portfolio from 10,000 simulations.', tech: ['Python', 'yFinance', 'SciPy', 'Pandas', 'Seaborn'] }
  ];

  return (
    <motion.div 
      id="projects" className="projects-section"
      variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
    >
      <div className="main-content">
        <AnimatedTitle text="Key Projects" />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div className="project-card" key={index} variants={itemVariant}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => <span key={i} className="tech-tag">{tech}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Skills Component ---
const Skills = () => {
  const skills = ['Excel', 'Power BI', 'Tableau', 'SQL', 'Python', 'Financial Modeling', 'Risk Management', 'Business Analysis', 'Data Analysis', 'Critical Thinking', 'Collaboration', 'Communication'];

  return (
    <Section id="skills">
      <AnimatedTitle text="Core Competencies" />
      <div className="skills-grid">
        {skills.map((skill) => (
          <motion.div className="skill-card" key={skill} variants={itemVariant}>
            {skill}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// --- Education Component ---
const Education = () => (
  <Section id="education">
    <AnimatedTitle text="Education & Certifications" />
    <div className="education-grid">
      <motion.div className="education-card" variants={itemVariant}>
        <h3>Education</h3>
        <div className="education-item">
          <GraduationCapIcon />
          <div>
            <p>MBA, Finance</p>
            <p>DY Patil University, Navi Mumbai (2024 - 2025)</p>
          </div>
        </div>
        <div className="education-item">
          <GraduationCapIcon />
          <div>
            <p>BCom, Advanced Cost Accounting</p>
            <p>Shivaji University (2017 - 2020)</p>
          </div>
        </div>
      </motion.div>
      <motion.div className="education-card" variants={itemVariant}>
        <h3>Key Certifications</h3>
        <div className="cert-item">
            <CertificateIcon />
            <div>
                <p>Bank of America - Investment Banking (Forage)</p>
            </div>
        </div>
        <div className="cert-item">
            <CertificateIcon />
            <div>
                <p>EY - Financial Accounting Advisory Services (Forage)</p>
            </div>
        </div>
        <div className="cert-item">
            <CertificateIcon />
            <div>
                <p>Goldman Sachs - Risk (Forage)</p>
            </div>
        </div>
        <div className="cert-item">
            <CertificateIcon />
            <div>
                <p>Data Analysis using Excel (Coursera)</p>
            </div>
        </div>
        <div className="cert-item">
            <CertificateIcon />
            <div>
                <p>Business Analysis & Process Management (Coursera)</p>
            </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

// --- Contact / Footer Component ---
const Contact = () => (
  <Section id="contact">
    <div className="contact-content">
      <AnimatedTitle text="Let's Connect" />
      <motion.p className="contact-text" variants={itemVariant}>
        I'm actively seeking new opportunities in business analysis and finance. If you have a role that aligns with my skills and experience, I'd love to hear from you.
      </motion.p>
      <motion.a 
        href="mailto:jen14397pin@gmail.com" className="btn btn-primary"
        variants={itemVariant} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        Say Hello <MailIcon />
      </motion.a>
      <motion.div className="contact-socials" variants={itemVariant}>
        <a href="https://linkedin.com/in/jeniferpinto" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </motion.div>
    </div>
    <motion.footer className="footer" initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}}>
      <p>© {new Date().getFullYear()} Jenifer Pinto. All Rights Reserved.</p>
    </motion.footer>
  </Section>
);

// --- Back to Top Button ---
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top" aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        >
          <ArrowUpIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main App Component ---
function App() {
  useEffect(() => {
    document.title = "Jenifer Pinto | Business Analyst";
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Hero />
          <About />
          <Experience />
        </main>
        <Projects />
        <main className="main-content">
          <Skills />
          <Education />
          <Contact />
        </main>
        <BackToTopButton />
      </div>
    </>
  );
}

export default App;