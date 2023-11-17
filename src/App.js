import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";
import Nav from './Components/Nav';
import Movie from './Components/Movie';
import Home from './Components/Home';
import "./style.css";
function App() {
  

  return (
    
  <div className="app">
    <Router>
      <Nav/>
      
      <Routes>
      <Route path="/" element={<Home/>}/> 
       <Route path="/view-movie" element={<Movie/>}/>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
