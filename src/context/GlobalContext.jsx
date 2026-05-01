import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('netflix_profile', null);
  const [profiles, setProfiles] = useLocalStorage('netflix_profiles', [
    { id: 1, name: 'User 1', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    { id: 2, name: 'Kids', avatar: 'https://pro2-bar-s3-cdn-cf.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/877ad1ce3a479ef9498e1efc_rw_600.png?h=794db6a6ae01c539fdfb7ad5e5a89589' }
  ]);
  const [watchProgress, setWatchProgress] = useLocalStorage('netflix_progress', {}); // { movieId: progress }
  
  const value = {
    profile,
    setProfile,
    profiles,
    setProfiles,
    watchProgress,
    setWatchProgress
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
