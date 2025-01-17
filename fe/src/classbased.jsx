import React, { Component } from 'react';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchUserData();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchUserData = () => {
    this.setState({user: {name: "test", email: 'example@example.com'}})
   }

  render() {
    const { user, seconds } = this.state;
    return (
      <div>
        <h1>User Data Component</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <p>Timer: {seconds} seconds</p>
      </div>
    );
  }
}

export default UserData;
