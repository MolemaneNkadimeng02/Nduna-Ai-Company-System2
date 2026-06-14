import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import AgentMonitor from './pages/AgentMonitor';
import CommandCentres from './pages/CommandCentres';
import IntelligenceHub from './pages/IntelligenceHub';
import OperationsSuite from './pages/OperationsSuite';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/agent" element={<AgentMonitor />} />
            <Route path="/command-centres" element={<CommandCentres />} />
            <Route path="/intelligence" element={<IntelligenceHub />} />
            <Route path="/operations" element={<OperationsSuite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
