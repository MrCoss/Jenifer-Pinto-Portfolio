import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Fraud Detection in Financial Transactions',
    description: 'Developed a model to identify fraudulent transactions by addressing severe data imbalance with SMOTE. Achieved 96% precision and 78% recall, balancing fraud capture with accuracy.',
    tech: ['Python', 'Scikit-learn', 'SMOTE', 'Pandas', 'Matplotlib']
  },
  {
    title: 'Portfolio Optimization using MPT',
    description: 'Built a Python-based optimizer using Modern Portfolio Theory. The tool used real-time yFinance data and Sharpe Ratio optimization to find the most risk-efficient portfolio from 10,000 simulations.',
    tech: ['Python', 'yFinance', 'SciPy', 'Pandas', 'Seaborn']
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-surface rounded-lg my-10">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center mb-12">Key Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-lg bg-background shadow-lg flex flex-col"
            >
              <h3 className="text-2xl font-bold text-accent mb-3">{project.title}</h3>
              <p className="text-secondary mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-gray-700 text-primary text-sm font-medium px-3 py-1 rounded-full">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

