import './App.css';
import React from 'react';
import { NavigationBar } from './client/components/NavBar';
import Paths from './client/components/Paths';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Paths />
    </div>
  );
};

export default App;
