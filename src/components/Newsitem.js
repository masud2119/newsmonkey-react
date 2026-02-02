import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, source } = this.props;

    return (
      <div className="card my-3">
        <span className="badge bg-danger">{source}</span>
        <img src={imageUrl || "https://via.placeholder.com/300"} className="card-img-top" alt="" />
        <div className="card-body">
          <h5>{title}</h5>
          <p>{description}</p>
          <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
