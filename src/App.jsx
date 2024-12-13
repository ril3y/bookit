import React, { useState, useEffect } from 'react';
import MindMap from './components/mindmap/MindMap';
import StoryEditor from './components/editor/StoryEditor';
import ChapterTimeline from './components/timeline/ChapterTimeline';
import AIAssistant from './components/ai/AIAssistant';
import LLMTerminal from './components/terminal/LLMTerminal';
import Details from './components/details/Details'; // Import the Details component
import './App.css';

const App = () => {
  const [activeView, setActiveView] = useState('details'); // Set default view to 'details'
  const [showTerminal, setShowTerminal] = useState(false);
  const [llmConfig, setLlmConfig] = useState(() => {
    const savedConfig = localStorage.getItem('llmConfig');
    return savedConfig ? JSON.parse(savedConfig) : null;
  });

  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    genre: '',
    description: ''
  });

  const updateBookDetails = (details) => {
    setBookDetails(details);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '`' || event.key === '~') {
        event.preventDefault();
        setShowTerminal(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="app-container">
      <LLMTerminal 
        isVisible={showTerminal} 
        config={llmConfig} 
      />
    
      <nav className="sidebar">
        <div className="logo">Bookit</div>
        <ul className="nav-items">
          <li 
            className={activeView === 'details' ? 'active' : ''} 
            onClick={() => setActiveView('details')}
          >
            Details
          </li>
          <li 
            className={activeView === 'mindmap' ? 'active' : ''} 
            onClick={() => setActiveView('mindmap')}
          >
            Mind Map
          </li>
          <li 
            className={activeView === 'editor' ? 'active' : ''} 
            onClick={() => setActiveView('editor')}
          >
            Editor
          </li>
          <li 
            className={activeView === 'timeline' ? 'active' : ''} 
            onClick={() => setActiveView('timeline')}
          >
            Timeline
          </li>
          <li 
            className={activeView === 'ai' ? 'active' : ''} 
            onClick={() => setActiveView('ai')}
          >
            AI Assistant
          </li>
        </ul>
      </nav>
    
      <main className="main-content">
        <header className="top-bar">
          <h1>My Story Project</h1>
          <div className="user-controls">
            <button className="save-btn">Save</button>
            <button className="profile-btn">Profile</button>
          </div>
        </header>
      
        <div className="content-area">
          {activeView === 'details' && (
            <Details bookDetails={bookDetails} updateBookDetails={updateBookDetails} />
          )}
          {activeView === 'mindmap' && <MindMap />}
          {activeView === 'editor' && <StoryEditor />}
          {activeView === 'timeline' && <ChapterTimeline />}
          {activeView === 'ai' && <AIAssistant config={llmConfig} onConfigChange={setLlmConfig} />}
        </div>
      </main>
    </div>
  );
}

export default App;