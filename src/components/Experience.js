import { motion } from 'framer-motion';

const experiences = [
    { role: 'Business Analyst Intern', company: 'Unified Mentor', date: 'Sep 2025 - Present', desc: 'Analyzed business requirements, conducted data analysis to identify trends, and created dashboards with insights for stakeholders using Excel, Power BI/Tableau, and SQL.' },
    { role: 'Financial Analyst Intern', company: 'SkillFied Mentor', date: 'Jul 2025 - Aug 2025', desc: 'Developed a fraud detection model and built a portfolio optimization tool using Python. Commended for exceptional dedication and hard work.' },
    { role: 'Co-Founder and Teacher', company: 'JHT SMART STEPS LEARNING', date: 'Feb 2023 - Jun 2025', desc: 'Designed, managed, and delivered educational services independently, creating a specialized tutoring business.'},
    { role: 'Retail Sales Associate', company: 'Tata Tanishq', date: 'Jan 2022 - Jul 2022', desc: 'Assisted customers, met monthly sales targets, and handled billing, inventory, and merchandising.' }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
      <div className="relative border-l-2 border-surface ml-4 md:ml-0 md:pl-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-10 pl-8 relative"
          >
            <div className="absolute w-4 h-4 bg-accent rounded-full -left-[1.4rem] mt-1.5 border-4 border-background"></div>
            <p className="text-sm text-secondary font-medium">{exp.date}</p>
            <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
            <p className="text-lg text-secondary font-semibold">{exp.company}</p>
            <p className="text-secondary mt-2">{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
