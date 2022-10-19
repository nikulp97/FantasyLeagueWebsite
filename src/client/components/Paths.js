import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';
import { Members } from './Members';
import { Standings } from './Standings';
import Matchups from './Matchups';
const Paths = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/matchups" element={<Matchups />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Paths;
