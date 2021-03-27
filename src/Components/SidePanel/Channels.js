/** @format */

import React from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import firebase from "../../firebase";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    channelsRef: firebase.database().ref("channels"),
  };
  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        user: user.displayName,
        avatar: user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;
  OpenModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em " }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length})<Icon name="add" onClick={this.OpenModal} />
          </Menu.Item>
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name Of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About The Channel"
                  name="channel Details"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>

            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
