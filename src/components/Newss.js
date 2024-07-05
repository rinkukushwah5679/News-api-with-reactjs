import React, { Component } from 'react';
import NewsItems from './NewsItems';
import { NEWS_API_KEY } from '../config';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      error: null,
      isLoading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.setState({ isLoading: true });
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      this.setState({
        articles: data.articles,
        isLoading: false,
        totalResults: data.totalResults,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      this.setState({
        articles: this.state.articles.concat(data.articles),
        totalResults: data.totalResults,
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  // handelPreClick = async () => {
  //   this.setState(
  //     (state) => ({ page: state.page - 1 }),
  //     this.updateNews
  //   );
  // };

  // handelNextClick = async () => {
  //   this.setState(
  //     (state) => ({ page: state.page + 1 }),
  //     this.updateNews
  //   );
  // };

  render() {
    const { error, isLoading, articles, totalResults } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <>
        <h1 className="text-center my-4">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {isLoading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={articles.length < totalResults && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div key={element.url} className="col-md-4 my-1">
                  <NewsItems 
                    title={element.title || ""} 
                    description={element.description ? element.description.slice(0, 88) : ""} 
                    imageUrl={element.urlToImage || "https://blog.roboflow.com/content/images/size/w1200/2023/03/launch-new-api-cli.jpg"} 
                    newsUrl={element.url} 
                    author={element.author} 
                    data={element.publishedAt} 
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between my-2">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handelPreClick}> &larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handelNextClick}>Next &rarr; </button>
        </div>*/}
      </>
    );
  }
}

export default Newss;
