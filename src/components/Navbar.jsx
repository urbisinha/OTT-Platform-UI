import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile, setProfile } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setProfile(null);
    navigate('/profiles');
  };

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-netflix-dark' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix Logo" 
              className="h-6 md:h-8 object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-300">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-white transition-colors">TV Shows</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Movies</Link>
            <Link to="/categories" className="hover:text-white transition-colors">New & Popular</Link>
            <Link to="/categories" className="hover:text-white transition-colors">My List</Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-white">
          <Search className="w-5 h-5 cursor-pointer hidden sm:block" />
          <Bell className="w-5 h-5 cursor-pointer hidden sm:block" />
          
          <div className="relative group cursor-pointer flex items-center gap-2">
            <img 
              src={profile?.avatar || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} 
              alt="Profile" 
              className="w-8 h-8 rounded"
            />
            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-gray-800 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible flex flex-col">
              <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                <img src={profile?.avatar} alt="" className="w-8 h-8 rounded" />
                <span className="text-sm font-medium">{profile?.name}</span>
              </div>
              <button 
                onClick={() => navigate('/profiles')}
                className="text-left px-4 py-3 text-sm hover:underline"
              >
                Manage Profiles
              </button>
              <button 
                onClick={handleLogout}
                className="text-left px-4 py-3 text-sm hover:underline border-t border-gray-800"
              >
                Sign out of Netflix
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
