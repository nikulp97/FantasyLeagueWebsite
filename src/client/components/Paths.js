import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';
import { Members } from './Members';
import { Standings } from './Standings';
const Paths = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Paths;
