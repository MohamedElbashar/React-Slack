/** @format */

import React from "react";
import { Button, Input, Segment } from "semantic-ui-react";

class MessageForm extends React.Component {
  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Replay"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="left"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}
export default MessageForm;
