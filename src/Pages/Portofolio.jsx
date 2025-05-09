import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import CardProject from '../components/CardProject';
import { Sparkles, Layout } from 'lucide-react';

const Portofolio = () => {
  return (
    <section id="portfolio" className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative group" data-aos="zoom-in-up" data-aos-duration="600">
            <h2 
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                My
              </span>
              <span className="text-white ml-2">
                Portfolio
              </span>
            </h2>
          </div>
          <p 
            className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            Imagination Trumps Knowledge!
            <Sparkles className="w-5 h-5 text-purple-400" />
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[20px] bg-blue-500/20" data-aos="fade-up" data-aos-duration="1000">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardProject
                Img={project.image}
                Title={project.title}
                Description={project.description}
                Link={project.liveDemo}
                id={project.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portofolio;