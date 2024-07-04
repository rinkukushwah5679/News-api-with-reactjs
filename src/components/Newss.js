import React, { Component } from 'react';
import NewsItems from './NewsItems';
import { NEWS_API_KEY } from '../config';
import Spinner from './Spinner';
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

  constructor() {
    super();
    this.state = {
      articles: [],
      error: null,
      isLoading: false,
      page: 1,
    };
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

  handelPreClick = async () => {
    this.setState(
      (state) => ({ page: state.page - 1 }),
      this.updateNews
    );
  };

  handelNextClick = async () => {
    this.setState(
      (state) => ({ page: state.page + 1 }),
      this.updateNews
    );
  };

  render() {
    const { error, isLoading, articles } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey -- Top Headlines</h1>
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
        <div className="container d-flex justify-content-between my-2">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handelPreClick}> &larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handelNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default Newss;
