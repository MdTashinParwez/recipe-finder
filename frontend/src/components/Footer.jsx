import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0b1220] to-[#0e1a2b] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🍳 RecipeHub
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Discover, create, and share amazing recipes with our
              community-powered platform and AI assistance.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <Icon><Facebook size={18} /></Icon>
              <Icon><Twitter size={18} /></Icon>
              <Icon><Instagram size={18} /></Icon>
              <Icon><Youtube size={18} /></Icon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Community Recipes</li>
              <li>AI Suggest</li>
              <li>Create Recipe</li>
              <li>About Us</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>Main Course</li>
              <li>Desserts</li>
              <li>Salads</li>
              <li>Appetizers</li>
              <li>Breakfast</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-400 mt-1" />
                123 Recipe Street, Food City, FC 12345
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-400" />
                hello@recipehub.com
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} RecipeHub. All rights reserved.  
          <span className="block mt-1">
            Created by <span className="text-white font-medium">Tashin</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

const Icon = ({ children }) => (
  <div className="p-2 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white transition cursor-pointer">
    {children}
  </div>
);

export default Footer;
