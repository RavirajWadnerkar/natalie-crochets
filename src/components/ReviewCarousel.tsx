
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "Absolutely love my handmade crochet scarf! So soft and beautifully crafted.",
    author: "Emma L."
  },
  {
    id: 2,
    text: "The cutest crochet plushies ever! They make the perfect gifts.",
    author: "Raviraj W."
  },
  {
    id: 3,
    text: "High-quality, unique, and made with love. Will order again!",
    author: "Sophia D."
  },
  {
    id: 4,
    text: "The attention to detail is amazing. Each piece feels so special.",
    author: "Michael R."
  },
  {
    id: 5,
    text: "Found my new favorite crochet shop! Everything is perfect.",
    author: "Linda K."
  },
  {
    id: 6,
    text: "Such beautiful work! The colors are even prettier in person.",
    author: "David M."
  },
  {
    id: 7,
    text: "Exceptional quality and fantastic customer service!",
    author: "Sarah P."
  },
  {
    id: 8,
    text: "These pieces are true works of art. Worth every penny!",
    author: "James B."
  },
  {
    id: 9,
    text: "My baby loves the crochet mobile. It's both beautiful and durable.",
    author: "Anna T."
  }
];

const ReviewCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!isAnimating) {
        nextPage();
      }
    }, 5000);
    
    return () => clearInterval(autoScroll);
  }, [isAnimating]);

  const nextPage = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const prevPage = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const getCurrentReviews = () => {
    return reviews.slice(
      currentPage * reviewsPerPage,
      (currentPage + 1) * reviewsPerPage
    );
  };

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-script text-center text-primary-dark mb-12">
          Customer Reviews
        </h2>
        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="relative"
          >
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out"
              style={{ 
                opacity: isAnimating ? 0.6 : 1,
                transform: isAnimating ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              {getCurrentReviews().map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"
                >
                  <p className="text-gray-600 italic mb-4 flex-grow">"{review.text}"</p>
                  <p className="text-primary-dark font-semibold">- {review.author}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={isAnimating}
              className="rounded-full hover:bg-primary/20 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2 items-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span 
                  key={index}
                  className={`block w-2 h-2 rounded-full transition-all ${
                    currentPage === index ? 'bg-primary w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={isAnimating}
              className="rounded-full hover:bg-primary/20 transition-all"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
