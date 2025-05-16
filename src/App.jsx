import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portfolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetail from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Service from "./Pages/Service";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        ) : (
          <>
            <Navbar />
            <AnimatedBackground />
            <Home />
            <About />
            <Portfolio />
            <Service />
            <ContactPage />
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

LandingPage.propTypes = {
  showWelcome: PropTypes.bool.isRequired,
  setShowWelcome: PropTypes.func.isRequired
};

const ProjectPageLayout = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
  <>
    <Navbar />
    <ProjectDetail />
    <Footer />
  </>
);
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;