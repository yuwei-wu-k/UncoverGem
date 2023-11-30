import React from "react";
import { ToastContainer } from "react-toastify";
import Router from "./components/Router";
import http from "./http";
import { getPrefix, getSessionToken } from "./lib/Bandung";

class App extends React.Component {
  componentDidMount() {
    console.log("componentDidMount called from App");
    // Check the server status every 15 seconds
    this.intervalId = setInterval(this.checkServerStatus, 480 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkServerStatus = async () => {
    console.log("Checking server status");
    try {
      const response = await http.get(
        `${getPrefix()}/app/session/test?sessionToken=${getSessionToken()}`
      );
      if (response.data && response.data.error === "Unauthorized access.") {
        console.log("Signing out due to unauthorized access");
        this.signOutUser();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // signOutUser = () => {
  //   localStorage.removeItem("sessionToken");
  //   alert("token invalid"); // Notify the user with the message
  //   window.location.href = "/signin";
  // };

  signOutUser = () => {
    // Get the current value from local storage
    const keynameValue = localStorage.getItem("bandung");
    if (keynameValue) {
      // Parse the value into an object
      const parsedValue = JSON.parse(keynameValue);
      // Remove the sessionToken property
      delete parsedValue["sessionToken"];
      // Stringify the updated object and save it back to local storage
      localStorage.setItem("bandung", JSON.stringify(parsedValue));
    }

    //alert("token invalid"); // Notify the user with the message
    window.location.href = "/signin";
  };

  render() {
    return (
      <>
        <ToastContainer />
        <Router />
      </>
    );
  }
}

export default App;
