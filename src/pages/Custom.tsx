
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const Custom = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    itemType: "",
    colors: "",
    timeline: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-custom-order', {
        body: {
          ...formData,
          recipientEmail: "ravirajtushar.wadnerkar@sjsu.edu"
        }
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll get back to you soon about your custom order.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        itemType: "",
        colors: "",
        timeline: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 pt-20">
        <h1 className="text-4xl font-script text-primary-dark text-center mb-8">
          Custom Orders
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <p className="text-gray-600 mb-6">
            Want something unique? We'd love to create a custom piece just for you.
            Fill out the form below to get started.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <Input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <Input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number (Optional)
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What type of item are you looking for? *
              </label>
              <textarea
                required
                name="itemType"
                value={formData.itemType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                rows={3}
                placeholder="Describe your dream piece..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color preferences
              </label>
              <Input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="e.g., Earth tones, pastels, bright colors..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Timeline
              </label>
              <Input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="When do you need it by?"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Custom;
