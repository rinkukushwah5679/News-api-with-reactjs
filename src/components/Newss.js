import React, { Component } from 'react';
import NewsItems from './NewsItems';
import { NEWS_API_KEY } from './../config';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class Newss extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
  };

  static defaultProps = {
    country: 'us',
    category: 'general',
    pageSize: 8,
    setProgress: () => {},
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
      showScrollToTop: false,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({ isLoading: true });
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
    this.props.setProgress(30);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      this.props.setProgress(70);
      this.setState({
        articles: data.articles,
        isLoading: false,
        totalResults: data.totalResults,
      });
      this.props.setProgress(100);
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  async componentDidMount() {
    this.updateNews();
    window.addEventListener('scroll', this.toggleScrollToTopButton);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleScrollToTopButton);
  }

  toggleScrollToTopButton = () => {
    if (window.pageYOffset > 300) {
      this.setState({ showScrollToTop: true });
    } else {
      this.setState({ showScrollToTop: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  fetchMoreData = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      async () => {
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
      }
    );
  };

  render() {
    const { error, isLoading, articles, totalResults, showScrollToTop } = this.state;

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
              {articles.map((element, index) => (
                <div key={`${element.url}-${index}`} className="col-md-4 my-1">
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
        {showScrollToTop && (
          <button
            onClick={this.scrollToTop}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              padding: '10px 15px',
              cursor: 'pointer',
              zIndex: 1000,
            }}
          >
            ↑
          </button>
        )}
      </>
    );
  }
}

export default Newss;
