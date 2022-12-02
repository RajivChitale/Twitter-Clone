import React from 'react';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import Home from './components/Home.js'
import Explore from './components/Explore.js';
import Messages from './components/Messages.js';
import Profile from './components/Profile.js';
import Bookmarks from './components/Bookmarks.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Reply from './components/Reply.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Bookmarks" element={<Bookmarks />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Reply/:postid" element={<Reply />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
