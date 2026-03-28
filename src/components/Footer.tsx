import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_pb95pfl",
      "template_1j8gosd",
      {
        name: "Newsletter Subscriber",
        email: email,
        message: "Subscribed to newsletter"
      },
      "uFXr8GkGiYtAjMkSc"
    )
    .then(() => {
      setMessage("Subscribed successfully!");
      setEmail("");
    })
    .catch((error) => {
      console.log(error);
      setMessage("Subscription failed");
    });
  };

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
              Building innovative digital experiences with modern technologies.
            </p>

            <div className="flex space-x-3">

              <a href="https://linkedin.com/in/aankan-barik/" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-600">
                <Linkedin size={16}/>
              </a>

              <a href="https://github.com/ankan-barik" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full hover:bg-gray-600">
                <Github size={16}/>
              </a>

              <a href="https://instagram.com/aaankannn" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full hover:bg-pink-600">
                <Instagram size={16}/>
              </a>

              <a href="https://x.com/aaankannn" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full hover:bg-sky-500">
                <Twitter size={16}/>
              </a>

              <a href="mailto:ankanbarik2004@gmail.com" className="w-8 h-8 bg-gray-800 flex items-center justify-center rounded-full hover:bg-green-500">
                <Mail size={16}/>
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2">

              <li>
                <a href="#home-section" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#about-section" className="text-gray-300 hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#skills-section" className="text-gray-300 hover:text-white">
                  Skills
                </a>
              </li>

              <li>
                <a href="#portfolio-section" className="text-gray-300 hover:text-white">
                  Portfolio
                </a>
              </li>

              <li>
                <a href="#contact-section" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Contact Info */}
          <div>

            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <ul className="space-y-3">

              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-blue-400"/>
                Bhubaneswar, Odisha, India
              </li>

              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400"/>
                +91 7908840378
              </li>

              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400"/>
                ankanbarik2004@gmail.com
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div>

            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>

            <p className="text-gray-300 mb-4">
              Subscribe to receive updates about my projects.
            </p>

            <form onSubmit={handleSubscribe} className="flex">

              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="px-2 py-2 flex-1 bg-gray-800 text-white rounded-l-md"
              />

              <button
                type="submit"
                className="px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md"
              >
                Subscribe
              </button>

            </form>

            {message && (
              <p className="text-green-400 mt-2 text-sm">
                {message}
              </p>
            )}

          </div>

        </div>

        <hr className="my-8 border-gray-700"/>

        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Ankan Barik. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;