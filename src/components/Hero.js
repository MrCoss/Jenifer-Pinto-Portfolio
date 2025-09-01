import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-start">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-4"
      >
        Jenifer Pinto
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-3xl text-accent font-semibold mb-8"
      >
        Business Analyst | MBA Finance Candidate
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl text-secondary mb-8 leading-relaxed"
      >
        Passionate about leveraging data to drive strategic business decisions. Experienced in financial analysis, process optimization, and creating data-driven insights with Excel, Power BI/Tableau, and SQL.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        <a href="#contact" className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors duration-300">Get In Touch</a>
        <a href="https://linkedin.com/in/jeniferpinto" target="_blank" rel="noopener noreferrer" className="border border-secondary text-secondary font-bold py-3 px-6 rounded-lg hover:bg-surface hover:border-accent transition-colors duration-300">
          LinkedIn
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
