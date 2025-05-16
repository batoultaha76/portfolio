import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const location = useLocation();
    const navigate = useNavigate();
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#portfolio", label: "Portfolio" },
        { href: "#Service", label: "Services" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            if (location.pathname === '/') {
                const sections = navItems.map(item => {
                    const section = document.querySelector(item.href);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        return {
                            id: item.href.replace("#", ""),
                            offset: rect.top + window.scrollY - 100,
                            height: rect.height
                        };
                    }
                    return null;
                }).filter(Boolean);

                const currentPosition = window.scrollY + 100;
                const active = sections.find(section => 
                    currentPosition >= section.offset && 
                    currentPosition < section.offset + section.height
                );

                if (active) {
                    setActiveSection(active.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleNavigation = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#030014] opacity-100"
                    : scrolled
                    ? "bg-[#030014]/50 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            {/* White Glow Effect */}
            <div
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[62vw] h-[400px] bg-white/20 rounded-b-full"
                style={{
                    filter: 'blur(64px)',
                    opacity: 0.35,
                }}
            />
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%] relative z-10">
                <div className="flex items-center justify-between h-20">
                    {/* Empty div to balance the layout */}
                    <div className="hidden md:block flex-1"></div>

                    {/* Logo - Center */}
                    <div className="flex-1 flex justify-center">
                        <Link to="/" className="flex items-center group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                                <img 
                                    src={logo} 
                                    alt="Logo" 
                                    className="h-16 w-auto transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert" 
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Right */}
                    <div className="hidden md:flex items-center justify-end space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item.href.replace("#", ""))}
                                className="group relative px-1 py-2 text-sm font-medium"
                            >
                                <span
                                    className={`relative z-10 transition-colors duration-300 ${
                                        activeSection === item.href.replace("#", "")
                                            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                            : "text-[#e2d3fd] group-hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                        activeSection === item.href.replace("#", "")
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`md:hidden h-[calc(100vh-64px)] fixed inset-0 bg-[#030014] transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-[-100%] pointer-events-none"
                    }`}
                    style={{ top: "64px" }}
                >
                    <div className="flex flex-col h-full">
                        <div className="px-4 py-6 space-y-6 flex-1 overflow-y-auto">
                            {navItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavigation(item.href.replace("#", ""))}
                                    className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                                        activeSection === item.href.replace("#", "")
                                            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                            : "text-[#e2d3fd] hover:text-white"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                        transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;