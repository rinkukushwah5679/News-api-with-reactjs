import React, { Component } from 'react'
import loading from '../spinner.gif'
import "../Spinner.css";

export class Spinner extends Component {
	render() {
		return (
			// #this code for loader is screen center
			// <div className="loading-container">
      //   <img src={loading} alt="loading" />
      // </div>

      <div className="text-center">
        <img className="my-3" src={loading} alt="loading" />
      </div>
		)
	}
}

export default Spinner