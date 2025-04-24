
import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Mail, MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#403E43] border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mentora-pink to-mentora-brightPink flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-mentora-pink via-mentora-blue to-mentora-brightPink bg-clip-text text-transparent">
                Mentora
              </span>
            </Link>
            <p className="text-mentora-subtext dark:text-gray-300 text-sm">
              Guiding you through your mental health journey with care and compassion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Home</Link>
              </li>
              <li>
                <Link to="/conditions" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Conditions</Link>
              </li>
              <li>
                <Link to="/assessment" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Assessment</Link>
              </li>
              <li>
                <Link to="/therapy" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Therapy</Link>
              </li>
              <li>
                <Link to="/community" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Community</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Blog</Link>
              </li>
              <li>
                <Link to="/faq" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 dark:text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-mentora-brightPink" />
                <span className="text-mentora-subtext dark:text-gray-300 text-sm">support@mentora.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-mentora-brightPink" />
                <span className="text-mentora-subtext dark:text-gray-300 text-sm">Chat with us</span>
              </li>
              <li className="flex items-center space-x-2">
                <HeartPulse size={16} className="text-mentora-brightPink" />
                <span className="text-mentora-subtext dark:text-gray-300 text-sm">24/7 Crisis Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mentora-subtext dark:text-gray-300 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Mentora. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Privacy</Link>
            <Link to="/terms" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Terms</Link>
            <Link to="/cookies" className="text-mentora-subtext dark:text-gray-300 hover:text-mentora-brightPink dark:hover:text-mentora-brightPink text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
