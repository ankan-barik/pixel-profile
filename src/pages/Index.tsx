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
  Coffee
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
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",

  ];

  const roleColors = [
    "text-indigo-700",    // Frontend Engineer - Blue
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
    const cvUrl = "https://drive.google.com/file/d/1FukjFrRrBT9XU3mBZ9qWVcET04SjPoSp/view?usp=sharing";

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
  const roles = ["Frontend Developer", "Backend Developer","UI/UX Designer"];
  const roleColors = ["text-blue-600", "text-green-600", "text-pink-600"];
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
// About Section Component
const AboutSection = ({ handleDownloadCV }) => {
  return (
    <motion.section
      className="about-section py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About <span className="text-orange-400">Me</span></h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto mt-4"></div>
        </div>

        <div className="about-content flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            className="about-image w-full lg:w-2/5"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="image-container relative">
              <div className="about-blob absolute w-full h-full bg-blue-50 rounded-full filter blur-3xl opacity-30 transform -translate-x-4 translate-y-4"></div>
              <img src="/assets/WhatsApp Image 2025-04-02 at 01.02.36_d2329f85.jpg" alt="Ankan Barik" className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-lg" />
            </div>
          </motion.div>

          <motion.div
            className="about-text w-full lg:w-3/5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">I'm a <span className="text-orange-400">B.Tech Computer Science</span> student</h2>
            <p className="text-gray-700 text-lg mb-6">
              I'm currently studying at Kalinga Institute of Industrial Technology with a strong passion for web development.
              Proficient in both frontend and backend technologies like React.js, Node.js, MongoDB, and Express.js.
              Experienced in creating responsive and innovative web solutions.
            </p>

            <motion.div
              className="about-details grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="detail-item flex items-center">
                <div className="icon w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-orange-400 mr-3">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Date of Birth</h3>
                  <p className="font-medium">May 11, 2004</p>
                </div>
              </div>
              <div className="detail-item flex items-center">
                <div className="icon w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-orange-400 mr-3">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Email</h3>
                  <p className="font-medium">ankanbarik2004@gmail.com</p>
                </div>
              </div>
              <div className="detail-item flex items-center">
                <div className="icon w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-orange-400 mr-3">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Phone</h3>
                  <p className="font-medium">+91 7908840378</p>
                </div>
              </div>
              <div className="detail-item flex items-center">
                <div className="icon w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-orange-400 mr-3">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Experience</h3>
                  <p className="font-medium">Internship (Currently Ongoing)</p>
                </div>
              </div>
            </motion.div>

            <motion.button
              className="primary-btn px-8 py-3 bg-orange-400 hover:bg-orange-700 text-white rounded-full transition-all duration-300 text-base font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={handleDownloadCV}
            >
              <ArrowDown size={18} className="mr-2" /> Download CV
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
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

  {
    name: "Vite",
    level: 80,
    icon: (
      <img
        src="https://vitejs.dev/logo-with-shadow.png"
        alt="Vite"
        className="w-10 h-10"
      />
    ),
    color: "bg-violet-500",
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
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-teal-600">Skills</span>
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
          <h3 className="tech-skills-title text-2xl font-bold text-center text-gray-900 mb-12">Technologies I Work With</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Portfolio <span className="text-purple-600">Showcase</span></h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-4"></div>
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
            <button
              onClick={closeModal}
              className="modal-btn flex items-center justify-center px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl transition-colors w-full sm:w-auto"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Create form data object for the API
        const formObject = {
          access_key: "0eb99993-ac65-44fb-aa35-af2f3036bcab",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          subject: `Contact form submission from ${formData.firstName} ${formData.lastName}`
        };

        // Send the JSON data to the API
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formObject)
        });

        const data = await response.json();

        setIsLoading(false);
        if (data.success) {
          setFormStatus({
            submitted: true,
            success: true,
            message: 'Your message has been sent successfully! I will get back to you soon.'
          });

          toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I'll get back to you soon!",
            variant: "default"
          });

          // Reset form after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          setFormStatus({
            submitted: true,
            success: false,
            message: `Error: ${data.message || 'There was an error sending your message. Please try again.'}`
          });

          toast({
            title: "Error",
            description: "There was a problem sending your message. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsLoading(false);
        setFormStatus({
          submitted: true,
          success: false,
          message: 'There was an error sending your message. Please try again.'
        });

        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <section className="contact-section py-20 px-4">
      <div className="container mx-auto">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get In <span className="text-pink-600">Touch</span></h2>
          <div className="w-24 h-1 bg-pink-600 mx-auto mt-4"></div>
        </div>

        <div className="contact-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="contact-illustration hidden lg:block">
            <div className="animated-designer relative h-96">
              <div className="designer-container relative w-full h-full">
                <div className="designer-image absolute inset-0 bg-pink-200 rounded-xl overflow-hidden">
                  <img src="/assets/contact-illustration.svg" alt="Contact" className="w-full h-full object-cover" />
                </div>
                <div className="floating-element element-1 absolute top-10 right-10 w-12 h-12 bg-pink-400 rounded-full opacity-60 animate-float-slow"></div>
                <div className="floating-element element-2 absolute bottom-12 left-12 w-8 h-8 bg-blue-400 rounded-full opacity-60 animate-float-medium"></div>
                <div className="floating-element element-3 absolute top-1/4 left-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-float-fast"></div>
              </div>
            </div>
          </div>

          <div className="contact-form-container bg-pink-50 rounded-2xl shadow-xl p-8 md:p-10">
            <h3 className="form-title text-2xl font-bold text-gray-900 mb-8 text-center">Send Me a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="firstName" className="text-sm text-gray-600 mb-1 block">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-pink-500'} transition-colors focus:outline-none`}
                  />
                  {formErrors.firstName && <span className="error-text text-xs text-red-500 mt-1">{formErrors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="text-sm text-gray-600 mb-1 block">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-pink-500'} transition-colors focus:outline-none`}
                  />
                  {formErrors.lastName && <span className="error-text text-xs text-red-500 mt-1">{formErrors.lastName}</span>}
                </div>
              </div>

              <div className="form-row grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="email" className="text-sm text-gray-600 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-pink-500'} transition-colors focus:outline-none`}
                  />
                  {formErrors.email && <span className="error-text text-xs text-red-500 mt-1">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="text-sm text-gray-600 mb-1 block">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 1234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="message" className="text-sm text-gray-600 mb-1 block">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-pink-500'} transition-colors focus:outline-none resize-y`}
                ></textarea>
                {formErrors.message && <span className="error-text text-xs text-red-500 mt-1">{formErrors.message}</span>}
              </div>

              {formStatus.submitted && (
                <div
                  className={`form-message p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                >
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors focus:outline-none ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
