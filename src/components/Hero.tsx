
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ProductShowcase from "./ProductShowcase";
import ReviewCarousel from "./ReviewCarousel";
import Footer from "./Footer";

const Hero = () => {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-[70vh] flex items-center justify-center bg-accent/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-primary-dark mb-6 animate-fade-in">
            Beautiful Handmade Crochet, Made Just for You
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
            Discover unique, handcrafted crochet pieces made with care and attention to detail.
            Each item tells a story and brings warmth to your home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Link
              to="/shop"
              className="button-primary inline-flex items-center group"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/custom"
              className="button-secondary"
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </div>

      <ProductShowcase />
      <ReviewCarousel />
      <Footer />
    </div>
  );
};

export default Hero;
