import React, { Component } from "react";
import { Progress } from "semantic-ui-react";
import "./RelatedArtists.css";

export default class RelatedArtists extends Component {
  render() {
    const { uri, image, name, popularity } = this.props;
    const song = `https://open.spotify.com/embed?uri=${uri}`;

    let error = false;
    let warning = false;
    let success = false;

    if (popularity >= 80) {
      error = false;
      warning = false;
      success = true;
    } else if (popularity < 80 && popularity > 40) {
      error = false;
      warning = true;
      success = false;
    } else {
      error = true;
      warning = false;
      success = false;
    }

    return (
      <div className="related-artist-single">
        <img
          onClick={() => console.log(song.play())}
          height="200"
          src={image}
          alt=""
        />
        <p className="related-name">{name}</p>
        <p className="popularity">Popularity</p>
        <Progress
          style={{ margin: 0 }}
          percent={popularity}
          success={success}
          warning={warning}
          error={error}
          progress
        />
        <iframe
          style={{ margin: "20px 0 20px 0" }}
          height="80"
          src={song}
          frameborder="0"
        />
      </div>
    );
  }
}
