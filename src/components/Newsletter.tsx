const Newsletter = () => {
  return (
    <section className="bg-green-50 py-14 px-4">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-green-700 mb-3">
          Get Exclusive Loan Offers & Finance Updates
        </h2>

        <p className="text-gray-600 mb-8">
          Get loan offers, EMI tips, credit card deals & smart finance updates directly in your inbox.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 rounded-full px-6 py-4 shadow-sm outline-none"
          />

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 font-semibold shadow-md hover:scale-105 transition-all duration-300 rounded-full font-medium"
          >
            Subscribe
          </button>

        </div>
<p className="text-sm text-gray-500 mt-4">
  🔒 No spam. Only useful finance updates.
</p>
      </div>

    </section>
    
  );
};

export default Newsletter;