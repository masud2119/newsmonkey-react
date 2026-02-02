import React, { Component } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true });

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9bbf9b31ed61408d81522f41dcf80f72`;

      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        articles: data.articles || [],
        loading: false,
      });
    } catch (error) {
      console.error("API Error:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className="container my-3">
        {/* ✅ Dynamic heading */}
        <h2 className="text-center">
          Top {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)} Headlines
        </h2>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles
              .filter((article) => article && article.title)
              .map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author || "Unknown"}
                    date={article.publishedAt}
                    source={article.source?.name || "Unknown"}
                  />
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default News;
