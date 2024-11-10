import React from 'react';
import { Shell, Github, Twitter } from 'lucide-react';
import OysterFact from './OysterFact';
import MemeOfTheDay from './MemeOfTheDay';
import UserStats from './UserStats';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        {/* Fun Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <UserStats />
          </div>
          <div className="md:col-span-2">
            <MemeOfTheDay />
          </div>
          <div className="md:col-span-1">
            <OysterFact />
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shell className="h-6 w-6 text-pink-500" />
              <span className="font-bold text-white">TWiYFO</span>
            </div>
            <p className="text-sm">Making the world your f*cking oyster, one slurp at a time.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#find" className="hover:text-pink-500 transition-colors">Find Oysters</a></li>
              <li><a href="#submit" className="hover:text-pink-500 transition-colors">Add a Spot</a></li>
              <li><a href="#top" className="hover:text-pink-500 transition-colors">Top Shucks</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#bougie" className="hover:text-pink-500 transition-colors">Most Bougie</a></li>
              <li><a href="#date" className="hover:text-pink-500 transition-colors">First Date Spots</a></li>
              <li><a href="#huge" className="hover:text-pink-500 transition-colors">F*cking Huge Only</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} The World is Your F*cking Oyster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}