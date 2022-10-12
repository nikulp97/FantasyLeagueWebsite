import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';

const R = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="#" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default R;
