import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ExternalLink,
  Code,
  X,
  Mail,
  Phone,
  Calendar,
  ArrowDown,
  FileCode,
  FileText,
  LayoutGrid,
  Book,
  Coffee,
  GraduationCap,
  Briefcase,
  MapPin
} from 'lucide-react';
import { techStackData, projects, certificates } from '@/data/portfolioData';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';


// Define TypeScript interfaces for form data and form errors
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const modalRef = useRef(null);
  const sectionsRef = useRef({});
  const { toast } = useToast();

  const roles = [
    
     "Full Stack Developer",
    "Mern Stack Developer",
    "React & Node.js Engineer",
    "UI/UX Designer",


  ];

  const roleColors = [
    "text-indigo-700", 
    "text-red-600",   // Frontend Engineer - Blue
    "text-green-600",   // Web Developer - Green
    "text-pink-500",  // UI/UX Designer - Purple

  ];

  useEffect(() => {
    // Simulating loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollPosition = window.scrollY + 100;

      // Check which section is currently in view
      for (const section in sectionsRef.current) {
        const element = sectionsRef.current[section];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeProjectDetails();
      }
    };

    if (selectedProject) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProject]);

  const handleNavigation = (section) => {
    setCurrentSection(section);
    setMenuOpen(false);
    if (sectionsRef.current[section]) {
      window.scrollTo({
        top: sectionsRef.current[section].offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const registerSection = (section, element) => {
    if (element && !sectionsRef.current[section]) {
      sectionsRef.current[section] = element;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Function to handle CV download
  const handleDownloadCV = () => {
    // Replace this URL with the actual path to your CV file
    const cvUrl = "https://drive.google.com/file/d/1hFg5NMrzmIXhgOY_IjiPUnSTEAyTaydN/view?usp=sharing";

    window.open(cvUrl, '_blank');
    toast({
      title: "Download initiated",
      description: "Your CV download has started in a new tab"
    });
  };

  // Function to handle email contact
  const handleEmailContact = () => {
    window.location.href = "mailto:ankanbarik2004@gmail.com?subject=Job Opportunity for Ankan Barik";
    toast({
      title: "Email client opening",
      description: "Redirecting to your email client"
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app min-h-screen bg-background overflow-x-hidden">
      <Navbar
        currentSection={currentSection}
        handleNavigation={handleNavigation}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        scrolled={scrolled}
      />

      <div
        ref={(el) => registerSection('home', el)}
        id="home-section"
        className="bg-gradient-to-br from-violet-50 to-purple-200"
      >
        <EnhancedLandingPage />
      </div>

      <div
        ref={(el) => registerSection('about', el)}
        id="about-section"
        className="bg-gradient-to-br from-white to-white"
      >
        <AboutSection handleDownloadCV={handleDownloadCV} />
      </div>

      <div
        ref={(el) => registerSection('skills', el)}
        id="skills-section"
        className="bg-gradient-to-br from-emerald-50 to-teal-100"
      >
        <SkillsSection />
      </div>

      <div
        ref={(el) => registerSection('portfolio', el)}
        id="portfolio-section"
        className="bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <PortfolioSection openProjectDetails={openProjectDetails} />
      </div>

      <div
        ref={(el) => registerSection('contact', el)}
        id="contact-section"
        className="bg-gradient-to-br from-rose-50 to-pink-200"
      >
        <ContactSection />
      </div>

      <Footer />

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            closeModal={closeProjectDetails}
            modalRef={modalRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Loading Screen Component with Enhanced 3D Cube
const LoadingScreen = () => {
  // Animation variant for the loading text
  const loadingTextVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50">
      {/* Glowing background effect */}
      <div className="absolute">
        <div className="glow-effect w-64 h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="loader relative w-32 h-32">
        {/* Shadow beneath the cube */}
        <div className="shadow absolute -bottom-10 left-1/2 w-16 h-2 bg-black rounded-full filter blur-md opacity-30 transform -translate-x-1/2"></div>

        {/* 3D Cube */}
        <div className="cube-wrapper perspective-800">
          <div className="cube w-32 h-32 relative transform-style-preserve-3d animate-spin-3d">
            {/* Cube Faces with Gradient Colors and Borders */}
            <div className="face front absolute inset-0 bg-gradient-to-tr from-cyan-400 to-cyan-600 opacity-90 border border-cyan-300 shadow-inner"></div>
            <div className="face back absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 opacity-90 border border-pink-300 shadow-inner transform translate-z-32"></div>
            <div className="face right absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-90 border border-emerald-300 shadow-inner transform rotate-y-90 translate-z-16"></div>
            <div className="face left absolute inset-0 bg-gradient-to-l from-amber-400 to-amber-600 opacity-90 border border-amber-300 shadow-inner transform rotate-y-270 translate-z-16"></div>
            <div className="face top absolute inset-0 bg-gradient-to-t from-violet-400 to-violet-600 opacity-90 border border-violet-300 shadow-inner transform rotate-x-90 translate-z-16"></div>
            <div className="face bottom absolute inset-0 bg-gradient-to-b from-rose-400 to-rose-600 opacity-90 border border-rose-300 shadow-inner transform rotate-x-270 translate-z-16"></div>

            {/* Inner glowing cube */}
            <div className="inner-cube w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform-style-preserve-3d animate-spin-3d-reverse">
              <div className="inner-face front absolute inset-0 bg-white opacity-40 border border-white shadow-inner"></div>
              <div className="inner-face back absolute inset-0 bg-white opacity-40 border border-white shadow-inner transform translate-z-16"></div>
              <div className="inner-face right absolute inset-0 bg-white opacity-40 border border-white shadow-inner transform rotate-y-90 translate-z-8"></div>
              <div className="inner-face left absolute inset-0 bg-white opacity-40 border border-white shadow-inner transform rotate-y-270 translate-z-8"></div>
              <div className="inner-face top absolute inset-0 bg-white opacity-40 border border-white shadow-inner transform rotate-x-90 translate-z-8"></div>
              <div className="inner-face bottom absolute inset-0 bg-white opacity-40 border border-white shadow-inner transform rotate-x-270 translate-z-8"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Loading Text */}
      <motion.div
        className="loading-text mt-24 text-center"
        variants={loadingTextVariants}
        animate="animate"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-500 bg-clip-text text-transparent">Loading</h2>
        <div className="dots-container flex justify-center mt-1">
          <motion.span
            className="dot text-xl font-bold text-cyan-400"
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
          >.</motion.span>
          <motion.span
            className="dot text-xl font-bold text-purple-500"
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
          >.</motion.span>
          <motion.span
            className="dot text-xl font-bold text-amber-500"
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
          >.</motion.span>
        </div>
      </motion.div>

      {/* CSS for 3D cube animations */}
      <style>{`
        .perspective-800 {
          perspective: 800px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes spin-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes spin-3d-reverse {
          0% { transform: rotateX(360deg) rotateY(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg); }
          100% { transform: rotateX(0deg) rotateY(360deg); }
        }
        
        .animate-spin-3d {
          animation: spin-3d 8s linear infinite;
        }
        
        .animate-spin-3d-reverse {
          animation: spin-3d-reverse 6s linear infinite;
        }
        
        .translate-z-8 {
          transform: translateZ(8px);
        }
        
        .translate-z-16 {
          transform: translateZ(16px);
        }
        
        .translate-z-32 {
          transform: translateZ(32px);
        }
        
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .rotate-y-270 {
          transform: rotateY(270deg);
        }
        
        .rotate-x-90 {
          transform: rotateX(90deg);
        }
        
        .rotate-x-270 {
          transform: rotateX(270deg);
        }
      `}</style>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentSection, handleNavigation, menuOpen, toggleMenu, scrolled }) => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="logo"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">Ankan </span>

          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-pink-600 to-purple-600">Barik</span>
        </motion.div>
        

        <div className="lg:hidden flex items-center">
          <button
            className="nav-toggle flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 mb-1.5 ${menuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 mt-1.5 ${menuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        <motion.div
          className={`nav-links absolute top-full left-0 w-full bg-white shadow-md lg:shadow-none lg:bg-transparent lg:static lg:w-auto lg:flex transition-all duration-300 ${menuOpen ? 'block' : 'hidden lg:flex'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button
            className={`nav-link block w-full lg:inline-block lg:w-auto px-5 py-3 text-base font-medium transition-colors ${currentSection === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </button>
          <button
            className={`nav-link block w-full lg:inline-block lg:w-auto px-5 py-3 text-base font-medium transition-colors ${currentSection === 'about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => handleNavigation('about')}
          >
            About
          </button>
          <button
            className={`nav-link block w-full lg:inline-block lg:w-auto px-5 py-3 text-base font-medium transition-colors ${currentSection === 'skills' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => handleNavigation('skills')}
          >
            Skills
          </button>
          <button
            className={`nav-link block w-full lg:inline-block lg:w-auto px-5 py-3 text-base font-medium transition-colors ${currentSection === 'portfolio' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => handleNavigation('portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`nav-link block w-full lg:inline-block lg:w-auto px-5 py-3 text-base font-medium transition-colors ${currentSection === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => handleNavigation('contact')}
          >
            Contact
          </button>
        </motion.div>

        <motion.button
          className={`hidden lg:block contact-btn px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 text-sm font-medium`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onClick={() => handleNavigation('contact')}
        >
          Contact Me
        </motion.button>
      </div>
    </nav>
  );
};

// Updated Landing Page Component with enhanced image card animations
const EnhancedLandingPage = () => {
  // Sample data
  const roles = ["Full Stack Developer", "Mern Stack Developer","React & Node.js Engineer","UI/UX Designer"];
  const roleColors = [ "text-indigo-600", "text-amber-500","text-green-600","text-pink-600",];
  const [roleIndex, setRoleIndex] = useState(0);

  // Function to handle role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to portfolio section
  const handleViewMyWork = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open email client with predefined email address
  const handleHireMe = () => {
    window.location.href = "mailto:ankanbarik2004@gmail.com?subject=Job Opportunity for Ankan Barik";
  };

  return (
    <section className="landing-section min-h-screen flex flex-col items-center pt-20 pb-10 px-4 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between mt-10">
        <div className="landing-text w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hello, I'm{" "}
            <span className="font-extrabold">
              <span className="text-blue-600">A</span>
              <span className="text-orange-600">n</span>
              <span className="text-purple-600">k</span>
              <span className="text-red-600">a</span>
              <span className="text-cyan-600">n</span>
              {" "}
            </span>
          </h1>

          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 h-12 ${roleColors[roleIndex]}`}
          >
            {roles[roleIndex]}
          </h2>

          <p className="text-start text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
            I build future-ready, user-centric digital experiences by transforming bold ideas into innovative, scalable solutions using modern technologies.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="primary-btn px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl"
              onClick={handleViewMyWork}
            >
              View My Work
            </button>
            <button
              className="secondary-btn px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 rounded-full transition-all duration-300 text-base font-medium shadow-lg hover:shadow-xl"
              onClick={handleHireMe}
            >
              <Mail className="inline mr-2" size={18} /> Hire Me
            </button>
          </div>

          {/* Unified Social Media Icons */}
          <div className="social-links flex justify-center lg:justify-start space-x-6 mt-8">
            {/* LinkedIn */}
            <div className="social-icon-wrapper relative">
              <div className="social-icon-shadow absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
              <a
                href="https://www.linkedin.com/in/aankan-barik/"
                className="social-link relative flex items-center justify-center w-12 h-12 bg-white text-blue-600 rounded-full shadow-lg transform transition-all duration-300 z-10 hover:shadow-xl hover:bg-black group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} className="relative z-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            {/* GitHub */}
            <div className="social-icon-wrapper relative">
              <div className="social-icon-shadow absolute inset-0 bg-gray-800 rounded-full blur-sm opacity-30"></div>
              <a
                href="https://github.com/ankan-barik"
                className="social-link relative flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg transform transition-all duration-300 z-10 hover:shadow-xl hover:bg-black group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} className="relative z-10 text-gray-800 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            {/* Instagram */}
            <div className="social-icon-wrapper relative">
              <div className="social-icon-shadow absolute inset-0 bg-pink-500 rounded-full blur-sm opacity-30"></div>
              <a
                href="https://www.instagram.com/aaankannn"
                className="social-link relative flex items-center justify-center w-12 h-12 bg-white text-pink-600 rounded-full shadow-lg transform transition-all duration-300 z-10 hover:shadow-xl hover:bg-black group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} className="relative z-10 text-pink-600 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            {/* Twitter/X */}
            <div className="social-icon-wrapper relative">
              <div className="social-icon-shadow absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-30"></div>
              <a
                href="https://x.com/aaankannn"
                className="social-link relative flex items-center justify-center w-12 h-12 bg-white text-blue-400 rounded-full shadow-lg transform transition-all duration-300 z-10 hover:shadow-xl hover:bg-black group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} className="relative z-10 text-blue-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            <div className="social-icon-wrapper relative">
  <div className="social-icon-shadow absolute inset-0 bg-red-400 rounded-full blur-sm opacity-30"></div>

  <a
    href="mailto:ankanbarik2004@gmail.com"
    className="social-link relative flex items-center justify-center w-12 h-12 bg-white text-red-400 rounded-full shadow-lg transform transition-all duration-300 z-10 hover:shadow-xl hover:bg-black group"
  >
    <Mail 
      size={20} 
      className="relative z-10 text-red-400 group-hover:text-white transition-colors duration-300" 
    />
  </a>
</div>
          </div>
        </div>

        <div className="landing-image w-full lg:w-1/2 flex justify-center lg:justify-end">
          {/* Enhanced animated card with Profile Image */}
          <motion.div 
            className="animated-card-container relative w-64 h-64 md:w-80 md:h-80 transform -translate-y-8"
            animate={{
              y: [-8, -14, -8],
              x: [0, 5, -5, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 8,  // Reduced from 8 to 4 seconds - makes the main card move twice as fast
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Main circular card with white border */}
            <div className="card-frame absolute inset-0 rounded-full border-4 border-white bg-gradient-to-br from-blue-200 via-purple-400 to-pink-500 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Animated glow effect behind the image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-900 opacity-30 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 1,  // Reduced from 5 to 2.5 seconds - makes the glow pulse faster
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="profile-image-container w-full h-full p-2 relative z-10">
                {/* Profile image */}
                <motion.img
                  src="/assets/WhatsApp Image 2025-04-02 at 00.47.15_a8fb2567.jpg"
                  alt="Ankan Barik"
                  className="w-full h-full object-cover rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    if (img.parentNode) {
                      (img.parentNode as HTMLElement).innerHTML = '<div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500"><span class="text-xl font-bold">AB</span></div>';
                    }
                  }}
                />
              </div>
            </div>

            {/* Rotating bubbles around the card with enhanced animations */}
            <motion.div 
              className="orbit-container absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}  // Reduced from 15 to 7 seconds
            >
              <motion.div 
                className="orbit-bubble absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 3,  // Reduced from 3 to 1.5 seconds
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div 
              className="orbit-container absolute inset-0 w-full h-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}  // Reduced from 12 to 6 seconds
            >
              <motion.div 
                className="orbit-bubble absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2,  // Reduced from 4 to 2 seconds
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5  // Reduced from 1 to 0.5 seconds
                }}
              />
            </motion.div>

            <motion.div 
              className="orbit-container absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="orbit-bubble absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </motion.div>

            <motion.div 
              className="orbit-container absolute inset-0 w-full h-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <motion.div 
                className="orbit-bubble absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-yellow-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
            </motion.div>
            
            {/* Additional decorative elements */}
            <motion.div
              className="absolute -top-2 right-6 w-4 h-4 bg-pink-700 rounded-full opacity-70"
              animate={{
                y: [-2, 2, -2],
                opacity: [0.7, 0.9, 0.7],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-4 right-0 w-5 h-5 bg-cyan-700 rounded-full opacity-70"
              animate={{
                x: [0, 3, 0],
                opacity: [0.7, 0.9, 0.7],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

     <div className="scroll-indicator flex flex-col place-items-center mt-2 lg:mt-2 relative -top-5">
       <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
       <div className="mouse w-6 h-10 border-2 border-blue-700 rounded-full flex justify-center mt-2">
         <div className="wheel w-1 h-2 rounded-full mt-2 bg-blue-500 animate-wheel"></div>
       </div>
     </div>

      {/* Add necessary CSS for animations */}
      <style>{`
        @keyframes wheel-animation {
          0%, 100% { transform: translateY(0); background-color: #3B82F6; }
          25% { background-color: #8B5CF6; }
          50% { transform: translateY(4px); background-color: #EC4899; }
          75% { background-color: #EF4444; }
        }
        
        .animate-wheel {
          animation: wheel-animation 1.5s ease-in-out infinite;
        }
        
        .social-link {
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};
// About Section Component ─────────────────────────────────────────────────────────────────────────────

const AboutSection = ({ handleDownloadCV }) => {

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const fadeLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const fadeRight = (delay = 0) => ({
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const stats = [
    { number: '5+', label: 'Full-Stack Projects ' },
    { number: '3mo', label: 'Internship' },
    { number: '10+', label: 'Tech Stacks' },
    { number: '2026', label: 'Graduating' },
  ];

const quickDetails = [
  { icon: <Briefcase size={15} />, label: 'Available for', value: 'Full-Stack Developer Roles' },
  { icon: <Mail size={15} />,      label: 'Email', value: 'ankanbarik2004@gmail.com' },
  { icon: <Phone size={15} />,     label: 'Phone', value: '+91 7908840378' },
  { icon: <MapPin size={15} />,    label: 'Based in', value: 'Bhubaneswar, Odisha' },
];

  return (
    <section
      className="about-section"
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative background blobs ── */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}
        className="about-container"
      >

{/* ── HERO HEADING ── */}
<motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: "60px" }}>
  <h2
    style={{
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 800,
      color: "#0f0f0f",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      marginBottom: "0",
    }}
  >
    Education &
    <span
      style={{
        marginLeft: "8px",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        backgroundImage:
          "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)",
      }}
    >
      Experience
    </span>
  </h2>

  <div
    style={{
      width: "100px",
      height: "3px",
      margin: "18px auto 0",
      background: "linear-gradient(90deg, #fb923c, #fdba74)",
      borderRadius: "2px",
    }}
  />
</motion.div>

        {/* ── MAIN TWO-COLUMN LAYOUT ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start',
            marginBottom: '64px',
          }}
          className="about-main-grid"
        >

          {/* ─── LEFT COLUMN — Bio + Stats + Details ─── */}
          <div>
         <motion.p
  {...fadeLeft(0.2)}
  style={{
    fontSize: '1.05rem',
    color: '#4b5563',
    lineHeight: 1.9,
    marginBottom: '36px',
    borderLeft: '3px solid #fb923c',
    paddingLeft: '20px',
    textAlign: 'justify'   // Added this line
  }}
>
  I'm currently pursuing a{' '}
  <strong style={{ color: '#0f0f0f', fontWeight: 700 }}>
    B.Tech in Information Technology at Kalinga Institute of Industrial Technology (KIIT).
  </strong>{' '}
  Passionate about full-stack web development, I enjoy building modern, scalable web applications. I have experience working with technologies such as React.js, Node.js, Express.js, and MongoDB, and I focus on creating responsive, user-friendly digital experiences.
</motion.p>

            {/* Stats row */}
            <motion.div
              {...fadeLeft(0.32)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1px',
                marginBottom: '36px',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.06)',
              }}
              className="stats-grid"
            >
              {stats.map(({ number, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 + i * 0.08, duration: 0.6 }}
                  whileHover={{ background: '#fff8f0' }}
                  style={{
                    padding: '20px 12px',
                    textAlign: 'center',
                    background: '#ffffff',
                    cursor: 'default',
                    transition: 'background 0.2s',
                  }}
                >
                  <p style={{
                    fontSize: '1.6rem', fontWeight: 800, color: '#fb923c',
                    letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '4px',
                  }}>{number}</p>
                  <p style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick details */}
            <motion.div
              {...fadeLeft(0.44)}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}
            >
              {quickDetails.map(({ icon, label, value }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  background: '#fafafa',
                  transition: 'border-color 0.2s, background 0.2s',
                }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: '#fff7ed', border: '1px solid rgba(249,115,22,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#f97316', flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1px' }}>{label}</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div {...fadeLeft(0.54)}>
              <motion.button
                className="primary-btn"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(249,115,22,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadCV}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 36px',
                  background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                  color: '#ffffff',
                  border: 'none', borderRadius: '999px',
                  fontSize: '0.92rem', fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.02em',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.22)',
                  transition: 'box-shadow 0.3s',
                }}
              >
                <ArrowDown size={16} />
                Download CV
              </motion.button>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN — Cards ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* ── EDUCATION CARD ── */}
            <motion.div
              {...fadeRight(0.25)}
              whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(249,115,22,0.13)' }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(249,115,22,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                transition: 'box-shadow 0.35s, transform 0.35s',
              }}
            >
              {/* Header band */}
              <div style={{
                padding: '20px 28px 18px',
                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                borderBottom: '1px solid rgba(249,115,22,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'rgba(249,115,22,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <GraduationCap size={20} color="#f97316" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.68rem', color: '#fb923c', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1px' }}>Education</p>
                    <p style={{ fontSize: '0.78rem', color: '#9a3412', fontWeight: 600 }}>Academic Background</p>
                  </div>
                </div>
                <span style={{
                  padding: '5px 14px', borderRadius: '999px',
                  background: 'rgba(249,115,22,0.12)',
                  color: '#c2410c', fontSize: '0.72rem', fontWeight: 700,
                  border: '1px solid rgba(249,115,22,0.2)',
                  whiteSpace: 'nowrap',
                }}>2022 – 2026</span>
              </div>

              {/* Body */}
              <div style={{ padding: '22px 28px 24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  B.Tech — Information Technology
                </h3>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f97316', marginBottom: '4px' }}>
                  KIIT University
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <MapPin size={12} color="#9ca3af" />
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Bhubaneswar, Odisha &nbsp;·&nbsp; Final Year</p>
                </div>

                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: '#fafafa', border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d1d5db', fontWeight: 700, marginBottom: '10px' }}>Core Subjects</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['DSA', 'DBMS', 'OS', 'Networks', 'CN', 'Mobile Computing'].map(t => (
                      <span key={t} style={{
                        fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px',
                        borderRadius: '999px', background: '#fff7ed',
                        color: '#9a3412', border: '1px solid rgba(249,115,22,0.2)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── INTERNSHIP CARD ── */}
            <motion.div
              {...fadeRight(0.38)}
              whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(59,130,246,0.12)' }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(59,130,246,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                transition: 'box-shadow 0.35s, transform 0.35s',
              }}
            >
              {/* Header band */}
              <div style={{
                padding: '20px 28px 18px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderBottom: '1px solid rgba(59,130,246,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'rgba(59,130,246,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Briefcase size={20} color="#3b82f6" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.68rem', color: '#3b82f6', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1px' }}>Experience</p>
                    <p style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 600 }}>Professional Work</p>
                  </div>
                </div>
                <span style={{
                  padding: '5px 14px', borderRadius: '999px',
                  background: 'rgba(59,130,246,0.1)',
                  color: '#1d4ed8', fontSize: '0.72rem', fontWeight: 700,
                  border: '1px solid rgba(59,130,246,0.2)',
                  whiteSpace: 'nowrap',
                }}>May 2025 – Aug 2025</span>
              </div>

              {/* Body */}
              <div style={{ padding: '22px 28px 24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  Full Stack Developer Intern
                </h3>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6', marginBottom: '4px' }}>
                  Labmentix
                </p>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '20px' }}>Remote &nbsp;·&nbsp; 3 Months</p>

                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: '#fafafa', border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d1d5db', fontWeight: 700, marginBottom: '12px' }}>Highlights</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {[
                      'Developed full-stack features using React.js and Node.js',
                      'Designed and integrated RESTful APIs with MongoDB',
                      'Improved UI/UX and optimized performance of web applications',
                    ].map(pt => (
                      <div key={pt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '5px',
                          background: 'rgba(59,130,246,0.1)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                        }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6' }} />
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.55 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs'].map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px',
                      borderRadius: '999px', background: '#eff6ff',
                      color: '#1d4ed8', border: '1px solid rgba(59,130,246,0.2)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        /* ── Large desktop (1200px+): no change needed, base styles apply ── */

        /* ── Tablet landscape (901px – 1199px) ── */
        @media (max-width: 1199px) {
          .about-container {
            padding: 0 28px !important;
          }
          .about-main-grid {
            gap: 40px !important;
          }
        }

        /* ── Tablet portrait + small laptop (601px – 900px) ── */
        @media (max-width: 900px) {
          .about-section {
            padding: 80px 0 60px !important;
          }
          .about-container {
            padding: 0 24px !important;
          }
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }

        /* ── Mobile (max 600px) ── */
        @media (max-width: 600px) {
          .about-section {
            padding: 64px 0 48px !important;
          }
          .about-container {
            padding: 0 16px !important;
          }
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            margin-bottom: 40px !important;
          }

          /* Heading */
          .about-section h2 {
            font-size: 1.55rem !important;
          }

          /* Bio text */
          .about-section p {
            font-size: 0.95rem !important;
          }

          /* Stats: 2×2 grid on very small screens */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* Cards: tighter padding */
          .about-section [style*="padding: '22px 28px 24px'"],
          .about-section [style*="padding: '20px 28px 18px'"] {
            padding: 16px 18px !important;
          }

          /* Quick-detail value: allow wrapping instead of ellipsis */
          .about-section .detail-value {
            white-space: normal !important;
            word-break: break-word !important;
          }

          /* Download CV button: full width on mobile */
          .primary-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        /* ── Extra small (max 380px) ── */
        @media (max-width: 380px) {
          .about-container {
            padding: 0 12px !important;
          }
          .about-section h2 {
            font-size: 1.35rem !important;
          }
          .stats-grid > div {
            padding: 14px 6px !important;
          }
          .stats-grid p:first-child {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

// Skills Section Component

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsGroups = [
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces that enhance user experience and engagement."
    },
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Building responsive and interactive web applications using modern frontend technologies."
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Developing robust server-side solutions to support and enhance web application functionality."
    }
  ];

  // Updated technology objects to include their own icon components
const technologies = [
  {
    name: "HTML5",
    level: 90,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
        alt="HTML5"
        className="w-10 h-10"
      />
    ),
    color: "bg-red-600",
  },
  {
    name: "CSS3",
    level: 85,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        alt="CSS3"
        className="w-10 h-10"
      />
    ),
    color: "bg-blue-600",
  },
  {
    name: "JavaScript",
    level: 80,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        alt="JavaScript"
        className="w-10 h-10"
      />
    ),
    color: "bg-yellow-300",
  },
  {
    name: "React.js",
    level: 75,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        alt="React"
       className="w-10 h-10"
      />
    ),
    color: "bg-cyan-400",
  },
  {
    name: "Node.js",
    level: 70,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        alt="Node.js"
        className="w-10 h-10"
      />
    ),
    color: "bg-green-600",
  },
  {
    name: "Tailwind CSS",
    level: 70,
    icon: (
      <img
        src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
        alt="Tailwind CSS"
        className="w-10 h-10"
      />
    ),
    color: "bg-teal-500",
  },
  {
  name: "MongoDB",
  level: 70,
  icon: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      alt="MongoDB"
      className="w-10 h-10"
    />
  ),
  color: "bg-green-500",
},
  {
  name: "Express.js",
  level: 70,
  icon: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
      alt="Express.js"
      className="w-10 h-10 bg-white rounded"
    />
  ),
  color: "bg-gray-800",
},
  {
    name: "GitHub",
    level: 65,
    icon: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
        alt="GitHub"
      className="w-10 h-10"
      />
    ),
    color: "bg-black",
  },
  {
  name: "Vercel",
  level: 60,
  icon: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
      alt="Vercel"
      className="w-9 h-9 bg-white rounded"
    />
  ),
  color: "bg-black",
},


];



  // Custom Vercel icon component
  function VercelIcon() {
    return (
      <svg className="text-black" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 19.8h20L12 2z" />
      </svg>
    );
  }

  // Custom Vite icon component
  function ViteIcon() {
    return (
      <svg className="text-indigo-500" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8,2L2,9.6L12.5,22L23,9.6L17,2H8z M9,7.5c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S11.3,9,10.5,9S9,8.3,9,7.5z" />
      </svg>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // UI/UX Design icon using Figma-style logo
  const UiUxIcon = () => (
    <div className="w-20 h-20 relative skill-icon flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="50" height="50" rx="25" fill="#FF3E4E" />
        <rect x="50" y="0" width="50" height="50" rx="25" fill="#FF8D8D" />
        <rect x="0" y="50" width="50" height="50" rx="25" fill="#B53FFD" />
        <circle cx="75" cy="75" r="25" fill="#17C3FF" />
        
      </svg>
    </div>
  );

  // Frontend Development icon with SVG
  const FrontendIcon = () => (
    <div className="w-20 h-20 relative skill-icon flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="70" rx="6" fill="#4A90E2" />
        <rect x="5" y="20" width="90" height="55" rx="2" fill="#F8F8F8" />
        <circle cx="15" cy="12.5" r="3" fill="#FF6B6B" />
        <circle cx="25" cy="12.5" r="3" fill="#FFD93D" />
        <circle cx="35" cy="12.5" r="3" fill="#6BCB77" />
        <path d="M25,40 L15,50 L25,60" stroke="#E44D26" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M75,40 L85,50 L75,60" stroke="#E44D26" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="35" width="20" height="20" rx="2" fill="#2965F1" opacity="0.7" />
        <rect x="45" y="40" width="10" height="10" rx="1" fill="#FFFFFF" />
      </svg>
    </div>
  );

  // Backend Development icon
  const BackendIcon = () => (
    <div className="w-20 h-20 relative skill-icon flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#00B5E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32.5 80c0.5 0-16.125 0-16.125-29.25C16.375 21.25 32.5 20 32.5 20c9.7 0 18.3 4.75 13.6 13.44L22.5 56.75c8.75 4.75 17.375 12.7 27.125-0.2C66 40.25 52.5 27.5 52.5 27.5" fill="#00B5E2" />
        </g>
        <path d="M68.75 51.5c0 2.5-0.94 4.7-2.8 6.44l-30 30c-1.7 1.8-4.06 2.7-6.38 2.7-2.38 0-4.7-0.88-6.5-2.7-1.75-1.7-2.7-4-2.7-6.38s-0.88-4.7 2.7-6.5l30-30c1.7-1.75 4-2.7 6.38-2.7 2.38 0 4.7 0.88 6.5 2.7C69.56 46.8 70.63 49.25 68.75 51.5z" fill="#FFBB00" />
        <circle cx="62.5" cy="62.5" r="10" fill="#9C27B0" />
        <circle cx="62.5" cy="62.5" r="5" fill="#E1BEE7" />
        <path fill="#80D8FF" d="M78.75 41.5l10-10L75 20 65 30l3.75 3.75-6.25 6.25 5 5 11.25-11.25z" />
      </svg>
    </div>
  );

  const getIcon = (id) => {
    switch (id) {
      case 'uiux':
        return <UiUxIcon />;
      case 'frontend':
        return <FrontendIcon />;
      case 'backend':
        return <BackendIcon />;
      default:
        return null;
    }
  };

  // Technology card component with progress bar
  const TechnologyCard = ({ name, level, icon, color, index }) => {
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setProgressValue(level);
      }, 500 + index * 150);

      return () => clearTimeout(timer);
    }, [level, index]);

    return (
      <motion.div
        className="tech-card bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="icon-container bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h4 className="text-lg font-semibold mb-3">{name}</h4>
          <div className="w-full mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${color} h-2 rounded-full transition-all duration-700`}
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
          <span className="text-gray-700 font-medium">{level}%</span>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="skills-section py-20 px-4 ">
      <div className="container mx-auto">
        <div className="section-header text-center mb-12">
          <motion.h2
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  style={{
    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
    fontWeight: 800,
    color: '#0f0f0f',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textAlign: 'center'
  }}
>
  My{" "}
  <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
    Skills
  </span>
</motion.h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>

        <motion.p
          className="skills-subtitle text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Expertise across the full stack of web development and design.
        </motion.p>

        {/* Skill Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillsGroups.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="skill-card bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              variants={itemVariants}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-card-content flex flex-col items-center text-center">
                <motion.div
                  className="skill-icon-container mb-6"
                  animate={{
                    rotateY: hoveredSkill === skill.id ? 180 : 0,
                    scale: hoveredSkill === skill.id ? 1.1 : 1
                  }}
                  transition={{ duration: 0.7 }}
                >
                  {getIcon(skill.id)}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{skill.title}</h3>
                <p className="text-gray-600 text-base">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Cards Section with Progress Bars */}
        <motion.div
          className="tech-skills-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="tech-skills-title text-2xl font-extrabold text-center text-gray-900 mb-12">Technologies I Work With</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <TechnologyCard
                key={index}
                name={tech.name}
                level={tech.level}
                icon={tech.icon}
                color={tech.color}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Portfolio Section Component
const PortfolioSection = ({ openProjectDetails }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [zoomedCertificate, setZoomedCertificate] = useState(null);

  const toggleZoom = (certificate) => {
    if (zoomedCertificate && zoomedCertificate.title === certificate.title) {
      setZoomedCertificate(null);
    } else {
      setZoomedCertificate(certificate);
    }
  };

  return (
    <motion.section
      className="portfolio-section py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        <div className="section-header text-center mb-12">
  <h2
    style={{
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 800,
      color: "#0f0f0f",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    }}
  >
    Portfolio{" "}
    <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
      Showcase
    </span>
  </h2>

  <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 rounded"></div>
</div>

        <motion.div
          className="portfolio-tabs flex flex-wrap justify-center mb-10 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <button
            className={`tab-btn px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ${activeTab === 'projects' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab-btn px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ${activeTab === 'certificates' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
          <button
            className={`tab-btn px-6 py-2 rounded-full text-base font-medium transition-all duration-300 ${activeTab === 'tech-stack' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('tech-stack')}
          >
            Tech Stack
          </button>
        </motion.div>

        {activeTab === 'projects' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {projects.map((project, index) => (
              <motion.div
                className="project-card bg-white rounded-xl overflow-hidden shadow-lg"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="project-image h-30 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-110" />
                </div>
                <div className="project-info p-6">
                  <h3 className="text-xl font-bold text-orange-700 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="project-actions flex justify-between items-center">
                    <a href={project.link} className="project-link text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors" target="_blank" rel="noopener noreferrer">
                      Demo
                    </a>
                    <button
                      className="details-btn px-4 py-2 bg-purple-600 hover:bg-purple-900 text-white rounded-full text-sm font-medium transition-colors"
                      onClick={() => openProjectDetails(project)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'certificates' && (
          <>
            {zoomedCertificate && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setZoomedCertificate(null)}
              >
                <motion.div
                  className="relative max-w-4xl max-h-screen p-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <button
                    className="absolute top-4 right-4 text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedCertificate(null);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img
                    src={zoomedCertificate.image}
                    alt={zoomedCertificate.title}
                    className="max-w-full max-h-[80vh] rounded-lg object-contain mx-auto"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-white">{zoomedCertificate.title}</h3>
                    <p className="text-purple-300 font-medium">{zoomedCertificate.issuer} - {zoomedCertificate.date}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {certificates.map((certificate, index) => (
                <motion.div
                  className="certificate-card bg-white rounded-xl shadow-lg overflow-hidden relative"
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.12)" }}
                >
                  <div className="certificate-image h-48 overflow-hidden relative group">
                    <img src={certificate.image} alt={certificate.title} className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                      <button
                        className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 p-3 rounded-full text-purple-600 hover:text-purple-800 hover:bg-opacity-100 transition-all transform scale-90 group-hover:scale-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleZoom(certificate);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="certificate-info p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{certificate.title}</h3>
                    <p className="text-purple-600 font-medium mb-1">{certificate.issuer}</p>
                    <p className="certificate-date text-sm text-gray-500">{certificate.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {activeTab === 'tech-stack' && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {techStackData.map((stack, index) => (
              <motion.div
                className="tech-stack-card bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <img
                  src={stack.logo}
                  alt={stack.name}
                  className="tech-stack-logo w-16 h-16 object-contain mb-4"
                />
                <span className="tech-stack-name text-sm font-medium text-gray-800">{stack.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Project Details Modal Component
const ProjectDetailsModal = ({ project, closeModal, modalRef }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="project-modal bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] -y-auto overflow-x-hidden"
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full text-gray-800 hover:text-red-600 transition-colors z-10" onClick={closeModal}>
          <X size={20} />
        </button>

        <div className="modal-content">
          <div className="modal-header relative h-64 overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <h2 className="modal-title absolute bottom-6 left-8 text-3xl font-bold text-white">{project.title}</h2>
          </div>

          <div className="modal-body p-8">
            <div className="modal-description mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this project</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="modal-features mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="feature-list space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-start">
                    <div className="feature-bullet w-2 h-2 mt-2 rounded-full bg-purple-600 mr-3"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-tech mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
              <div className="modal-tags flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-stats grid grid-cols-2 gap-6 mb-8">
              <div className="stat-card bg-gray-50 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-purple-600">{project.techCount}</span>
                <p className="text-sm text-gray-500 mt-1">Technologies</p>
              </div>
              <div className="stat-card bg-gray-50 rounded-xl p-4 text-center">
                <span className="text-3xl font-bold text-purple-600">{project.featureCount}</span>
                <p className="text-sm text-gray-500 mt-1">Features</p>
              </div>
            </div>
          </div>

          <div className="modal-footer flex flex-col sm:flex-row justify-center gap-4 p-8 pt-0">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors w-full sm:w-auto text-center"
            >
              <ExternalLink className="mr-2" size={18} /> Live Demo
            </a>
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-colors w-full sm:w-auto text-center"
            >
              <Github className="mr-2" size={18} /> View Code
            </a>
            {/* <button
              onClick={closeModal}
              className="modal-btn flex items-center justify-center px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl transition-colors w-full sm:w-auto"
            >
              Back to Portfolio
            </button> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name as keyof FormErrors]) {
      const updated = { ...formErrors };
      delete updated[name as keyof FormErrors];
      setFormErrors(updated);
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const formObject = {
        access_key: "0eb99993-ac65-44fb-aa35-af2f3036bcab",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        message: formData.message,
        subject: `Contact form submission from ${formData.firstName} ${formData.lastName}`,
      };
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formObject),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent! I'll get back to you soon.",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setIsLoading(false);
      setFormStatus({
        submitted: true,
        success: false,
        message: "There was an error sending your message. Please try again.",
      });
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#faf9f7]">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, #fce7f3 0%, transparent 50%), radial-gradient(circle at 80% 90%, #fce7f3 0%, transparent 50%)",
          opacity: 0.6,
        }}
      />

      <div className="relative container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-pink-500 font-semibold tracking-[0.2em] text-xs uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Let's collaborate
          </p>
          <h2
            className="text-[#1a1a1a]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Get In{" "}
            <span
              className="italic"
              style={{
                color: "#be185d",
                fontStyle: "italic",
              }}
            >
              Touch
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12 bg-pink-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <div className="h-px w-12 bg-pink-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left — SVG Illustration Panel */}
          <div className="hidden lg:flex flex-col justify-between rounded-3xl overflow-hidden relative bg-[#1a0a10] p-10">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-900 opacity-30 blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-rose-800 opacity-20 blur-2xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <p
                className="text-pink-300 text-xs font-semibold tracking-[0.18em] uppercase mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Available for work
              </p>
              <h3
                className="text-white leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                Have a project <br />
                <span className="text-pink-300 italic">in mind?</span>
              </h3>
              <p className="text-[#c9a0b0] text-sm leading-relaxed max-w-xs">
                Whether it's a website, a brand, or an idea — I'd love to hear
                about it. Let's create something remarkable together.
              </p>
            </div>

            {/* SVG Illustration */}
            <div className="relative z-10 my-8 flex justify-center">
              <svg
                viewBox="0 0 320 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-xs"
              >
                {/* Desk */}
                <rect x="20" y="185" width="280" height="10" rx="5" fill="#4a1535" />
                {/* Monitor stand */}
                <rect x="148" y="162" width="24" height="26" rx="4" fill="#3a1028" />
                <rect x="132" y="185" width="56" height="7" rx="3" fill="#3a1028" />
                {/* Monitor */}
                <rect x="72" y="80" width="176" height="88" rx="10" fill="#2a0d1e" stroke="#be185d" strokeWidth="2" />
                <rect x="80" y="88" width="160" height="70" rx="7" fill="#1a0812" />
                {/* Code lines on screen */}
                <rect x="90" y="98" width="60" height="4" rx="2" fill="#f472b6" opacity="0.8" />
                <rect x="90" y="108" width="100" height="4" rx="2" fill="#fbcfe8" opacity="0.5" />
                <rect x="98" y="118" width="80" height="4" rx="2" fill="#f472b6" opacity="0.6" />
                <rect x="98" y="128" width="50" height="4" rx="2" fill="#fbcfe8" opacity="0.4" />
                <rect x="90" y="138" width="70" height="4" rx="2" fill="#f472b6" opacity="0.7" />
                {/* Cursor blink */}
                <rect x="164" y="138" width="3" height="10" rx="1" fill="#f9a8d4">
                  <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
                </rect>

                {/* Keyboard */}
                <rect x="100" y="192" width="120" height="22" rx="5" fill="#2a0d1e" stroke="#4a1535" strokeWidth="1" />
                <rect x="106" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="122" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="138" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="154" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="170" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="186" y="197" width="12" height="7" rx="2" fill="#3a1028" />
                <rect x="113" y="207" width="50" height="5" rx="2" fill="#3a1028" />
                <rect x="170" y="207" width="20" height="5" rx="2" fill="#3a1028" />

                {/* Mouse */}
                <rect x="232" y="192" width="20" height="26" rx="10" fill="#2a0d1e" stroke="#4a1535" strokeWidth="1" />
                <line x1="242" y1="192" x2="242" y2="206" stroke="#4a1535" strokeWidth="1" />

                {/* Plant pot */}
                <rect x="28" y="170" width="24" height="18" rx="3" fill="#3a1028" />
                <ellipse cx="40" cy="170" rx="14" ry="5" fill="#2a0d1e" />
                <path d="M40 165 Q30 148 22 155 Q28 160 40 165Z" fill="#831843" />
                <path d="M40 165 Q50 148 58 155 Q52 160 40 165Z" fill="#9d174d" />
                <path d="M40 162 Q40 145 38 140 Q42 145 40 162Z" fill="#be185d" />

                {/* Coffee mug */}
                <rect x="263" y="173" width="22" height="16" rx="4" fill="#3a1028" />
                <path d="M285 178 Q294 178 294 183 Q294 188 285 188" stroke="#4a1535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <rect x="266" y="176" width="16" height="4" rx="2" fill="#f472b6" opacity="0.4" />
                {/* Steam */}
                <path d="M269 172 Q271 168 269 164" stroke="#f9a8d4" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M275 170 Q277 165 275 160" stroke="#f9a8d4" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.3s" repeatCount="indefinite" />
                </path>

                {/* Floating shapes */}
                <circle cx="48" cy="68" r="10" fill="#be185d" opacity="0.25">
                  <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite" />
                </circle>
                <rect x="270" y="55" width="14" height="14" rx="3" fill="#f472b6" opacity="0.2" transform="rotate(20 277 62)">
                  <animateTransform attributeName="transform" type="rotate" values="20 277 62;35 277 62;20 277 62" dur="4s" repeatCount="indefinite" />
                </rect>
                <circle cx="295" cy="120" r="6" fill="#fda4af" opacity="0.2">
                  <animateTransform attributeName="transform" type="translate" values="0,0;0,6;0,0" dur="3.5s" repeatCount="indefinite" />
                </circle>

                {/* Email envelope floating */}
                <g opacity="0.85">
                  <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="4s" repeatCount="indefinite" />
                  <rect x="50" y="28" width="42" height="30" rx="4" fill="#be185d" opacity="0.7" />
                  <polyline points="50,28 71,46 92,28" stroke="#fce7f3" strokeWidth="1.5" fill="none" />
                </g>
              </svg>
            </div>

          {/* Info & Social Links */}
            <div className="relative z-10 flex flex-col gap-2.5">
              {/* Contact details */}
              {[
                { icon: "✉", label: "ankanbarik2004@gmail.com", href: "mailto:ankanbarik2004@gmail.com" },
                { icon: "📞", label: "+91 7908840378", href: "tel:+91XXXXXXXXXX" },
                { icon: "📍", label: "India — Open to Remote", href: null },
              ].map(({ icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-900/50 flex items-center justify-center text-sm flex-shrink-0">
                    {icon}
                  </div>
                  {href ? (
                    <a href={href} className="text-[#c9a0b0] text-sm hover:text-pink-300 transition-colors truncate">
                      {label}
                    </a>
                  ) : (
                    <span className="text-[#c9a0b0] text-sm">{label}</span>
                  )}
                </div>
              ))}
 
              {/* Divider */}
              <div className="flex items-center gap-2 my-1">
                <div className="h-px flex-1 bg-pink-900/40" />
                <span className="text-[10px] text-pink-800/80 tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
                  socials
                </span>
                <div className="h-px flex-1 bg-pink-900/40" />
              </div>
 
              {/* Social buttons */}
              <div className="flex gap-2.5">
                {/* GitHub */}
                <a
                  href="https://github.com/ankan-barik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 border border-pink-900/50 hover:border-pink-600/60 hover:bg-pink-900/40 transition-all group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-300 group-hover:text-white transition-colors">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="text-xs text-pink-300 group-hover:text-white transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                    GitHub
                  </span>
                </a>
 
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/aankan-barik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 border border-pink-900/50 hover:border-pink-600/60 hover:bg-pink-900/40 transition-all group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-300 group-hover:text-white transition-colors">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-xs text-pink-300 group-hover:text-white transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                    LinkedIn
                  </span>
                </a>
 
                {/* Vercel */}
                <a
                  href="https://vercel.com/ankanbarik2004-gmailcoms-projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 border border-pink-900/50 hover:border-pink-600/60 hover:bg-pink-900/40 transition-all group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-300 group-hover:text-white transition-colors">
                    <path d="M24 22.525H0L12 1.475 24 22.525z" />
                  </svg>
                  <span className="text-xs text-pink-300 group-hover:text-white transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Vercel
                  </span>
                </a>

                <a
  href="https://instagram.com/aaankannn"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-950/60 border border-pink-900/50 hover:border-pink-600/60 hover:bg-pink-900/40 transition-all group"
>
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-pink-300 group-hover:text-white transition-colors"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm4.25 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zm5.25-.88a1.13 1.13 0 1 1-1.13-1.12 1.13 1.13 0 0 1 1.13 1.12z" />
  </svg>

  <span
    className="text-xs text-pink-300 group-hover:text-white transition-colors"
    style={{ fontFamily: "'DM Mono', monospace" }}
  >
    Instagram
  </span>
</a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-pink-100 p-8 md:p-10 flex flex-col justify-center"
          >
            <h3
              className="text-[#1a1a1a] mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Send a message
            </h3>
            <p className="text-sm text-gray-400 mb-8">
              Fill in the details below and I'll reply shortly.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["firstName", "lastName"] as const).map((field) => (
                  <div key={field} className="group">
                    <label
                      htmlFor={field}
                      className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5"
                    >
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      placeholder={field === "firstName" ? "Jane" : "Doe"}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none
                        ${formErrors[field]
                          ? "border-red-300 bg-red-50 text-red-900 placeholder:text-red-300"
                          : focusedField === field
                          ? "border-pink-400 bg-white ring-2 ring-pink-100"
                          : "border-gray-200 bg-gray-50 hover:border-pink-200"
                        }`}
                    />
                    {formErrors[field] && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                        {formErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Email + Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none
                      ${formErrors.email
                        ? "border-red-300 bg-red-50"
                        : focusedField === "email"
                        ? "border-pink-400 bg-white ring-2 ring-pink-100"
                        : "border-gray-200 bg-gray-50 hover:border-pink-200"
                      }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
                    Phone{" "}
                    <span className="normal-case font-normal text-gray-300">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none
                      ${focusedField === "phone"
                        ? "border-pink-400 bg-white ring-2 ring-pink-100"
                        : "border-gray-200 bg-gray-50 hover:border-pink-200"
                      }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, idea, or just say hello…"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl text-sm border transition-all outline-none resize-y
                    ${formErrors.message
                      ? "border-red-300 bg-red-50"
                      : focusedField === "message"
                      ? "border-pink-400 bg-white ring-2 ring-pink-100"
                      : "border-gray-200 bg-gray-50 hover:border-pink-200"
                    }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Status Message */}
              {formStatus.submitted && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl text-sm border
                    ${formStatus.success
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                  <span className="text-base mt-0.5">
                    {formStatus.success ? "✓" : "✕"}
                  </span>
                  <p>{formStatus.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all
                  ${isLoading
                    ? "bg-pink-300 cursor-not-allowed text-white"
                    : "bg-pink-600 hover:bg-pink-700 active:scale-[0.98] text-white shadow-md shadow-pink-200 hover:shadow-pink-300"
                  }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </span>
                )}
              </button>

              <p className="text-center text-[11px] text-gray-300">
                No spam. I'll only use your details to reply.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Index;
