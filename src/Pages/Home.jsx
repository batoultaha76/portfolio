import { useState, useEffect, memo } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion } from "framer-motion"

// Memoized Components
const MainTitle = memo(() => (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
        <div className="flex flex-col space-y-4">
            <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <span className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-30 rounded-lg"></span>
                <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Welcome! <span className="text-2xl sm:text-3xl lg:text-4xl opacity-80">v1.0</span>
                </h1>
            </motion.div>

            <motion.div 
                className="relative pl-4 border-l-2 border-purple-500"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
            >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                    <div className="absolute w-full h-full rounded-full animate-ping bg-purple-500 opacity-50"></div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                    You&apos;re interacting with
                </h2>
            </motion.div>
        </div>

        <motion.div
            className="pl-8 space-y-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
        >
            <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
            >
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl opacity-20 rounded-lg"></span>
                <p className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Batoul Taha <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">vBeta</span>
                </p>
            </motion.div>

            <motion.div
                className="relative flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
            >
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400">
                    a constantly evolving UI/UX experience
                </p>
            </motion.div>

            <motion.div
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                whileHover={{ x: 10 }}
            >
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:animate-pulse"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 group-hover:text-white transition-colors">
                        Start exploring or scroll for system specs
                        <motion.span 
                            className="inline-block ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    </div>
));
MainTitle.displayName = 'MainTitle';

const Home = () => {
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
        <div className="min-h-screen bg-[#030014] overflow-hidden relative" id="Home">
            {/* Tech Pattern Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute inset-0 opacity-50">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3c3c3c2e,transparent)]"></div>
                </div>
            </div>

            <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen">
                    <div className="relative h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Column - Welcome Text */}
                        <div className="w-full space-y-6 md:pr-8">
                            <div className="space-y-6">
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-30 rounded-lg"></span>
                                    <div className="relative space-y-6">
                                        <motion.h1 
                                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight overflow-hidden mt-16 sm:mt-20"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.7, delay: 0.2 }}
                                        >
                                            <motion.span 
                                                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 inline-block"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.7, delay: 0.4 }}
                                            >
                                                Welcome!
                                            </motion.span>
                                        </motion.h1>
                                        
                                        <div className="space-y-4">
                                            <motion.p 
                                                className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-200 leading-relaxed"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.7, delay: 0.8 }}
                                            >
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 1.0 }}
                                                >
                                                    You&apos;re interacting with Batoul Taha vBeta
                                                </motion.span>
                                            </motion.p>
                                            
                                            <div className="space-y-2">
                                                <motion.div
                                                    className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed relative"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 1.2 }}
                                                >
                                                    {[..."a constantly evolving UI/UX experience. Start exploring or scroll for system specs"].map((char, index) => (
                                                        <motion.span
                                                            key={index}
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{
                                                                duration: 0.05,
                                                                delay: 1.4 + index * 0.03,
                                                                ease: "easeIn"
                                                            }}
                                                        >
                                                            {char}
                                                        </motion.span>
                                                    ))}
                                                    <motion.span
                                                        className="inline-block w-[3px] h-[25px] ml-1 bg-[#a855f7] align-middle"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ 
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.1,
                                                            delay: 1.4 + ("a constantly evolving UI/UX experience. Start exploring or scroll for system specs".length * 0.03),
                                                        }}
                                                        whileInView={{
                                                            opacity: [1, 0, 1],
                                                            transition: {
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                ease: "steps(3)",
                                                                delay: 0.1
                                                            }
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Column - Animated Image */}
                        <motion.div 
                            className="relative w-full max-w-[400px] h-[400px] mx-auto"
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

                                {/* Circuit Board Pattern */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMzUuNSAyNS41aC01djVoLTV2LTVoLTV2LTVoNXYtNWg1djVoNXoiIHN0cm9rZT0iI2E4NTVmNzIwIiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgc3Ryb2tlPSIjNjM2NmYxMjAiIGZpbGw9Im5vbmUiLz4KICA8Y2lyY2xlIGN4PSI0MCIgY3k9IjIwIiByPSIyIiBzdHJva2U9IiM2MzY2ZjEyMCIgZmlsbD0ibm9uZSIvPgogIDxjaXJjbGUgY3g9IjIwIiBjeT0iNDAiIHI9IjIiIHN0cm9rZT0iIzYzNjZmMTIwIiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMiIgc3Ryb2tlPSIjNjM2NmYxMjAiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')] bg-repeat opacity-50"></div>
                                </div>

                                {/* Additional outer glow */}
                                <div className={`absolute -inset-4 bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 rounded-3xl blur-2xl transition-all duration-700 ease-in-out ${
                                    isHovering ? "opacity-70 scale-105" : "opacity-40 scale-100"
                                }`}></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Home);