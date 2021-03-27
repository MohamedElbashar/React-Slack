/** @format */

import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";
class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
  };
  // componentDidMount() {
  //   this.setState({ user: this.props.currentUser });
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ user: nextProps.currentUser });
  // }
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed In as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>,
    },
  ];
  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signedOut"));
  };
  render() {
    console.log(this.props.currentUser);
    const { user } = this.state;
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/*App Header*/}
            <Header inverted floated="left" as="h2">
              <Icon name="bug" />
              <Header.Content>DevChat</Header.Content>
            </Header>
            {/* User DropDown */}
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currnetUser,
// });
export default UserPanel;
