import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { NEWS_API_KEY } from '../config';
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export class Newss extends Component {

  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8,
  };
  
  constructor(){
    super()
    this.state = {
      articles: [],
      error: null,
      isLoading: false,
      page: 1
    }
  }

  async componentDidMount() {
    await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${NEWS_API_KEY}&page=1&pageSize=${this.props.pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles, isLoading: false, totalResults: data.totalResults });
      })
      .catch((error) => {
        this.setState({ error: error, isLoading: false });
      });
  }

  handelPreClick = async () =>{
    this.setState({ isLoading: true})
    await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles, isLoading: false, page: this.state.page - 1 });
        this.setState({ isLoading: false})
      })
      .catch((error) => {
        this.setState({ error: error, isLoading: false });
      });
  }
  handelNextClick = async () =>{
    if ((this.state.page + 1) > Math.ceil(this.state.totalResults/this.props.pageSize)){
    }
    else{
      this.setState({ isLoading: true})
      await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles, isLoading: false, page: this.state.page + 1 });
        this.setState({ isLoading: false})
      })
      .catch((error) => {
        this.setState({ error: error, isLoading: false });
      });
    }
  }

  render() {
    const { error, isLoading } = this.state;
    if (isLoading) {
        return <Spinner />
      }
  
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    return (
      <div className='container my-3'>
      <h1 className="text-center">NewsMonkey -- Top Headlines</h1>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div key={element.url} className='col-md-3 my-1'>
              <NewsItems title= {element.title?element.title: ""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage?element.urlToImage:"https://blog.roboflow.com/content/images/size/w1200/2023/03/launch-new-api-cli.jpg"} newsUrl={element.url}/>
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between my-2'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handelPreClick}> &larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handelNextClick}>Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default Newss
