
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Index = () => {
  useEffect(() => {
    // Add meta tag to hide Lovable badge
    const meta = document.createElement('meta');
    meta.name = 'lovable-badge';
    meta.content = 'false';
    document.head.appendChild(meta);
    
    return () => {
      // Clean up on unmount
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Index;
