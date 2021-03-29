/** @format */

import React from "react";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from "../../firebase";
import uuidv4 from "uuid/v4";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";
class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    uploadstate: "",
    percentUploaded: 0,
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    modal: false,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createdMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }
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
    const pathToUpload = this.state.channel.id;
    const ref = this.props.messagesRef;
    const filepath = `chat/public${uuidv4()}.jpg`;
    this.setState(
      {
        uploadstate: "uploading",
        uploadTask: this.state.storageRef.child(filepath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          (err) => {
            console.log(err);
            this.setstate({
              errors: this.state.errors.concat(err),
              uploadstate: "error",
              uploadTask: null,
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl) => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch((err) => {
                console.log(err);
                this.setstate({
                  errors: this.state.errors.concat(err),
                  uploadstate: "error",
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };
  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createdMessage(fileUrl))
      .then(() => {
        this.setState({ uploadstate: "done" });
      })
      .catch((err) => {
        console.error(err);
        this.setstate({ error: this.state.errors.concat(err) });
      });
  };
  render() {
    const {
      errors,
      message,
      loading,
      modal,
      uploadstate,
      percentUploaded,
    } = this.state;
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
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
        <ProgressBar
          uploadstate={uploadstate}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}
export default MessageForm;
