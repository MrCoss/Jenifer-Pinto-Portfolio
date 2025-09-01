import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-4">About Me</h2>
        <p className="text-xl text-secondary text-center max-w-3xl mx-auto leading-relaxed">
          I am a dedicated and detail-oriented MBA Finance student with a strong foundation in business analysis and financial analytics. My experience spans from co-founding an educational venture to interning at dynamic firms where I've honed my skills in data analysis, reporting, and process improvement. I am driven by a passion for uncovering insights that support strategic decision-making and enhance operational efficiency.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
