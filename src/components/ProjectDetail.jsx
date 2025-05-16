import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Star, Layers, Layout, Globe, Package, Cpu, Code, Info, AlertCircle, Award, PenTool, Code2, ArrowUp, UserCheck, Calendar, Clock, Users } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

const TECH_ICONS = {
  Figma: Globe,
  'React Native': Code2,
  'UX Research': Info,
  'Adobe Illustrator': PenTool,
  'Adobe Photoshop': Layers,
  'Material Design': Layout,
  'Human Interface Guidelines': Info,
  iOS: Package,
  Android: Cpu,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </motion.div>
  );
};

TechBadge.propTypes = {
  tech: PropTypes.string.isRequired,
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadProject = useCallback(() => {
    try {
      const projectId = parseInt(id);
      const foundProject = projects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } else {
        console.error('Project not found:', projectId);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    
    const loadData = async () => {
      await loadProject();
      if (mounted) {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [id, loadProject]);

  const handleBack = useCallback(() => {
    // Navigate to home page first
    navigate('/', { replace: true });
    
    // Then scroll to portfolio section after a short delay
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [navigate]);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] text-white pt-20 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] text-white pt-20 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400">Project not found</p>
          <button
            onClick={handleBack}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-20 px-4 md:px-8 relative">
      {/* Glowy background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
      </motion.button>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* New Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button 
            onClick={handleBack}
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md hover:shadow-purple-500/20"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 to-blue-500 group-hover:translate-x-0 ease">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </span>
            <span className="relative invisible">Back</span>
          </button>
        </motion.div>

        {/* Project Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 pt-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 pb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            {project.title}
          </h1>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <div className="relative w-full max-w-xl mx-auto">
            {/* Glowing frame container */}
            <div className="absolute inset-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <motion.div
                className="absolute inset-0 rounded-lg opacity-30"
                style={{
                  background: "linear-gradient(45deg, #6366f1, #a855f7, #6366f1)",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative group"
            >
              <div className="relative bg-[#0a0a1a] p-2 rounded-lg">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-auto rounded-lg ${
                    project.title === "AidTrace" ? "object-contain max-h-[600px]" : ""
                  }`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Project Overview</h2>
            </div>
            <p className="text-gray-300">{project.details.overview}</p>
          </div>
          <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">The Challenge</h2>
            </div>
            <p className="text-gray-300">{project.details.challenge}</p>
          </div>
        </motion.div>

        {project.title === "NeighborSwap" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Solution & Design Process</h2>
              </div>

              {/* Goal */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">The Goal</h3>
                </div>
                <p className="text-gray-300 whitespace-pre-line">{project.details.solution.goal}</p>
              </div>

              {/* My Role */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">My Role</h3>
                </div>
                <p className="text-gray-300 whitespace-pre-line">{project.details.solution.myRole}</p>
              </div>

              {/* Key Features */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Key Features</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.details.solution.keyFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Design Process */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Design Process</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.details.solution.designProcess.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {step}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solutions */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Challenges & Solutions</h3>
                </div>
                <div className="space-y-6">
                  {project.details.solution.challenges.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Challenge: {item.challenge}</h4>
                      <p className="text-gray-300">Solution: {item.solution}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "Smart Wealth by NBK" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Platform-Specific Design Considerations</h2>
              </div>
              <p className="text-gray-300 mb-6">{project.details.solution.platformConsiderations}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold">iOS Design</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {project.details.solution.ios.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold">Android Design</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {project.details.solution.android.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "Designing Web Page" && project.details.solution && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Design Solution</h2>
              </div>

              {/* Sections */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Page Sections</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.details.solution.sections.map((section, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {section}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Design Process</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.details.solution.process.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {step}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Tools & Documentation</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.details.solution.tools.map((tool, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {tool}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "Emirates Flight Search" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Design Solution</h2>
              </div>

              {/* Research & Analysis */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Research & Analysis</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Analyzed user behavior and drop-off points</li>
                  <li>Studied competitor search interfaces</li>
                  <li>Identified key friction points in the current design</li>
                  <li>Gathered user feedback on search experience</li>
                </ul>
              </div>

              {/* Design Process */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Design Process</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Created wireframes for new search widget layout</li>
                  <li>Designed simplified header navigation</li>
                  <li>Implemented clear visual hierarchy</li>
                  <li>Added micro-interactions for better feedback</li>
                </ul>
              </div>

              {/* Key Improvements */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Key Improvements</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Streamlined search widget interface</li>
                  <li>Enhanced visual hierarchy and readability</li>
                  <li>Improved mobile responsiveness</li>
                  <li>Added clear call-to-action buttons</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "Skin Routine Infographic" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Design Solution</h2>
              </div>

              {/* Research & Analysis */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Research & Analysis</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Studied different skin types and their needs</li>
                  <li>Analyzed existing skincare guides</li>
                  <li>Identified key information gaps</li>
                  <li>Researched visual hierarchy best practices</li>
                </ul>
              </div>

              {/* Design Process */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Design Process</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Created initial sketches and layout concepts</li>
                  <li>Developed color scheme and typography</li>
                  <li>Designed iconography and visual elements</li>
                  <li>Iterated on information hierarchy</li>
                </ul>
              </div>

              {/* Key Features */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Key Features</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Clear skin type categorization</li>
                  <li>Step-by-step routine visualization</li>
                  <li>Product recommendations by skin type</li>
                  <li>Easy-to-follow morning and evening routines</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "Personal Branding Logo" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Layout className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Design Solution</h2>
              </div>

              {/* Concept Development */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Concept Development</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Explored cultural symbolism and meaning</li>
                  <li>Sketching initial logo concepts</li>
                  <li>Testing different typography styles</li>
                  <li>Refining geometric proportions</li>
                </ul>
              </div>

              {/* Design Process */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Design Process</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Vector tracing and refinement</li>
                  <li>Color palette development</li>
                  <li>Testing different applications</li>
                  <li>Creating responsive variations</li>
                </ul>
              </div>

              {/* Key Features */}
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Key Features</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Bilingual letter integration</li>
                  <li>Minimalist geometric design</li>
                  <li>Versatile color variations</li>
                  <li>Scalable vector format</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}

        {project.title === "AidTrace" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">The Challenge</h2>
              </div>
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10 mb-8">
                <p className="text-gray-300">{project.details.challenge}</p>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-purple-400" />
                <h2 className="text-3xl font-bold">Final Solution & Impact</h2>
              </div>
              <div className="bg-[#0a0a1a] p-6 rounded-lg border border-white/10">
                <p className="text-gray-300">{project.details.impact}</p>
              </div>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-12"
        >
          {project.title !== "Emirates Flight Search" && 
           project.title !== "Personal Branding Logo" && 
           project.title !== "Skin Routine Infographic" &&
           project.title !== "Smart Wealth by NBK" &&
           project.title !== "Designing Web Page" && (
            <a
              href={project.title === "AidTrace"
                ? "https://www.figma.com/design/pspEl5GtDZUmyBG3P97cmm/AidTraceApp1?node-id=52-924&t=fhKFuyuiK7QJSBUe-1"
                : "https://www.figma.com/design/2j6GDWePrzrXhwGHkEiz58/Untitled?node-id=0-1&t=rSnplhHLC5afw3Hs-1"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 to-blue-500 group-hover:translate-x-0 ease">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Demo on Figma
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Demo on Figma
              </span>
              <span className="relative invisible">View Demo on Figma</span>
            </a>
          )}

          <a
            href={
              project.title === "Emirates Flight Search" 
                ? "/assets/EmiratesCaseStudy.pdf" 
                : project.title === "Personal Branding Logo"
                ? "/assets/logoRepresentation.pdf"
                : project.title === "Designing Web Page"
                ? "/assets/WebPageDesign.pdf"
                : project.title === "Skin Routine Infographic"
                ? "/assets/skinRoutineInfographic.pdf"
                : "/assets/NBKCaseStudy.pdf"
            }
            download={
              project.title === "Emirates Flight Search" 
                ? "EmiratesCaseStudy.pdf" 
                : project.title === "Personal Branding Logo"
                ? "logoRepresentation.pdf"
                : project.title === "Designing Web Page"
                ? "WebPageDesign.pdf"
                : project.title === "Skin Routine Infographic"
                ? "skinRoutineInfographic.pdf"
                : "NBKCaseStudy.pdf"
            }
            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:translate-x-0 ease">
              <Star className="w-5 h-5 mr-2" />
              {project.title === "Personal Branding Logo" || 
               project.title === "Designing Web Page" || 
               project.title === "Skin Routine Infographic"
                ? "Download PDF" 
                : "Download Full Case Study (PDF)"}
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              <Star className="w-5 h-5 mr-2" />
              {project.title === "Personal Branding Logo" || 
               project.title === "Designing Web Page" || 
               project.title === "Skin Routine Infographic"
                ? "Download PDF" 
                : "Download Full Case Study (PDF)"}
            </span>
            <span className="relative invisible">
              {project.title === "Personal Branding Logo" || 
               project.title === "Designing Web Page" || 
               project.title === "Skin Routine Infographic"
                ? "Download PDF" 
                : "Download Full Case Study (PDF)"}
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

ProjectDetail.propTypes = {
  onBack: PropTypes.func.isRequired,
  shouldScroll: PropTypes.bool.isRequired
};

export default ProjectDetail;
