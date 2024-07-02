import React, { Component } from 'react'
import loading from '../spinner.gif'
import "../Spinner.css";

export class Spinner extends Component {
	render() {
		return (
			<div className="loading-container">
        <img src={loading} alt="loading" />
      </div>
		)
	}
}

export default Spinner