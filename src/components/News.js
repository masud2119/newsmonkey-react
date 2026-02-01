import React, { Component } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "business",
    pageSize: 5,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    // Initial load → NO spinner
    this.fetchNews(false);
  }

  fetchNews = async (showLoader = true) => {
    if (showLoader) {
      this.setState({ loading: true });
    }

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bbf9b31ed61408d81522f41dcf80f72&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false });
    }
  };

  handlePrevClick = async () => {
    if (this.state.page <= 1) return;
    await this.setState({ page: this.state.page - 1 });
    this.fetchNews(true); // spinner ON
  };

  handleNextClick = async () => {
    if (
      this.state.page >=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    )
      return;

    await this.setState({ page: this.state.page + 1 });
    this.fetchNews(true); // spinner ON
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top Business Headlines</h2>

        {/* Spinner ONLY on navigation */}
        {this.state.loading && <Spinner />}
          

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author || "Unknown"}
                  date={article.publishedAt}
                  source={article.source?.name || "Unknown"}
                />
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1 || this.state.loading}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            ← Previous
          </button>

          <button
            disabled={
              this.state.loading ||
              this.state.page >=
                Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

export default News;
