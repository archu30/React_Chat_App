import React from 'react';
import './App.css';
import ChatApp from './components/ChatApp';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">

      <Navbar />
      <ChatApp />
    </div>
  );
}

export default App;
