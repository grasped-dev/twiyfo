import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OysterCard from './components/OysterCard';
import Footer from './components/Footer';
import AwardsSection from './components/AwardsSection';
import { Toaster } from 'react-hot-toast';
import { PlaceResult } from './utils/googlePlacesService';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);

  const handleSearch = (query: string, places: PlaceResult[]) => {
    setSearchQuery(query);
    setSearchResults(places);
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-center" />
      <Header />
      
      {/* Hero with Search */}
      <Hero onSearch={handleSearch} />
      
      {/* Search Results */}
      {searchQuery && (
        <div className="container mx-auto px-4 -mt-20 mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              Showing oyster bars near {searchQuery}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {searchResults.map((place, index) => (
                <OysterCard
                  key={index}
                  name={place.name}
                  location={place.address}
                  image={place.photos[0] || "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80"}
                  rating={{
                    pearls: Math.round(place.rating),
                    slurpFactor: Math.round(Math.random() * 2 + 3), // Placeholder
                    presentation: Math.round(Math.random() * 2 + 3) // Placeholder
                  }}
                  category={place.priceLevel ? "💰".repeat(place.priceLevel) : "Local Favorite"}
                  description={`Contact: ${place.phoneNumber || 'Not available'}${place.website ? ` • ${place.website}` : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Awards Section */}
      <AwardsSection />
      
      <Footer />
    </div>
  );
}