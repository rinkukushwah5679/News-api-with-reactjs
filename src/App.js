import './App.css';

import React, { Component } from 'react'
// import Navbar from './components/Navbar';
import Newss from './components/Newss';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarWrapper from './components/NavbarWrapper';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  pageSize = 5;
  state = {
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress: progress});
  }
  render() {
    return (
      <>

      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
      <NavbarWrapper/>
      {/*<Navbar/>*/}
        
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<Newss setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='us' category='general'/>} />
        <Route exact path="/business" element={<Newss setProgress={this.setProgress} key='business' pageSize={this.pageSize} country='us' category='business'/>} />
        <Route exact path="/entertainment" element={<Newss setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country='us' category='entertainment'/>} />
        <Route exact path="/health" element={<Newss setProgress={this.setProgress} key='health' pageSize={this.pageSize} country='us' category='health'/>} />
        <Route exact path="/science" element={<Newss setProgress={this.setProgress} key='science' pageSize={this.pageSize} country='us' category='science'/>} />
        <Route exact path="/sports" element={<Newss setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country='us' category='sports'/>} />
        <Route exact path="/technology" element={<Newss setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country='us' category='technology'/>} />
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

