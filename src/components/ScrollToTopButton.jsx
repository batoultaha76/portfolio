import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
    </motion.button>
  );
};

export default ScrollToTopButton; 