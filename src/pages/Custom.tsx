
import Navbar from "@/components/Navbar";

const Custom = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-script text-primary-dark text-center mb-8">
          Custom Orders
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <p className="text-gray-600 mb-6">
            Want something unique? We'd love to create a custom piece just for you.
            Fill out the form below to get started.
          </p>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                What type of item are you looking for?
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                rows={3}
                placeholder="Describe your dream piece..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color preferences
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="e.g., Earth tones, pastels, bright colors..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Timeline
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="When do you need it by?"
              />
            </div>
            <button
              type="submit"
              className="w-full button-primary"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Custom;
