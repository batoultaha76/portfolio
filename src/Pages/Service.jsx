import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Figma, Smartphone, Users, Code, Layout, Palette } from 'lucide-react';

const services = [
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces with a focus on user experience and modern design principles.",
    highlights: [
      { icon: Figma, text: "Figma Expert" },
      { icon: Users, text: "User-Centered" },
      { icon: Palette, text: "Visual Design" }
    ]
  },
  {
    title: "Wireframing",
    description: "Building the foundation of your digital product with clear, structured layouts and user flows.",
    highlights: [
      { icon: Layout, text: "Clean Layouts" },
      { icon: Code, text: "HTML/CSS Ready" },
      { icon: Smartphone, text: "Responsive" }
    ]
  },
  {
    title: "Prototyping",
    description: "Bringing designs to life with interactive prototypes that showcase functionality and user interactions.",
    highlights: [
      { icon: Figma, text: "Interactive" },
      { icon: Users, text: "User Testing" },
      { icon: Code, text: "Code Integration" }
    ]
  },
  {
    title: "Mockup",
    description: "Creating high-fidelity visual representations that bring your product vision to life.",
    highlights: [
      { icon: Palette, text: "High Fidelity" },
      { icon: Layout, text: "Realistic" },
      { icon: Smartphone, text: "Device Ready" }
    ]
  },
  {
    title: "Responsive Design",
    description: "Ensuring your digital products look and function perfectly across all devices and screen sizes.",
    highlights: [
      { icon: Smartphone, text: "Mobile First" },
      { icon: Layout, text: "Adaptive" },
      { icon: Code, text: "Clean Code" }
    ]
  }
];

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const getServiceStyle = (index) => {
    const diff = (index - currentIndex + services.length) % services.length;
    const isNext = diff === 1 || diff === -services.length + 1;
    const isPrev = diff === -1 || diff === services.length - 1;
    
    if (diff === 0) {
      return {
        scale: 1,
        x: 0,
        y: 0,
        z: 50,
        rotateY: 0,
        opacity: 1,
        position: 'relative',
        zIndex: 30,
        pointerEvents: 'auto',
        filter: 'blur(0px)'
      };
    } else if (isNext) {
      return {
        scale: 0.75,
        x: 400,
        y: 100,
        z: -100,
        rotateY: -25,
        opacity: 0.6,
        position: 'absolute',
        zIndex: 20,
        pointerEvents: 'none',
        filter: 'blur(3px)'
      };
    } else if (isPrev) {
      return {
        scale: 0.75,
        x: -400,
        y: 100,
        z: -100,
        rotateY: 25,
        opacity: 0.6,
        position: 'absolute',
        zIndex: 20,
        pointerEvents: 'none',
        filter: 'blur(3px)'
      };
    } else {
      return {
        scale: 0.5,
        x: diff > 0 ? 800 : -800,
        y: 150,
        z: -200,
        rotateY: diff > 0 ? -35 : 35,
        opacity: 0.3,
        position: 'absolute',
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'blur(8px)'
      };
    }
  };

  return (
    <section id="Service" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-0"
        >
          <div className="inline-block relative group" data-aos="zoom-in-up" data-aos-duration="600">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Services
            </h2>
          </div>
          <p className="mt-1 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
             data-aos="zoom-in-up"
             data-aos-duration="800">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Design. Build. Elevate.
            <Sparkles className="w-5 h-5 text-purple-400" />
          </p>
        </motion.div>

        {/* 3D Services Carousel */}
        <div className="relative h-[500px] perspective-1000 pt-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {services.map((service, index) => {
              const style = getServiceStyle(index);
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={style}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1.2,
                    duration: 0.8
                  }}
                  className="w-full max-w-3xl"
                  style={{
                    transformOrigin: "center center",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }}
                  >
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-center text-lg mb-8"
                    >
                      {service.description}
                    </motion.p>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {service.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.15,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          <highlight.icon className="w-5 h-5 text-[#a855f7]" />
                          <span className="text-gray-300">{highlight.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevService}
              className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextService}
              className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#a855f7]' : 'bg-white/20'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
};

export default Service; 