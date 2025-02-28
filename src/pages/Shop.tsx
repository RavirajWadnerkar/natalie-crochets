
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock_quantity: number;
}

const mockProducts = [
  {
    id: "1",
    name: "Baby Booties",
    description: "Adorable booties for your little one",
    price: 24.99,
    images: ["/lovable-uploads/d2170950-9a3f-4451-b2d3-6618b40a09d4.png"],
    stock_quantity: 15
  },
  {
    id: "2",
    name: "Winter Blanket",
    description: "Handmade with soft merino wool",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901"],
    stock_quantity: 8
  },
  {
    id: "3",
    name: "Cushion Cover",
    description: "Beautiful handcrafted cushion cover",
    price: 35.99,
    images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"],
    stock_quantity: 20
  },
  {
    id: "4",
    name: "Flower Pot Holder",
    description: "Decorative crochet pot holder",
    price: 19.99,
    images: ["https://images.unsplash.com/photo-1459411552884-841db9b3cc2a"],
    stock_quantity: 12
  },
  {
    id: "5",
    name: "Mudkip Toy",
    description: "Adorable crochet Mudkip plushie",
    price: 42.99,
    images: ["https://images.unsplash.com/photo-1535759561784-5973ce7be8b9"],
    stock_quantity: 5
  }
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*");
        
        if (error) {
          console.error("Error fetching products:", error);
          // Fall back to mock data if the API fails
          setProducts(mockProducts);
          return;
        }

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Use mock data if no products returned
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error("Error:", error);
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 pt-24">
        <h1 className="text-4xl font-script text-primary-dark text-center mb-8">
          Our Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold mt-2">${product.price}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
