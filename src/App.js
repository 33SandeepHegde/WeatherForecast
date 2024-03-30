import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WeatherDetails from './components/WeatherDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather-details/:city/:country" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
