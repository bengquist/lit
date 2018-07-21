import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

export default class RelatedArtists extends Component {
  render() {
    const { uri, image, name, popularity } = this.props;

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
      <div>
        <img height="200" src={image} alt="" />
        <p>{name}</p>
        <p className="popularity">Popularity</p>
        <Progress
          style={{ margin: 0 }}
          percent={popularity}
          success={success}
          warning={warning}
          error={error}
          progress
        />

        <iframe src={uri} frameborder="0" />
      </div>
    );
  }
}
