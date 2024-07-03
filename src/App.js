import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newss from './components/Newss';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
      <Navbar/>
        
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<Newss key='general' pageSize={10} country='in' category='general'/>} />
        <Route exact path="/business" element={<Newss key='business' pageSize={10} country='in' category='business'/>} />
        <Route exact path="/entertainment" element={<Newss key='entertainment' pageSize={10} country='in' category='entertainment'/>} />
        <Route exact path="/health" element={<Newss key='health' pageSize={10} country='in' category='health'/>} />
        <Route exact path="/science" element={<Newss key='science' pageSize={10} country='in' category='science'/>} />
        <Route exact path="/sports" element={<Newss key='sports' pageSize={10} country='in' category='sports'/>} />
        <Route exact path="/technology" element={<Newss key='technology' pageSize={10} country='in' category='technology'/>} />
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

