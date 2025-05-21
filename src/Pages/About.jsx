import { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          About
        </span>
        <span className="text-white ml-2">
          Me
        </span>
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into wow-worthy experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));
Header.displayName = 'Header';

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';
StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  animation: PropTypes.string.isRequired
};

const AboutPage = () => {
  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: 7,
      label: "Total Projects",
      description: "Thoughtful journeys brought to life",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: 1,
      label: "Certificates",
      description: "UI/UX Design at FSE Factory",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: 3,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], []);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2">
              <h2 
                className="text-left text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get to
                </span>
                <span 
                  className="block mt-2 text-gray-200"
                  data-aos="fade-up"
                  data-aos-duration="1300"
                >
                  know me
                </span>
              </h2>
            </div>
            
            <div className="w-full md:w-1/2 flex items-center">
              <p 
                className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                A passionate UI/UX designer, specialized in crafting intuitive and visually compelling digital experiences. Explore my latest projects and design articles that showcase my expertise in user-centered design, interaction, and modern web aesthetics.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full max-w-md mt-8">
            <a href="/assets/NewCV copy.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <motion.button 
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FileText className="w-5 h-5" />
                </motion.div>
                <span>View CV</span>
              </motion.button>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto">
              <motion.button 
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
                <span>View Portfolio</span>
              </motion.button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);