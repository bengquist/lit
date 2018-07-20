import React, { Component } from "react";
import { connect } from "react-redux";
import { addToProfile } from "../../ducks/reducers/reducer";
import { withAlert } from "react-alert";
import "./Chart.css";

import {
  Form,
  TextArea,
  Button,
  Icon,
  Loader,
  Progress
} from "semantic-ui-react";

class Chart extends Component {
  state = {
    comment: ""
  };

  commentHandler = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    const { uri, name } = this.props;
    const userID = this.props.user.user_id;
    let popularity = 0;
    this.props.popularity && (popularity = this.props.popularity);
    let error = false;
    let warning = false;
    let success = false;

    if (popularity > 80) {
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
      <div className="chart">
        <Loader
          style={{
            position: "absolute",
            zIndex: 0,
            left: 0,
            right: 0,
            top: 20
          }}
          active
          inline="centered"
        />

        <iframe
          id={"discover-iframe"}
          title="spotify"
          src={`https://open.spotify.com/embed?uri=${uri}`}
          frameBorder="0"
          height="80"
        />
        {popularity !== 0 && (
          <Progress
            percent={popularity}
            success={success}
            warning={warning}
            error={error}
            progress
          />
        )}

        <div className="toggle">
          <Form>
            <TextArea
              onChange={event => this.commentHandler(event)}
              value={this.state.comment}
              placeholder="Why do you like this?"
              style={{
                height: "100%",
                backgroundColor: "#fff"
              }}
            />
          </Form>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => {
              this.props.addToProfile({
                uri,
                userID,
                comment: this.state.comment
              });
              this.props.alert.show(`Added "${name}" to your profile!`);
            }}
            animated
          >
            <Button.Content visible>Add</Button.Content>
            <Button.Content hidden>
              <Icon name="add" />
            </Button.Content>
          </Button>
        </div>
      </div>
    );
  }
}

export default withAlert(
  connect(
    state => state,
    { addToProfile }
  )(Chart)
);
