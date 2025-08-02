'use client';

import { useState } from 'react';
import { CheckIcon, DocumentTextIcon, CameraIcon, ClockIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Photo Inventory',
    description: 'Take photos of your fridge or receipts to automatically add items to your inventory.',
    icon: CameraIcon,
  },
  {
    name: 'Smart Meal Planning',
    description: 'Get personalized meal suggestions based on what you have and your preferences.',
    icon: ClockIcon,
  },
  {
    name: 'Recipe Discovery',
    description: 'Find new recipes tailored to your dietary preferences and available ingredients.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Waste Reduction',
    description: 'Minimize food waste with smart expiration tracking and usage suggestions.',
    icon: CheckIcon,
  },
];

const benefits = [
  'Save time with automated inventory management',
  'Discover new recipes based on what you have',
  'Reduce food waste with smart suggestions',
  'Plan meals efficiently for the week ahead',
  'Get nutritional insights for healthier eating',
  'Share shopping lists with family members',
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup flow
    console.log('Get started with email:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">🍽️ Munchies</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Meal Planning
            <span className="text-green-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take photos of your fridge and get personalized meal suggestions. 
            Reduce food waste, discover new recipes, and make cooking enjoyable again.
          </p>
          
          {/* Email Signup */}
          <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input flex-1"
                required
              />
              <button type="submit" className="btn-primary">
                Get Started
              </button>
            </div>
          </form>

          <div className="text-sm text-gray-500">
            Join thousands of families reducing food waste and eating better
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for smart meal planning
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you eat better and waste less
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="mx-auto h-12 w-12 text-green-600 mb-4">
                  <feature.icon className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why families love Munchies
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of families who are already saving time and reducing food waste.
              </p>
              <form onSubmit={handleGetStarted}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="form-input w-full"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Start Free Trial
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4 text-center">
                No credit card required. Free 14-day trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🍽️ Munchies</h3>
              <p className="text-gray-400">
                Smart meal planning and inventory management for busy families.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Mobile App</li>
                <li>Recipes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Community</li>
                <li>Status</li>
                <li>API</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Munchies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
