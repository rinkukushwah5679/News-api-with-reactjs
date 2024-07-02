import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { NEWS_API_KEY } from '../config';

export class Newss extends Component {
  
  constructor(){
    super()
    this.state = {
      articles: [],
      error: null,
      isLoading: false
    }
  }

  async componentDidMount() {
    await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error, isLoading: false });
      });
  }

  render() {
    const { articles, error, isLoading } = this.state;
    if (isLoading) {
        return <div>Loading...</div>;
      }
  
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    return (
      <div className='container my-3'>
      <h2>NewsMonkey -- Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div key={element.url} className='col-md-3'>
              <NewsItems title= {element.title?element.title: ""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage?element.urlToImage:"https://blog.roboflow.com/content/images/size/w1200/2023/03/launch-new-api-cli.jpg"} newsUrl={element.url}/>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Newss
