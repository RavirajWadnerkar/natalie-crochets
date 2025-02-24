
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const stripePromise = loadStripe("pk_test_51OxySpE0r1bS9AxzCjQaDEE36Xi0VOdKhSqy1J8Wj4w0DFVFpvpIV9Kn4Pgb2yPl5ZjsVwDjxXatcbKD5hZrfZ8M00k0fC8rKF");

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize.");

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { items: state.items }
      });

      if (error) throw error;

      const result = await stripe.redirectToCheckout({
        sessionId: data.session_id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      console.error('Error in checkout:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Something went wrong during checkout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-5 w-5" />
        {state.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {state.items.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shopping Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {state.items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between space-x-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
