import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import Watch from './pages/Watch';
import Categories from './pages/Categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
