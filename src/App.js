import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import heroImage from './assets/hero.jpg'; // This line is commented out to prevent the error.

// --- Icon Components (as SVGs for self-containment) ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style={{ height: '1.5rem', width: '1.5rem' }}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '1.5rem', width: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);


// --- Reusable Animated Title Component ---
const AnimatedTitle = ({ text }) => {
    return (
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', position: 'relative', color: '#d8b4fe' }}>
            <span style={{ position: 'relative', zIndex: 10 }}>{text}</span>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '0.5rem', width: '6rem', backgroundColor: 'rgba(50, 215, 182, 0.2)', borderRadius: '9999px' }}
            />
        </h2>
    );
};


// --- Navbar Component ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        
        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    const navVariants = {
        hidden: { y: -100 },
        visible: { y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    };

    return (
        <motion.nav variants={navVariants} initial="hidden" animate="visible" style={{ backgroundColor: 'rgba(60, 24, 100, 0.8)', backdropFilter: 'blur(10px)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid rgba(87, 39, 142, 0.5)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#home" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6ee7b7', textDecoration: 'none' }}>Jenifer Pinto</a>
                 <div style={{display: 'flex', gap: '2rem'}} className="hidden md:flex">
                     {links.map((link) => (
                        <a key={link.name} href={link.href} style={{ color: '#d8b4fe', textDecoration: 'none', position: 'relative', padding: '0.25rem 0' }}>
                            {link.name}
                            {activeLink === link.href.substring(1) && (
                                <motion.div layoutId="underline" style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px', backgroundColor: '#2dd4bf' }} />
                            )}
                        </a>
                    ))}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} style={{ color: '#d8b4fe', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ backgroundColor: '#4c1d95' }}>
                    {links.map((link) => <a key={link.name} href={link.href} style={{ display: 'block', textAlign: 'center', padding: '0.5rem 0', color: '#d8b4fe', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>{link.name}</a>)}
                </motion.div>
            )}
        </motion.nav>
    );
};

// --- Hero Component ---
const Hero = () => {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', flexWrap: 'wrap-reverse', gap: '2rem' }}>
        <div style={{ flex: '1 1 500px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ color: '#6ee7b7', fontWeight: '600', marginBottom: '1rem', fontSize: '1.125rem' }}>Hello, I'm</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #6ee7b7, #a78bfa)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Jenifer Pinto</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', color: 'rgba(216, 180, 254, 0.9)', fontWeight: '600', marginBottom: '2rem' }}>Business Analyst & MBA Finance Candidate</motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} style={{ maxWidth: '42rem', color: 'rgba(216, 180, 254, 0.8)', marginBottom: '2rem', lineHeight: '1.6' }}>
                I leverage data to drive strategic business decisions, specializing in financial analysis, process optimization, and creating data-driven insights with Excel, Power BI/Tableau, and SQL.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <motion.a href="#contact" whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }} style={{ backgroundColor: '#2dd4bf', color: '#ffffff', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(45, 212, 191, 0.3), 0 4px 6px -2px rgba(45, 212, 191, 0.2)' }}>Get In Touch</motion.a>
                {/* IMPORTANT: Place your resume file named "Jenifer-Pinto-Resume.pdf" in the public folder */}
                <motion.a href="/Jenifer-Pinto-Resume.pdf" download whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }} whileTap={{ scale: 0.95 }} style={{ border: '1px solid #a78bfa', color: '#a78bfa', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <DownloadIcon/> Download Resume
                </motion.a>
            </motion.div>
        </div>
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }} 
            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            {/* The src attribute now points to a placeholder image to prevent build errors. */}
            <img 
  src="/hero.png" 
  alt="Jenifer Pinto" 
  style={{ width: '400px', borderRadius: '50%' }}
/>



        </motion.div>
    </section>
  );
};

// --- About Component ---
const About = () => {
    return (
        <section id="about" style={{ padding: '6rem 0' }}>
            <AnimatedTitle text="About Me" />
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} style={{ fontSize: '1.25rem', color: 'rgba(216, 180, 254, 0.9)', textAlign: 'center', maxWidth: '48rem', margin: '0 auto', lineHeight: '1.6', backgroundColor: 'rgba(87, 39, 142, 0.5)', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #581c87' }}>
                <p>I am a dedicated and detail-oriented MBA Finance student with a strong foundation in business analysis and financial analytics. My experience spans from co-founding an educational venture to interning at dynamic firms where I've honed my skills in data analysis, reporting, and process improvement. I am driven by a passion for uncovering insights that support strategic decision-making and enhance operational efficiency.</p>
            </motion.div>
        </section>
    );
};

// --- Experience Component ---
const Experience = () => {
    const experiences = [
        { role: 'Business Analyst Intern', company: 'Unified Mentor', date: 'Sep 2025 - Present', desc: 'Analyzed business requirements, conducted data analysis to identify trends, and created dashboards with insights for stakeholders using Excel, Power BI/Tableau, and SQL.' },
        { role: 'Financial Analyst Intern', company: 'SkillFied Mentor', date: 'Jul 2025 - Aug 2025', desc: 'Developed a fraud detection model and built a portfolio optimization tool using Python. Commended for exceptional dedication and hard work.' },
        { role: 'Co-Founder and Teacher', company: 'JHT SMART STEPS LEARNING', date: 'Feb 2023 - Jun 2025', desc: 'Designed, managed, and delivered educational services independently, creating a specialized tutoring business.'},
        { role: 'Retail Sales Associate', company: 'Tata Tanishq', date: 'Jan 2022 - Jul 2022', desc: 'Assisted customers, met monthly sales targets, and handled billing, inventory, and merchandising.' }
    ];

  return (
    <section id="experience" style={{ padding: '6rem 0' }}>
      <AnimatedTitle text="Work Experience" />
      <div style={{ position: 'relative', borderLeft: '2px solid rgba(87, 39, 142, 0.8)', marginLeft: '1rem', maxWidth: '42rem', margin: '0 auto' }}>
        {experiences.map((exp, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.2 }} style={{ marginBottom: '2.5rem', paddingLeft: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-10px', top: '5px', width: '1rem', height: '1rem', backgroundColor: '#2dd4bf', borderRadius: '50%', border: '4px solid #312e81' }}></div>
            <p style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: '500' }}>{exp.date}</p>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#e0e7ff' }}>{exp.role}</h3>
            <p style={{ fontSize: '1.125rem', color: '#6ee7b7', fontWeight: '600' }}>{exp.company}</p>
            <p style={{ color: '#d8b4fe', marginTop: '0.5rem' }}>{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


// --- Projects Component ---
const Projects = () => {
    const projects = [
      { title: 'Fraud Detection in Financial Transactions', description: 'Developed a model to identify fraudulent transactions by addressing severe data imbalance with SMOTE. Achieved 96% precision and 78% recall, balancing fraud capture with accuracy.', tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas', 'Matplotlib'] },
      { title: 'Portfolio Optimization using MPT', description: 'Built a Python-based optimizer using Modern Portfolio Theory. The tool used real-time yFinance data and Sharpe Ratio optimization to find the most risk-efficient portfolio from 10,000 simulations.', tech: ['Python', 'yFinance', 'SciPy', 'Pandas', 'Seaborn'] }
    ];

  return (
    <section id="projects" style={{ padding: '6rem 0', backgroundColor: 'rgba(87, 39, 142, 0.5)', margin: '2.5rem 0', borderRadius: '0.75rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <AnimatedTitle text="Key Projects" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.2 }} whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }} style={{ backgroundColor: '#312e81', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #581c87' }}>
              <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6ee7b7', marginBottom: '0.75rem' }}>{project.title}</h3>
                <p style={{ color: '#d8b4fe', marginBottom: '1rem', flexGrow: 1 }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem' }}>
                  {project.tech.map((tech, i) => <span key={i} style={{ backgroundColor: '#4338ca', color: '#d8b4fe', fontSize: '0.875rem', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>{tech}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Skills Component ---
const Skills = () => {
    const skills = ['Excel', 'Power BI', 'Tableau', 'SQL', 'Python', 'Financial Modeling', 'Risk Management', 'Business Analysis', 'Data Analysis', 'Critical Thinking', 'Collaboration', 'Communication'];
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <section id="skills" style={{ padding: '6rem 0' }}>
      <AnimatedTitle text="Core Competencies" />
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', maxWidth: '56rem', margin: '0 auto' }}>
        {skills.map((skill) => (
          <motion.div key={skill} variants={itemVariants} whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }} style={{ backgroundColor: '#4338ca', border: '1px solid #581c87', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', cursor: 'pointer' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#d8b4fe' }}>{skill}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};


// --- Education Component ---
const Education = () => {
  return (
    <section id="education" style={{ padding: '6rem 0' }}>
      <AnimatedTitle text="Education & Certifications" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '56rem', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} style={{ backgroundColor: 'rgba(87, 39, 142, 0.5)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #581c87' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#6ee7b7' }}>Education</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>MBA, Finance</p>
              <p style={{ color: 'rgba(216, 180, 254, 0.9)' }}>DY Patil University, Navi Mumbai (2024 - 2025)</p>
            </div>
            <div>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>BCom, Advanced Cost Accounting</p>
              <p style={{ color: 'rgba(216, 180, 254, 0.9)' }}>Shivaji University (2017 - 2020)</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} style={{ backgroundColor: 'rgba(87, 39, 142, 0.5)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #581c87' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#a78bfa' }}>Key Certifications</h3>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: 'rgba(216, 180, 254, 0.9)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Bank of America - Investment Banking (Forage)</li>
            <li>EY - Financial Accounting Advisory Services (Forage)</li>
            <li>Goldman Sachs - Risk (Forage)</li>
            <li>Data Analysis using Excel (Coursera)</li>
            <li>Business Analysis & Process Management (Coursera)</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

// --- Contact Component ---
const Contact = () => {
  return (
    <footer id="contact" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#d8b4fe' }}>Let's Connect</h2>
        <p style={{ color: '#d8b4fe', marginBottom: '2rem', maxWidth: '36rem', margin: '0 auto 2rem auto' }}>
          I'm actively seeking new opportunities in business analysis and finance. If you have a role that aligns with my skills and experience, I'd love to hear from you.
        </p>
        <motion.a href="mailto:jen14397pin@gmail.com" whileHover={{ y: -4, scale: 1.05, boxShadow: "0px 10px 30px -5px rgba(45, 212, 191, 0.4)" }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#2dd4bf', color: 'white', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '1.125rem' }}>
          <MailIcon /> Say Hello
        </motion.a>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', gap: '1.5rem' }}>
            <a href="https://linkedin.com/in/jeniferpinto" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}><LinkedInIcon /></a>
        </div>
        <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(87, 39, 142, 0.5)', paddingTop: '2rem' }}>
          <p style={{ color: '#a78bfa' }}>© {new Date().getFullYear()} Jenifer Pinto. All Rights Reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

// --- Back to Top Button Component ---
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
            {isVisible && (
                <motion.button 
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ 
                        background: '#2dd4bf', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '3.5rem', 
                        height: '3.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px 0 rgba(45, 212, 191, 0.39)'
                    }}
                >
                    <ArrowUpIcon />
                </motion.button>
            )}
        </div>
    );
};


// --- Main App Component ---
function App() {

  useEffect(() => {
    document.title = "Jenifer Pinto | Business Analyst";
  }, []);

  return (
    <div style={{ backgroundColor: '#312e81', color: '#d8b4fe', fontFamily: 'sans-serif' }}>
      <Navbar />
      <div style={{ paddingTop: '5rem' }}>
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
      <BackToTopButton />
    </div>
  );
}

export default App;

