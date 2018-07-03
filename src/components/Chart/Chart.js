import React from "react";
import { connect } from "react-redux";
import { addToProfile } from "../../ducks/reducers/reducer";
import "./Chart.css";

const Chart = props => {
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

        <button onClick={() => props.addToProfile(props)} className="add-btn">
          <i className="fas fa-plus-square" />
          ADD
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { addToProfile }
)(Chart);
