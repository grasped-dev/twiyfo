import React, { useState } from 'react';
import { Shell, RefreshCw } from 'lucide-react';

const facts = [
  "Oysters can change their gender multiple times. Talk about living your best life! 🏳️‍🌈",
  "A single oyster filters up to 50 gallons of water per day. Nature's Brita filter! 💧",
  "The world's largest oyster was 13.97 inches long. That's what she said! 😏",
  "Oysters have been around for 500 million years. Dinosaurs? Amateurs. 🦕",
  "Ancient Romans used oyster shells as ballots. First democracy, then delicacy! 🗳️",
  "Oysters are technically classified as vegetables in Louisiana. Identity crisis much? 🥬",
  "The phrase 'the world is your oyster' was coined by Shakespeare. Big Willy knew what's up! 📚",
  "Oysters can make pearls out of anything that irritates them. Same, tbh. 💅",
  "Some oysters can live up to 20 years. That's a lot of f*cking pearls! 👑",
  "Oysters have hearts that are striped. Fashionable AF from the inside out! ❤️",
];

export default function OysterFact() {
  const [currentFact, setCurrentFact] = useState(facts[Math.floor(Math.random() * facts.length)]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewFact = () => {
    setIsAnimating(true);
    const newFact = facts[Math.floor(Math.random() * facts.length)];
    setCurrentFact(newFact);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg h-full">
      <div className="flex items-start gap-3">
        <Shell className="h-6 w-6 text-pink-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm text-gray-300 mb-2">{currentFact}</p>
          <button
            onClick={getNewFact}
            className="flex items-center gap-2 text-pink-500 text-sm hover:text-pink-400 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
            Shuck another fact
          </button>
        </div>
      </div>
    </div>
  );
}