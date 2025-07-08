
import React from 'react';
import { Github, Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-400">A</span>
              <span className="text-purple-400">n</span>
              <span className="text-pink-400">k</span>
              <span className="text-red-400">a</span>
              <span className="text-orange-400">n</span>
              <span className="text-white mx-1">•</span> 
              <span className="text-yellow-400">B</span>
              <span className="text-green-400">a</span>
              <span className="text-teal-400">r</span>
              <span className="text-cyan-400">i</span>
              <span className="text-sky-400">k</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Building innovative digital experiences with modern technologies. Let's collaborate to bring your ideas to life.
            </p>
            <div className="social-links flex space-x-3">
              <a href="https://linkedin.com/in/aankan-barik/" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/ankan-barik" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <Github size={16} />
              </a>
              <a href="https://instagram.com/aaankannn" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={16} />
              </a>
              <a href="https://x.com/aaankannn" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home-section" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about-section" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#skills-section" className="text-gray-300 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#portfolio-section" className="text-gray-300 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#contact-section" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400" />
                <span className="text-gray-300">Bhubaneswar, Odisha, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400" />
                <span className="text-gray-300">+91 7908840378</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <span className="text-gray-300">ankanbarik2004@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to receive updates about my latest projects and tech articles.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-2 py-2 rounded-l-md flex-1 bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button type="submit" className="px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <hr className="my-8 border-gray-700" />
        
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ankan Barik. All rights reserved.</p>
          <p className="mt-2">Designed and developed by Ankan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
