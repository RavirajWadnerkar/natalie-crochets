
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-script text-primary-dark text-center mb-8">
            Contact Us
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Tell us your crochet dreams!"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>hello@crochetshop.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+1 234 567 890</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>431 El Camino Real<br />Santa Clara, CA 95050<br />USA</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p>Monday - Friday: 10 AM - 6 PM<br />
                       Saturday: 10 AM - 3 PM<br />
                       Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
