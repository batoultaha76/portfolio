import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
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
            <Service />
            <Portofolio />
            <ContactPage />
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <Navbar />
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = React.useState(true);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
            <Route path="/project/:id" element={<ProjectPageLayout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;