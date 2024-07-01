import React, { Component } from 'react'

export class NewsItems extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: '17rem'}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title.slice(0, 40)}{(title.length > 40) ? '...' : ''}</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} className="btn btn-sm btn-primary" target='_blank'>Details</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
