import React from "react";





const Base = ({
  title = "Shorten URL",
  description = "ShortURL is a free tool to shorten URLs and generate short links, URL shortener allows to create a shortened link making it easy to share",
  history,
  className = "bg-dark text-white p-4",
  children,

}) => (
  <div>
    <div>
    <div className="container bg-dark text-white text-center border border-warning mt-5 p-5">
      <div className="jumbotron ">
        <h1>{title}</h1>
        <p>{description}</p>
        <br />
        <div className={className}>{children}</div>
      </div>
    </div>
  </div>
  </div>
);
export default Base;




