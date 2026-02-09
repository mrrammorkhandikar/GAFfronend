'use client';

import React, { useState } from 'react';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const presetAmounts = [500, 1000, 2000, 5000, 10000];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation submitted:', { donationAmount, donationType, formData });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-[#fcf9e3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-poppins uppercase text-sm font-semibold tracking-widest text-[#D4A71C] mb-2">
              Make a Donation
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-[#222222] mb-6 font-playfair"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Support Creates Lasting Change
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
              Every contribution, no matter the size, helps us provide education, healthcare, 
              and hope to those who need it most. Join us in making a difference today.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Donation Options */}
            <div>
              <h2 className="text-2xl font-bold text-[#222222] mb-6 font-playfair">Choose Your Donation</h2>
              
              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#222222] mb-4 font-poppins">Donation Type</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors font-poppins ${
                      donationType === 'one-time' 
                        ? 'bg-[#FFD700] text-[#222222]' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    One-time
                  </button>
                  <button 
                    onClick={() => setDonationType('monthly')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors font-poppins ${
                      donationType === 'monthly' 
                        ? 'bg-[#FFD700] text-[#222222]' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#222222] mb-4 font-poppins">Select Amount</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`py-3 rounded-lg font-semibold transition-colors font-poppins ${
                        donationAmount === amount.toString()
                          ? 'bg-[#FFD700] text-[#222222]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-poppins">₹</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                  />
                </div>
              </div>

              {/* Impact Information */}
              <div className="bg-[#fcf9e3] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#222222] mb-4 font-playfair">Your Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-3"></div>
                    <span className="text-gray-700 font-poppins">₹500 can provide health check-ups for 2 children</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-3"></div>
                    <span className="text-gray-700 font-poppins">₹1000 can sponsor educational materials for 5 students</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-3"></div>
                    <span className="text-gray-700 font-poppins">₹2000 can fund a hygiene awareness session</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Donor Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#222222] mb-6 font-playfair">Your Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">PAN Number</label>
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] font-poppins"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#6D190D] text-white py-4 rounded-lg font-semibold hover:bg-[#8B2317] transition-colors font-poppins"
                  >
                    {donationAmount ? `Donate ₹${donationAmount}` : 'Make a Donation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-[#fcf9e3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#222222] mb-4 font-playfair">Secure Payment Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-poppins">
              We accept multiple payment methods to make your donation process convenient and secure.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl mb-2">💳</div>
              <div className="text-sm font-poppins">Credit Card</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl mb-2">🏦</div>
              <div className="text-sm font-poppins">Debit Card</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm font-poppins">UPI</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-2xl mb-2">NetBar</div>
              <div className="text-sm font-poppins">Net Banking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-6 font-playfair">Tax Benefits</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-poppins">
            All donations to Guru Akanksha Foundation are eligible for tax exemption under Section 80G of the Income Tax Act.
          </p>
          
          <div className="bg-[#fcf9e3] rounded-xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl mr-3">📋</div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#222222] font-playfair">Get Your 80G Certificate</h3>
                <p className="text-gray-600 font-poppins">We'll email your tax exemption certificate within 7 working days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;