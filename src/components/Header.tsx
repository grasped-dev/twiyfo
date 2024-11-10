import React, { useState } from 'react';
import { Shell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-sm text-white z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shell className="h-8 w-8 text-pink-500" />
          <span className="font-bold text-xl">TWiYFO</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#find" className="hover:text-pink-500 transition-colors">Find Oysters</a>
          {user?.role === 'owner' && (
            <a href="#manage" className="hover:text-pink-500 transition-colors">Manage Restaurant</a>
          )}
          <a href="#top" className="hover:text-pink-500 transition-colors">Top Shucks</a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                {user.role === 'owner' ? user.businessName : user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full font-bold transition-colors"
            >
              Get Shucking
            </button>
          )}
        </nav>
        
        <button className="md:hidden bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full font-bold transition-colors">
          Menu
        </button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}