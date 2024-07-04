import './App.css';

import React, { Component } from 'react'
// import Navbar from './components/Navbar';
import Newss from './components/Newss';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarWrapper from './components/NavbarWrapper';


export default class App extends Component {

  pageSize = 15;
  render() {
    return (
      <>
      <BrowserRouter>
      <NavbarWrapper/>
      {/*<Navbar/>*/}
        
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<Newss key='general' pageSize={this.pageSize} country='in' category='general'/>} />
        <Route exact path="/business" element={<Newss key='business' pageSize={this.pageSize} country='in' category='business'/>} />
        <Route exact path="/entertainment" element={<Newss key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>} />
        <Route exact path="/health" element={<Newss key='health' pageSize={this.pageSize} country='in' category='health'/>} />
        <Route exact path="/science" element={<Newss key='science' pageSize={this.pageSize} country='in' category='science'/>} />
        <Route exact path="/sports" element={<Newss key='sports' pageSize={this.pageSize} country='in' category='sports'/>} />
        <Route exact path="/technology" element={<Newss key='technology' pageSize={this.pageSize} country='in' category='technology'/>} />
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

