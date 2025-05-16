import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const navigate = useNavigate();

  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    e.preventDefault();
    if (!id) {
      alert("Project details are not available");
      return;
    }
    navigate(`/project/${id}`, { 
      state: { 
        from: 'portfolio',
        preserveScroll: true
      }
    });
  };

  const hideLiveDemo = Title === "Emirates Flight Search" || 
                      Title === "Skin Routine Infographic" || 
                      Title === "Personal Branding Logo" ||
                      Title === "Smart Wealth by NBK" ||
                      Title === "Designing Web Page";
  
  return (
    <div className="group relative w-full h-full min-h-[22rem]">
      <div className="relative h-full min-h-[22rem] flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10 flex flex-col h-full">
          <div className={`relative overflow-hidden rounded-lg ${
            Title === "Personal Branding Logo" ? "h-48 bg-white p-4" : 
            Title === "Skin Routine Infographic" ? "h-48 bg-white" : 
            "h-48 bg-white"
          } flex items-center justify-center`}>
            {typeof Img === 'string' ? (
              <img
                src={Img}
                alt={Title}
                className={`w-full h-full ${
                  Title === "Personal Branding Logo" 
                    ? "object-contain p-4" 
                    : Title === "Skin Routine Infographic"
                    ? "object-cover"
                    : "object-cover"
                } transform group-hover:scale-105 transition-transform duration-500`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">{Img}</div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between mt-4 space-y-3">
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {Title}
              </h3>
              <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
                {Description}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between">
              {!hideLiveDemo && ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : !hideLiveDemo && (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}
              
              {id ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto"
                >
                  <button
                    onClick={handleDetails}
                    className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-200"
                  >
                    <span className="text-sm font-medium">Details</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </button>
                </motion.div>
              ) : (
                <span className="text-gray-500 text-sm ml-auto">Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

CardProject.propTypes = {
  Img: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Link: PropTypes.string,
  id: PropTypes.number
};

export default CardProject;