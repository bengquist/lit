import React from "react";
import "./Chart.css";

export default props => {
  const { artist, album, uri } = props;

  return (
    <div className="chart">
      <iframe
        src={`https://embed.spotify.com/?uri=${uri}`}
        frameBorder="0"
        height="80"
      />
      <div>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
      </div>
      <div className="toggle">
        <i className="fas fa-thumbs-up" />
        <i className="fas fa-thumbs-down" />

        <button className="add-btn">
          <i className="fas fa-plus-square" />
          ADD
        </button>
      </div>
    </div>
  );
};
