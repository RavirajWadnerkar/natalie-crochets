
import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, MessageSquare, Phone, TrendingUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <a href="mailto:ravirajtushar.wadnerkar@sjsu.edu">ravirajtushar.wadnerkar@sjsu.edu</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+12345678901">+1 234 567 890</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <address className="not-italic">
                  431 El Camino Real<br />
                  Santa Clara, CA 95050<br />
                  USA
                </address>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 10 AM - 6 PM</li>
              <li>Saturday: 10 AM - 3 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/nataliecrochets" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/nataliecrochets" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://tiktok.com/@nataliecrochets" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <TrendingUp className="h-6 w-6" aria-label="TikTok" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Natalie crochets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
