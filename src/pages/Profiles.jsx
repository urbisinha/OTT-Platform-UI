import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { motion } from 'framer-motion';

export default function Profiles() {
  const { profiles, setProfile } = useGlobal();
  const navigate = useNavigate();

  const handleProfileSelect = (profile) => {
    setProfile(profile);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-netflix-dark flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 p-8">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className="h-8 md:h-12"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-white text-3xl md:text-5xl font-medium mb-8">Who's watching?</h1>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {profiles.map((profile) => (
            <motion.div 
              key={profile.id}
              whileHover={{ scale: 1.05 }}
              className="group flex flex-col items-center gap-3 cursor-pointer w-24 md:w-32"
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-colors">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-400 group-hover:text-white transition-colors text-sm md:text-lg">
                {profile.name}
              </span>
            </motion.div>
          ))}
          
          {/* Add Profile Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="group flex flex-col items-center gap-3 cursor-pointer w-24 md:w-32"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-md flex items-center justify-center border-2 border-transparent group-hover:bg-white group-hover:text-black transition-colors text-gray-400 text-5xl">
              +
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors text-sm md:text-lg">
              Add Profile
            </span>
          </motion.div>
        </div>

        <button className="mt-12 px-6 py-2 border border-gray-500 text-gray-500 hover:text-white hover:border-white transition-colors tracking-widest uppercase text-sm">
          Manage Profiles
        </button>
      </motion.div>
    </div>
  );
}
