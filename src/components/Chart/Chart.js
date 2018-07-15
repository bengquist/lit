import React, { Component } from "react";
import { connect } from "react-redux";
import { addToProfile } from "../../ducks/reducers/reducer";
import "./Chart.css";

import { Form, TextArea, Button, Icon, Loader } from "semantic-ui-react";

class Chart extends Component {
  state = {
    comment: ""
  };

  commentHandler = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    const { uri } = this.props;
    const userID = this.props.user.user_id;

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
          title="spotify"
          src={`https://embed.spotify.com/?uri=${uri}`}
          frameBorder="0"
          height="80"
        />

        <div className="toggle">
          <Form>
            <TextArea
              onChange={event => this.commentHandler(event)}
              autoHeight
              value={this.state.comment}
              placeholder="Why do you like this?"
              style={{
                height: 50,
                width: 200,
                margin: 5,
                backgroundColor: "#fff"
              }}
            />
          </Form>
          <Button
            style={{ margin: "5px" }}
            onClick={() =>
              this.props.addToProfile({
                uri,
                userID,
                comment: this.state.comment
              })
            }
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

export default connect(
  state => state,
  { addToProfile }
)(Chart);
