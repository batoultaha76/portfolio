import React, { useState, useEffect, useCallback, memo } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion } from "framer-motion"
import { Palette, Users, Sparkles } from 'lucide-react'

// Memoized Components
const MainTitle = memo(() => (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <motion.span 
                className="relative inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-40"></span>
                <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    UI/UX
                </span>
            </motion.span>
            <br />
            <motion.span 
                className="relative inline-block mt-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-40"></span>
                <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                    Designer
                </span>
            </motion.span>
        </h1>
    </div>
));

const DesignElements = memo(() => (
    <div className="flex flex-col gap-4 mt-8">
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Creative Design</span>
                    <span className="text-xs text-gray-400">Crafting visual experiences</span>
                </div>
            </div>
        </motion.div>
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                    <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">User Experience</span>
                    <span className="text-xs text-gray-400">Focusing on user needs</span>
                </div>
            </div>
        </motion.div>
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Visual Storytelling</span>
                    <span className="text-xs text-gray-400">Creating engaging narratives</span>
                </div>
            </div>
        </motion.div>
    </div>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Aspiring UI/UX Designer", "Digital Experience Creator"];
const TECH_STACK = ["UI Design", "UX Research", "Wireframing", "Prototyping", "User Testing", "Design Systems"];

const Home = () => {
    const [text, setText] = useState("")
    const [isTyping, setIsTyping] = useState(true)
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const initAOS = () => {
            AOS.init({
                once: true,
                offset: 10,
            });
        };

        initAOS();
        window.addEventListener('resize', initAOS);
        return () => window.removeEventListener('resize', initAOS);
    }, []);

    useEffect(() => {
        setIsLoaded(true);
        return () => setIsLoaded(false);
    }, []);

    const handleTyping = useCallback(() => {
        if (isTyping) {
            if (charIndex < WORDS[wordIndex].length) {
                setText(prev => prev + WORDS[wordIndex][charIndex]);
                setCharIndex(prev => prev + 1);
            } else {
                setTimeout(() => setIsTyping(false), PAUSE_DURATION);
            }
        } else {
            if (charIndex > 0) {
                setText(prev => prev.slice(0, -1));
                setCharIndex(prev => prev - 1);
            } else {
                setWordIndex(prev => (prev + 1) % WORDS.length);
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, wordIndex]);

    useEffect(() => {
        const timeout = setTimeout(
            handleTyping,
            isTyping ? TYPING_SPEED : ERASING_SPEED
        );
        return () => clearTimeout(timeout);
    }, [handleTyping]);

    const lottieOptions = {
        src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: true,
        },
        style: { width: "100%", height: "100%" },
        className: `w-full h-full transition-all duration-500 ${
            isHovering 
                ? "scale-[120%] sm:scale-[115%] md:scale-[110%] lg:scale-[105%] rotate-2" 
                : "scale-[115%] sm:scale-[110%] md:scale-[105%] lg:scale-[100%]"
        }`
    };

    return (
        <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
            <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen">
                    <div className="relative h-screen flex items-center justify-center">
                        {/* Left Column - Main Title */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 space-y-6">
                            <MainTitle />
                            <DesignElements />
                        </div>

                        {/* Center - Animated Image */}
                        <motion.div 
                            className="relative w-[400px] h-[400px] mx-auto"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                        >
                            <div className="relative w-full h-full opacity-90">
                                {/* Enhanced glow effects */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/40 to-[#a855f7]/40 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                                    isHovering ? "opacity-90 scale-110" : "opacity-60 scale-100"
                                }`}></div>
                                
                                <div className={`absolute inset-0 bg-gradient-to-br from-[#6366f1]/50 to-[#a855f7]/50 rounded-3xl blur-2xl transition-all duration-700 ease-in-out ${
                                    isHovering ? "opacity-80 scale-105" : "opacity-50 scale-100"
                                }`}></div>

                                <div className={`relative z-10 w-full h-full opacity-90 transform transition-transform duration-500 ${
                                    isHovering ? "scale-105" : "scale-100"
                                }`}>
                                    <DotLottieReact {...lottieOptions} />
                                </div>

                                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                                    isHovering ? "opacity-90" : "opacity-60"
                                }`}>
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/50 to-purple-500/50 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                                        isHovering ? "scale-120" : "scale-100"
                                    }`}>
                                    </div>
                                </div>

                                {/* Additional outer glow */}
                                <div className={`absolute -inset-4 bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 rounded-3xl blur-2xl transition-all duration-700 ease-in-out ${
                                    isHovering ? "opacity-70 scale-105" : "opacity-40 scale-100"
                                }`}></div>
                            </div>
                        </motion.div>

                        {/* Right Column - Typing Effect */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 flex flex-col items-end">
                            <motion.div 
                                className="h-8 flex items-center justify-end"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 2.5 }}
                            >
                                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                                    {text}
                                </span>
                                <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                            </motion.div>

                            {/* Description */}
                            <motion.p 
                                className="mt-32 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            >
                                <motion.span
                                    className="relative inline-block"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                >
                                    <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                                    <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                        Where creativity
                                    </span>
                                </motion.span>
                                <br />
                                <motion.span
                                    className="relative inline-block mt-2"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                >
                                    <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                                    <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                                        meets clarity in
                                    </span>
                                </motion.span>
                                <br />
                                <motion.span
                                    className="relative inline-block mt-2"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                >
                                    <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                                    <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                                        every pixel.
                                    </span>
                                </motion.span>
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Home);