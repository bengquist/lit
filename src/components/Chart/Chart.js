import React, { Component } from "react";
import { connect } from "react-redux";
import { addToProfile } from "../../ducks/reducers/reducer";
import "./Chart.css";

import { Form, TextArea, Button, Icon } from "semantic-ui-react";

class Chart extends Component {
  state = {
    comment: ""
  };

  commentHandler = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    const { collapsed } = this.state;
    const { uri } = this.props;
    const userID = this.props.user.user_id;
    const profileImg = this.props.user.profile_img;

    return (
      <div className="chart">
        <iframe
          src={`https://embed.spotify.com/?uri=${uri}`}
          frameBorder="0"
          height="80"
        />
        <Form>
          <TextArea
            onChange={event => this.commentHandler(event)}
            autoHeight
            value={this.state.comment}
            placeholder="Why do you like this?"
            style={{
              height: 50,
              width: 600,
              margin: 5,
              backgroundColor: "#fff"
            }}
          />
        </Form>

        <div className="toggle">
          <Button
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
