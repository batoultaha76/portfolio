import React, { useEffect, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, ChevronDown, ChevronUp, Image as ImageIcon, Maximize2, Minimize2, ChevronRight, ChevronLeft, Star, Award, Target } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectDetails = memo(({ project }) => {
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const [isHovering, setIsHovering] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 10,
        });

        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(currentProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sections = [
        { id: 'overview', label: 'Overview', icon: Star },
        { id: 'challenges', label: 'Challenges & Solutions', icon: Target },
        { id: 'technologies', label: 'Technologies', icon: Award }
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white py-20 px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] z-50"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Back Button with enhanced hover effect */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <motion.button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group relative"
                    whileHover={{ x: -5 }}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Projects</span>
                    <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity"
                        initial={false}
                        animate={{ opacity: isHovering ? 0.2 : 0 }}
                    />
                </motion.button>
            </motion.div>

            {/* Project Header with enhanced animations */}
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Project Image Gallery */}
                            <div className="lg:w-1/2">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                                    <div className="relative rounded-xl overflow-hidden">
                                        <motion.img
                                            key={currentImageIndex}
                                            src={project.images[currentImageIndex]}
                                            alt={project.title}
                                            className="w-full h-[300px] object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-4">
                                            <button
                                                onClick={prevImage}
                                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                            >
                                                <ChevronLeft className="w-6 h-6 text-white" />
                                            </button>
                                            <button
                                                onClick={() => setIsImageExpanded(true)}
                                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                            >
                                                <Maximize2 className="w-6 h-6 text-white" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                            >
                                                <ChevronRight className="w-6 h-6 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Image Thumbnails */}
                                    <div className="flex gap-2 mt-4 justify-center">
                                        {project.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                    currentImageIndex === index
                                                        ? 'border-purple-500 scale-110'
                                                        : 'border-transparent hover:border-white/20'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info with enhanced animations */}
                            <div className="lg:w-1/2 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        {project.title}
                                    </h1>
                                    <p className="mt-4 text-gray-400 text-lg">
                                        {project.description}
                                    </p>
                                </motion.div>

                                {/* Project Stats with hover effects */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { icon: Calendar, label: 'Duration', value: project.duration, color: 'purple' },
                                        { icon: Clock, label: 'Timeline', value: project.timeline, color: 'indigo' },
                                        { icon: Users, label: 'Role', value: project.role, color: 'blue' }
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                                            whileHover={{ scale: 1.05 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        >
                                            <div className="relative">
                                                <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform`} />
                                                <div className={`absolute -inset-1 bg-${stat.color}-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                            </div>
                                            <p className="text-sm text-gray-400">{stat.label}</p>
                                            <p className="text-white font-medium">{stat.value}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Project Links with enhanced hover effects */}
                                <div className="flex gap-4">
                                    {project.demoLink && (
                                        <motion.a
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg text-white font-medium hover:opacity-90 transition-opacity relative overflow-hidden group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                            <span>Live Demo</span>
                                            <motion.div
                                                className="absolute inset-0 bg-white/20"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </motion.a>
                                    )}
                                    {project.githubLink && (
                                        <motion.a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-colors relative overflow-hidden group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                            <span>View Code</span>
                                            <motion.div
                                                className="absolute inset-0 bg-white/10"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Tabs with Icons */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-white/5 rounded-lg p-1 backdrop-blur-sm border border-white/10">
                        {sections.map((section) => (
                            <motion.button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                                    activeSection === section.id
                                        ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <section.icon className="w-4 h-4" />
                                {section.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Project Details with smooth transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-12"
                    >
                        {activeSection === 'overview' && (
                            <motion.section
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20"></div>
                                <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                                        <Star className="w-6 h-6 text-purple-400" />
                                        Project Overview
                                    </h2>
                                    <div className="prose prose-invert max-w-none">
                                        {project.overview}
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'challenges' && (
                            <motion.section
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20"></div>
                                <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                                        <Target className="w-6 h-6 text-purple-400" />
                                        Challenges & Solutions
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xl font-semibold text-purple-400 mb-4">Challenges</h3>
                                            <ul className="space-y-3">
                                                {project.challenges.map((challenge, index) => (
                                                    <motion.li
                                                        key={index}
                                                        className="flex items-start gap-3"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-purple-400 mt-2"></span>
                                                        <span className="text-gray-300">{challenge}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-indigo-400 mb-4">Solutions</h3>
                                            <ul className="space-y-3">
                                                {project.solutions.map((solution, index) => (
                                                    <motion.li
                                                        key={index}
                                                        className="flex items-start gap-3"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    >
                                                        <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2"></span>
                                                        <span className="text-gray-300">{solution}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'technologies' && (
                            <motion.section
                                className="relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20"></div>
                                <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                                        <Award className="w-6 h-6 text-purple-400" />
                                        Technologies Used
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {project.technologies.map((tech, index) => (
                                            <motion.span
                                                key={index}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-pointer group"
                                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <span className="relative z-10">{tech}</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Expanded Image Modal with Gallery */}
            <AnimatePresence>
                {isImageExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsImageExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={currentImageIndex}
                                src={project.images[currentImageIndex]}
                                alt={project.title}
                                className="w-full h-auto rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <button
                                    onClick={prevImage}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <ChevronLeft className="w-8 h-8 text-white" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <ChevronRight className="w-8 h-8 text-white" />
                                </button>
                            </div>
                            <button
                                onClick={() => setIsImageExpanded(false)}
                                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Minimize2 className="w-6 h-6 text-white" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {project.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            currentImageIndex === index
                                                ? 'bg-white'
                                                : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

ProjectDetails.displayName = 'ProjectDetails';

export default ProjectDetails; 