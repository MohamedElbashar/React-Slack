/** @format */

import React from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createdMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
      content: this.state.message,
    };
    return message;
  };
  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createdMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            error: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        error: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };
  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  uploadFile = (file, metadata) => {
    console.log(file, metadata);
  };
  render() {
    const { errors, message, loading, modal } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          value={message}
          className={errors.some((error) =>
            error.message.includes("message") ? "error" : ""
          )}
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Replay"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
            disabled={loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="left"
            icon="cloud upload"
            onClick={this.openModal}
          />
          <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
        </Button.Group>
      </Segment>
    );
  }
}
export default MessageForm;
