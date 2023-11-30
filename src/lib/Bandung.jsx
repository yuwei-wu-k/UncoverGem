/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import Axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "../components/useRouter";

let prefix = null;
function getPrefix() {
  return prefix || "";
}
function setPrefix(newprefix) {
  prefix = newprefix;
}

let session = JSON.parse(localStorage.getItem("bandung"));
let sessionErrorMessage = null;
function getSession() {
  return session;
}
function getSessionErrorMessage() {
  return sessionErrorMessage;
}
function setSession(newsession) {
  session = newsession;
  localStorage.setItem("bandung", JSON.stringify(session));
}
function clearSession() {
  setSession(null);
}
function validSession() {
  return getSession() && getSession().passcode;
}
function getSessionToken() {
  return getSession() ? getSession().sessionToken : "";
}
function getSessionUserEntityId() {
  return getSession() ? getSession().userEntityId : "";
}
function adminPermission() {
  return getSession() && getSession().administrator;
}
function editorPermission() {
  return getSession() && getSession().editor;
}
function managerPermission() {
  return getSession() && getSession().manager;
}

function signin(email, password) {
  // const prefix = getPrefix();
  // console.log("prefix:", prefix);
  // Axios.get(`${getPrefix()  }/app/session/signin?sessionEmail=${  email  }&sessionPassword=${  password}`, null)
  Axios.get(
    // `http://localhost:5000/https://www.uncovergem.com/app/session/signin?sessionEmail=${email}&sessionPassword=${password}`,
    `${getPrefix()}/app/session/signin?sessionEmail=${email}&sessionPassword=${password}`,
    null
  )
    .then((response) => {
      if (response.data.error) {
        console.log(response);
        sessionErrorMessage = response.data.error;
        alert(sessionErrorMessage);
      } else {
        console.dir(response.data);
        console.log(response);
        // response.data is converted to JSON and stored in localStorage
        setSession(response.data);
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      sessionErrorMessage = "Signin failure.";
      alert(sessionErrorMessage);
    })
    .finally((status) => {});

  // Axios.post(getPrefix() + "/app/session/signin?sessionEmail=" + email + "&sessionPassword=" + password, null)
  //     .then(response => {
  //         if (response.data.error)
  //             sessionErrorMessage = response.data.error;
  //         else {
  //             setSession(response.data);
  //             window.location.reload();
  //         }
  //     })
  //     .catch(err => {
  //         console.log(err);
  //         sessionErrorMessage = "Signin failure.";
  //     })
  //     .finally(status => {
  //     });
}
// function signout() {
//   clearSession();
//   window.location.reload();
// }

function signout() {
  clearSession();
  Axios.get(
    `${getPrefix()}/app/session/signout?sessionToken=${getSessionToken()}`,
    null
  );
  window.location.reload();
}

function testSignout() {
  Axios.get(
    `${getPrefix()}/app/session/signout?sessionToken=${getSessionToken()}`,
    null
  );
  window.location.reload();
}

function fetchSession(email, password) {
  Axios.get(
    `${getPrefix()}/app/session/view?sessionToken=${getSessionToken()}`,
    null
  )
    .then((response) => {
      if (response.data.error) sessionErrorMessage = response.data.error;
      else {
        setSession(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((status) => {});
}

const containerStyle = css`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
`;

const progressBarStyle = (percentage) => css`
  width: ${percentage}%;
  background-color: #4caf50;
  height: 20px;
`;

// If token fails try email/passcode combination from last successful signin
class BandungComponent extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.page = 0;
    this.state = {
      command: this.props.command ? this.props.command : "List",
      commandList: this.props.commandList ? this.props.commandList : "List",
      errorMessage: null,
      loading: false,
      newPassword: "",
      selectedImage: null,
      previewImageUrl: null,
      userEntity: {},
      uploadPercentage: 0,
      isUploading: false,
    };
  }

  command(command) {
    this.setState({ command });
  }

  renderSignin() {
    return (
      <div className="lg:flex items-center relative">
        <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
          <div className="w-full">
            <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
              <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                Signin
              </h1>
            </div>
            <form
              onSubmit={(event) => {
                this.executeSignin(event);
              }}
              method="POST"
            >
              <div className="input-area">
                {getSessionErrorMessage() && (
                  <div className="error_message">
                    {getSessionErrorMessage()}
                  </div>
                )}
                <div className="input-item mb-5">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="email"
                    >
                      Email Address*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="input-item mb-5">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="password"
                    >
                      Password*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="forgot-password-area flex justify-between items-center mb-7">
                  <div className="remember-checkbox flex items-center space-x-2.5">
                    <input type="checkbox" id="remember" name="remember" />
                    <span className="text-base text-black">Remember Me</span>
                  </div>
                  <Link to="/resetpassword" className="text-base text-qyellow">
                    Forgot Password
                  </Link>
                </div>
                <div className="signin-area mb-3.5">
                  <div className="flex justify-center">
                    <button className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
                      <span>Sign In</span>
                    </button>
                  </div>
                </div>
                <div className="signup-area flex justify-center">
                  <p className="text-base text-qgraytwo font-normal">
                    <Link to="/join" className="text-base text-qyellow">
                      Or create an account
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  executeSignin(event) {
    event.preventDefault();
    console.log("executeSignin");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!password) {
      alert("Password cannot be empty");
      return;
    }

    signin(email, password);
    // signin(document.getElementById("email").value, document.getElementById("password").value);
  }

  // executeSignin(event) {
  //     event.preventDefault();
  //     const email = document.getElementById("email").value;
  //     const password = document.getElementById("password").value;

  //     console.log(`${email}`);
  //     console.log(`${password}`);

  //     // Axios.get(`/app/session/signin?sessionEmail=${email}&sessionPassword=${password}`)
  //     //     .then(response => {
  //     //         // handling response here
  //     //         // signin(document.getElementById("email").value, document.getElementById("password").value);
  //     //         signin(email, password);
  //     //     })
  //     //     .catch(error => {
  //     //         // handle error here
  //     //         console.log(error);
  //     //         console.log("SignIn Error");
  //     //     });

  //     // Axios.post(`/app/session/signin`, { sessionEmail: email, sessionPassword: password })
  //     //     .then(response => {
  //     //         // handle response here
  //     //         signin(email, password);
  //     //     })
  //     //     .catch(error => {
  //     //         // handle error here
  //     //         console.log(error);
  //     //         console.log("SignIn Error");
  //     //     });

  //     Axios.post(`http://localhost:5000/app/session/signin`, { sessionEmail: email, sessionPassword: password })
  //         .then(response => {
  //             // handle response here
  //             signin(email, password);
  //         })
  //         .catch(error => {
  //             // handle error here
  //             console.log(error);
  //             console.log("SignIn Error");
  //         });

  // }

  executeSignout() {
    signout();
  }

  renderJoin() {
    return (
      <div className="lg:flex items-center relative">
        <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
          <div className="w-full">
            <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
              <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                Create Account
              </h1>
            </div>
            <form
              onSubmit={(event) => {
                this.executeJoin(event);
              }}
              method="POST"
            >
              <div className="input-area">
                <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="firstName"
                    >
                      First Name*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="lastName"
                    >
                      Last Name*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="email"
                    >
                      Email Address*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john.doe@gmail.com"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="emailRepeat"
                    >
                      Repeat Email*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="email"
                        id="emailRepeat"
                        name="emailRepeat"
                        placeholder="john.doe@gmail.com"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="password"
                    >
                      Password*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="passwordRepeat"
                    >
                      Repeat Password*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="password"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="forgot-password-area flex justify-between items-center mb-7">
                  <div className="remember-checkbox flex items-center space-x-2.5">
                    <input type="checkbox" id="remember" name="remember" />
                    <span className="text-base text-black">
                      I agree all{" "}
                      <Link to="/terms" className="text-base text-qyellow">
                        terms and conditions
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="signin-area mb-3.5">
                  <div className="flex justify-center">
                    <button className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
                      <span>Create Account</span>
                    </button>
                  </div>
                </div>
                <div className="signup-area flex justify-center">
                  <p className="text-base text-qgraytwo font-normal">
                    <Link to="/signin" className="text-base text-qyellow">
                      Or sign into your account
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
          <div
            className="absolute xl:-right-20 -right-[138px]"
            style={{ top: "calc(50% - 258px)" }}
          ></div>
        </div>
      </div>
    );
  }

  executeJoin(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const emailRepeat = document.getElementById("emailRepeat").value;
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;
    Axios.get(
      `${getPrefix()}/app/session/join?firstName=${firstName}&lastName=${lastName}&email=${email}&emailRepeat=${emailRepeat}&password=${password}&passwordRepeat=${passwordRepeat}`,
      null
    )
      .then((response) => {
        if (response.data.error) sessionErrorMessage = response.data.error;
        else console.log(response.data); // Log the data to the console
        setSession(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        sessionErrorMessage = "Signin failure";
      });
    // .finally(status => {
    //     // window.location.reload();
    // });
  }

  // executeJoin(event) {
  //     event.preventDefault();
  //     var firstName = document.getElementById("firstName").value;
  //     var lastName = document.getElementById("lastName").value;
  //     var email = document.getElementById("email").value;
  //     var emailRepeat = document.getElementById("emailRepeat").value;
  //     var password = document.getElementById("password").value;
  //     var passwordRepeat = document.getElementById("passwordRepeat").value;

  //     if (email !== emailRepeat) {
  //         alert("Emails do not match");
  //         return;
  //     }
  //     if (password !== passwordRepeat) {
  //         alert("Passwords do not match");
  //         return;
  //     }

  //     Axios.post(getPrefix() + "/app/session/join", {
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         password: password
  //     })
  //         .then(response => {
  //             if (response.data.error) {
  //                 sessionErrorMessage = response.data.error;
  //             } else {
  //                 setSession(response.data);
  //                 window.location.reload();
  //             }
  //         })
  //         .catch(err => {
  //             console.log(err);
  //             sessionErrorMessage = "Signin failure.";
  //         });
  // }
}

class AccountMenuComponent extends BandungComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // this.inactivityTimeout = null;
  }

  // componentDidMount() {
  //   // Set up event listeners for user activity
  //   window.addEventListener("mousemove", this.resetInactivityTimeout);
  //   window.addEventListener("keydown", this.resetInactivityTimeout);
  //   window.addEventListener("click", this.resetInactivityTimeout);

  //   // Check if the user was logged out due to inactivity
  //   if (localStorage.getItem("loggedOutDueToInactivity")) {
  //     alert("You have been logged out due to inactivity.");
  //     localStorage.removeItem("loggedOutDueToInactivity");
  //   }

  //   // Set up initial inactivity timeout
  //   this.resetInactivityTimeout();
  // }

  // componentWillUnmount() {
  //   // Clean up event listeners and timers
  //   window.removeEventListener("mousemove", this.resetInactivityTimeout);
  //   window.removeEventListener("keydown", this.resetInactivityTimeout);
  //   window.removeEventListener("click", this.resetInactivityTimeout);

  //   clearTimeout(this.inactivityTimeout);
  // }

  // resetInactivityTimeout = () => {
  //   clearTimeout(this.inactivityTimeout);
  //   this.inactivityTimeout = setTimeout(this.signout, 5 * 60 * 1000); // 5 minutes
  // };

  // signout = () => {
  //   clearSession();
  //   localStorage.setItem("loggedOutDueToInactivity", "true");
  //   window.location.reload();
  // };

  render() {
    return !validSession() ? (
      <div className="signin-button">
        <Link to="/signin">
          <div className="black-btn w-[161px] h-[40px] flex justify-center items-center cursor-pointer rounded-md">
            <div className="flex space-x-2 items-center">
              <span className="text-sm font-600">Sign In</span>
            </div>
          </div>
        </Link>
      </div>
    ) : (
      <div className="black-btn w-[161px] h-[40px] flex justify-center items-center cursor-pointer rounded-md">
        <div className="dropdown-menu flex space-x-2 items-center">
          <ul className="dropdown-menu flex xl:space-x-10 space-x-5">
            <li className="relative">
              <span className="flex items-center text-sm text-qwhitetext font-600 cursor-pointer ">
                <span>Account</span>
                <span className="ml-1.5 ">&#9660;</span>
              </span>
              <div className="dropdown-menu-sub-menu w-[220px] absolute left-0 top-[60px]">
                <div className="w-full bg-white flex justify-between items-center">
                  <div className="w-full h-full p-5">
                    <ul className="flex flex-col space-y-2">
                      <li>
                        <Link to="/dashboard">
                          <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                            Dashboard
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile">
                          <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                            Profile
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin">
                          <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                            Admin
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => {
                            clearSession();
                          }}
                        >
                          <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow">
                            Signout
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

class ProfileComponent extends BandungComponent {
  constructor(props) {
    super(props);
    this.state = {
      command: null,
      action: null,
      userEntity: {},
      userEmailEntity: {},
      userEmailEntityList: [],
      showProfileImage: false,
      profileImageUrl: null,
      newEmail: "",
      emailError: null,
    };
    this.longDescriptionEditorState = EditorState.createEmpty();
  }

  navigateToEmailList = () => {
    // Destructure the router object from the component's props
    // The router object has been passed as a prop from the ProfileComponentWithRouter functional component
    const { router } = this.props;
    router.navigate("/list-user-emails");
  };

  componentDidMount() {
    this.getProfile();
    // Check the session every 5 minutes
    this.intervalId = setInterval(this.testSession, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  command(command, action) {
    this.setState({ command, action });
  }

  action(action) {
    this.setState({ action });
  }

  render() {
    if (!validSession()) return this.renderSignin();
    return (
      <div className="profile-wrapper w-full mt-8 flex space-x-10">
        <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
          <div className="flex flex-col space-y-10">{this.renderIndex()}</div>
        </div>
        <div className="flex-1">
          <div className="item-body profile-wrapper w-full">
            {this.renderTab()}
          </div>
        </div>
      </div>
    );
  }

  getProfile() {
    if (validSession() && getSession().userEntityId) {
      Axios.get(
        `${getPrefix()}/app/user/view?sessionToken=${getSessionToken()}&userEntityId=${
          getSession().userEntityId
        }`,
        null
      ).then((response) => {
        this.setState({ userEntity: response.data });
      });
      Axios.get(
        `${getPrefix()}/app/user/textshortdescription?sessionToken=${getSessionToken()}&userEntityId=${
          getSession().userEntityId
        }`,
        null
      ).then((response) => {
        this.setState({ shortDescription: response.data });
      });
      Axios.get(
        `${getPrefix()}/app/user/textlongdescription?sessionToken=${getSessionToken()}&userEntityId=${
          getSession().userEntityId
        }`,
        null
      ).then((response) => {
        this.setState({ longDescription: response.data });
      });
    }
  }

  // getProfile() {
  //   if (validSession() && getSession().userEntityId) {
  //     http
  //       .get(
  //         // `${getPrefix()}/app/user/view?userEntityId=${
  //         `${getPrefix()}/app/session/view?userEntityId=${
  //           getSession().userEntityId
  //         }`
  //       )
  //       .then((response) => {
  //         this.setState({ userEntity: response.data });
  //       })
  //       .catch((error) => console.error(error));

  //     http
  //       .get(
  //         // `${getPrefix()}/app/user/textshortdescription?userEntityId=${
  //         `${getPrefix()}/app/session/textshortdescription?userEntityId=${
  //           getSession().userEntityId
  //         }`
  //       )
  //       .then((response) => {
  //         this.setState({ shortDescription: response.data });
  //       })
  //       .catch((error) => console.error(error));

  //     http
  //       .get(
  //         // `${getPrefix()}/app/user/textlongdescription?userEntityId=${
  //         `${getPrefix()}/app/session/textlongdescription?userEntityId=${
  //           getSession().userEntityId
  //         }`
  //       )
  //       .then((response) => {
  //         this.setState({ longDescription: response.data });
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }

  // testSession = () => {
  //   http.get(`${getPrefix()}/app/session/test`).catch((error) => {
  //     console.error(error);
  //     if (error.response.status === 401) {
  //       localStorage.removeItem("sessionToken");
  //       window.location.href = "/signin";
  //     }
  //   });
  // };

  renderIndex() {
    return (
      <div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("general", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">General</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("settings", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Settings</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("password", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Password</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("contact", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Contact</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("bio", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Bio</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("emails", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Emails</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("socials", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Socials</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("image", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Image</span>
            </div>
          </div>
        </div>
        <div className="item group">
          <div
            onClick={() => {
              this.command("quit", null);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
              <span className=" font-normal text-base">Quit</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTab() {
    return !this.state.command || this.state.command === "general"
      ? this.renderGeneralTab()
      : this.state.command === "settings"
      ? this.renderSettingsTab()
      : this.state.command === "password"
      ? this.renderPasswordTab()
      : this.state.command === "contact"
      ? this.renderContactTab()
      : this.state.command === "bio"
      ? this.renderBioTab()
      : this.state.command === "emails"
      ? this.renderEmailsTab()
      : this.state.command === "socials"
      ? this.renderSocialsTab()
      : this.state.command === "image"
      ? this.renderImageTab()
      : this.state.command === "quit"
      ? this.renderQuitTab()
      : this.renderGeneralTab();
  }

  renderGeneralTab() {
    // fix shortDescription
    if (!this.state.action)
      return (
        <div>
          <div className="flex space-x-8">
            <div className="w-[570px] ">
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="input-com w-full h-full">
                    <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                      First Name
                    </label>
                    <div className="input-wrapper w-full h-full overflow-hidden relative ">
                      {getSession().firstName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="input-com w-full h-full">
                    <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                      Last Name
                    </label>
                    <div className="input-wrapper w-full h-full overflow-hidden relative">
                      {getSession().lastName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="action-area flex space-x-4 items-center">
            <button
              onClick={(event) => this.action("update")}
              className="w-[164px] h-[50px] bg-qblack text-white text-sm"
            >
              Update
            </button>
          </div>
        </div>
      );
    if (this.state.action === "update") {
      this.longDescriptionEditorState = EditorState.createEmpty();
      return (
        <form
          id="generalUpdate"
          onSubmit={(event) => {
            this.executeGeneralUpdate(event);
          }}
        >
          <div className="flex space-x-8">
            <div className="w-[570px] ">
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="firstName"
                    >
                      First Name*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={getSession().firstName}
                        className="update-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="lastName"
                    >
                      Last Name*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={getSession().lastName}
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-item mb-8">
                <div className="w-full">
                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                      htmlFor="shortDescription"
                    >
                      Last Name*
                    </label>
                    <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                      <textarea
                        id="shortDescription"
                        name="shortDescription"
                        className="text_area fields"
                        defaultValue={getSession().shortDescription}
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="action-area flex space-x-4 items-center">
            <button
              onClick={(event) => this.action(null)}
              className="text-sm text-qred font-semibold"
            >
              Cancel
            </button>
            <button className="w-[164px] h-[50px] bg-qblack text-white text-sm">
              Save
            </button>
          </div>
        </form>
      );
    }
  }

  executeGeneralUpdate(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("sessionToken", getSessionToken());
    form.append("userEntityId", this.state.userEntity.userEntityId);
    form.append("firstName", document.getElementById("firstName").value);
    form.append("lastName", document.getElementById("lastName").value);
    form.append(
      "shortDescription",
      document.getElementById("shortDescription").value
    );
    Axios.post(`${getPrefix()}/app/session/update`, form).then((response) => {
      this.getProfile();
      fetchSession();
    });
    this.action(null);
  }

  renderSettingsTab() {
    // Use Html
    // Notifications
    if (!this.state.action)
      return (
        <div>
          <h1>Profile: Settings</h1>
          <p
            onClick={() => {
              this.command("SettingsUpdate");
            }}
            style={{ cursor: "pointer" }}
          >
            Update
          </p>
        </div>
      );
    if (this.state.action === "update") return null;
    // Use Html
    // Notifications
  }

  executeSettingsUpdate(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("sessionToken", getSessionToken());
    form.append("userEntityId", this.state.userEntity.userEntityId);
    // Axios.post(`${getPrefix()}/app/user/update`, form).then((response) => {
    Axios.post(`${getPrefix()}/app/session/update`, form).then((response) => {
      this.setState({ command: "Settings" });
      this.getProfile();
    });
  }

  handleCurrentPasswordChange = (event) => {
    this.setState({ currentPassword: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  executePasswordUpdate = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("sessionToken", getSessionToken());
    form.append("password", encodeURIComponent(this.state.currentPassword));
    form.append("passwordNew", encodeURIComponent(this.state.newPassword));

    // const sessionToken = getSessionToken();
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userEntityId = sessionObject ? sessionObject.userEntityId : null;
    const passcode = sessionObject ? sessionObject.passcode : null;

    console.log(this.state.currentPassword);

    Axios.post(`${getPrefix()}/app/session/updatepassword`, form).then(
      (response) => {
        // To retrieve the latest user profile information
        // To check for valid session
        this.getProfile();
      }
    );
  };

  // renderPasswordTab() {
  //   return (
  //     <div className="changePasswordTab w-full">
  //       <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
  //         <div className="w-[397px] mb-10">
  //           <div className="w-full mt-[30px] flex justify-start">
  //             <div className="sm:flex sm:space-x-[30px] items-center">
  //               <input
  //                 type="password"
  //                 value={this.state.newPassword}
  //                 onChange={this.handlePasswordChange}
  //                 placeholder="Enter new password"
  //               />
  //               <div className="w-[180px] h-[50px]">
  //                 <button
  //                   type="button"
  //                   className="yellow-btn"
  //                   onClick={this.executePasswordUpdate}
  //                 >
  //                   <div className="w-full text-sm font-semibold">
  //                     Update Password
  //                   </div>
  //                 </button>
  //               </div>
  //               <button type="button">
  //                 <div className="w-full text-sm font-semibold text-qblack mb-5 sm:mb-0">
  //                   Cancel
  //                 </div>
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderPasswordTab() {
  //   return (
  //     <div className="changePasswordTab w-full">
  //       <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
  //         <div className="w-[397px] mb-10">
  //           <div className="w-full mt-[30px] flex flex-col justify-start">
  //             <div className="sm:flex sm:space-x-[30px] items-center">
  //               <input
  //                 type="password"
  //                 value={this.state.currentPassword}
  //                 onChange={this.handleCurrentPasswordChange}
  //                 placeholder="Enter current password"
  //               />
  //               <input
  //                 type="password"
  //                 value={this.state.newPassword}
  //                 onChange={this.handlePasswordChange}
  //                 placeholder="Enter new password"
  //               />
  //               <div className="w-[180px] h-[50px] mt-4">
  //                 <button
  //                   type="button"
  //                   className="yellow-btn"
  //                   onClick={this.executePasswordUpdate}
  //                 >
  //                   <div className="w-full text-sm font-semibold">
  //                     Update Password
  //                   </div>
  //                 </button>
  //               </div>
  //               <button type="button">
  //                 <div className="w-full text-sm font-semibold text-qblack mb-5 sm:mb-0">
  //                   Cancel
  //                 </div>
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  renderPasswordTab() {
    return (
      <div className="changePasswordTab w-full flex flex-col items-center space-y-5">
        <div className="w-full mt-10 flex flex-col items-center space-y-5">
          <input
            className="w-[397px]"
            type="password"
            value={this.state.currentPassword}
            onChange={this.handleCurrentPasswordChange}
            placeholder="Enter current password"
          />
          <input
            className="w-[397px]"
            type="password"
            value={this.state.newPassword}
            onChange={this.handlePasswordChange}
            placeholder="Enter new password"
          />
          <button
            className="w-[180px] h-[50px] mt-4 rounded shadow bg-gradient-to-r from-yellow-400 to-red-500 text-white"
            type="button"
            onClick={this.executePasswordUpdate}
          >
            <div className="w-full text-center text-sm font-semibold">
              Update Password
            </div>
          </button>
          <button className="w-[180px]" type="button">
            <div className="w-full text-sm font-semibold text-qblack text-center">
              Cancel
            </div>
          </button>
        </div>
      </div>
    );
  }

  renderContactTab() {
    return null;
  }

  executeContactUpdate(event) {}

  renderBioTab() {
    // longDescription
    if (!this.state.command || this.state.command === "Settings")
      return (
        <div>
          <h1>Profile: Settings</h1>
          <p
            onClick={() => {
              this.command("SettingsUpdate");
            }}
            style={{ cursor: "pointer" }}
          >
            Update
          </p>
        </div>
      );
    return null;
    // longDescription
  }

  executeBioUpdate(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("sessionToken", getSessionToken());
    form.append("userEntityId", this.state.userEntity.userEntityId);
    form.append(
      "longDescription",
      draftToHtml(
        convertToRaw(this.longDescriptionEditorState.getCurrentContent())
      )
    );
    // Axios.post(`${getPrefix()}/app/user/update`, form).then((response) => {
    Axios.post(`${getPrefix()}/app/session/update`, form).then((response) => {
      this.setState({ command: "Bio" });
      this.getProfile();
    });
  }

  handleEmailChange = (event) => {
    this.setState({ newEmail: event.target.value });
  };

  handleSubmitEmail = (event) => {
    event.preventDefault();

    // Basic email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(this.state.newEmail)) {
      this.setState({ emailError: "Please enter a valid email." });
      return;
    }

    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const sessionToken = getSessionToken();
    console.log(sessionToken);
    // const sessionToken = sessionObject ? sessionObject.sessionToken : null;
    // const sessionToken = sessionObject
    // ? "session" + sessionObject.sessionToken
    // : null;
    const userId = sessionObject ? sessionObject.userEntityId : null;

    // If the email is valid, clear the error message
    this.setState({ emailError: null });

    // Axios.post(
    // `${getPrefix()}/app/session/createuseremail/create?sessionToken=${sessionToken}&userEntityId=${userId}`,
    // {
    //   email: this.state.newEmail,
    // }
    Axios.post(
      `${getPrefix()}/app/session/createuseremail?email=${
        this.state.newEmail
      }&sessionToken=${getSessionToken()}`
    )
      .then((response) => {
        if (response.data.entity === "UserEmailEntity") {
          this.setState({ successMessage: "Email added successfully!" }, () => {
            alert(this.state.successMessage);
          });
        } else {
          // If the response indicates an error, show the error message
          this.setState({ emailError: response.data.message });
        }
      })
      .catch((error) => {
        this.setState({
          emailError: "An error occurred while adding the email.",
        });
      });
  };

  // renderEmailsTab() {
  //   return null;
  // }

  // renderEmailsTab() {
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmitEmail}>
  //         <label htmlFor="newEmail">Enter new email to add:</label>
  //         <input
  //           type="email"
  //           id="newEmail"
  //           value={this.state.newEmail}
  //           onChange={this.handleEmailChange}
  //         />
  //         {this.state.emailError && <p>{this.state.emailError}</p>}
  //         <button type="submit">Save</button>
  //       </form>
  //     </div>
  //   );
  // }

  renderEmailsTab() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmitEmail}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 20px;
          `}
        >
          <label htmlFor="newEmail">Enter new email to add:</label>
          <input
            type="email"
            id="newEmail"
            value={this.state.newEmail}
            onChange={this.handleEmailChange}
            css={css`
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              width: 100%;
              box-sizing: border-box;
              margin-bottom: 10px;
            `}
          />
          {this.state.emailError && (
            <p
              css={css`
                color: red;
                margin-bottom: 10px;
              `}
            >
              {this.state.emailError}
            </p>
          )}
          {this.state.successMessage && (
            <p
              css={css`
                color: green;
                margin-bottom: 10px;
              `}
            >
              {this.state.successMessage}
            </p>
          )}
          <button
            type="submit"
            css={css`
              background-color: #4caf50; /* Green */
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
              border-radius: 12px;
            `}
          >
            Save
          </button>

          <button
            type="button"
            onClick={this.navigateToEmailList}
            css={css`
              background-color: #ffa500; /* Orange */
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
              border-radius: 12px;
            `}
          >
            View your connected emails
          </button>
        </form>
      </div>
    );
  }

  executeEmailUpdate(event) {}

  renderSocialsTab() {
    return null;
  }

  executeSocials(event) {}

  // This function is intended to handle the selection of an image file

  handleImageChange = (event) => {
    // Get the file that the user selects from the input element

    const file = event.target.files[0];

    // Update the component's state with the selected file and a URL that can be used to preview the image

    this.setState({
      // Store the selected image file in the state
      selectedImage: file,

      // Create a URL representing the selected file
      previewImageUrl: URL.createObjectURL(file),
    });
  };

  /* handleShowProfileImage = () => {
    const sessionToken = getSessionToken();
    const userId = this.state.userEntity.userEntityId;

    Axios.get(
      `http://localhost:5000/https://www.uncovergem.com/app/user/imageimage?userEntityId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        responseType: "blob", // Indicate that the response data should be returned as a Blob
      }
    )
      .then((response) => {
        // Create a URL representing the image Blob
        //const imageUrl = URL.createObjectURL(response.data);
        //this.setState({ profileImageUrl: imageUrl });
        //console.log(this.state.profileImageUrl);

        console.log("Response data:", response.data);
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(response.data);
        console.log("Image URL:", imageUrl);
        this.setState({ profileImageUrl: imageUrl });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }; */

  /* handleShowProfileImage = () => {
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userId = sessionObject ? sessionObject.userEntityId : null;

    // Construct the image URL
    //const imageUrl = `http://localhost:5000/https://www.uncovergem.com/app/user/imageimage?userEntityId=${userId}`;
    const imageUrl = `${getPrefix()}/app/user/imageimage?userEntityId=${userId}`;

    // Open the image URL in a new tab
    window.open(imageUrl, "_blank");
  }; */

  /* handleShowProfileImage = () => {
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userId = sessionObject ? sessionObject.userEntityId : null;
    const sessionToken = getSessionToken();

    // Construct the image URL
    const imageUrl = `${getPrefix()}/app/user/imageimage?userEntityId=${userId}`;
    console.log("Image URL:", imageUrl);

    // Fetch the image
    fetch(imageUrl, {
      headers: {
        // Include the session token in the Authorization header as a Bearer token
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a blob URL and set it in the state
        const profileImageUrl = URL.createObjectURL(blob);
        this.setState({ profileImageUrl });
      });
  }; */

  // handleShowProfileImage = () => {
  //   const sessionObject = JSON.parse(localStorage.getItem("bandung"));
  //   const userId = sessionObject ? sessionObject.userEntityId : null;

  //   // Construct the image URL
  //   const imageUrl = `${getPrefix()}/app/user/imageimage?userEntityId=${userId}`;
  //   console.log("Image URL:", imageUrl);

  //   // Set the imageUrl in the state
  //   this.setState({
  //     profileImageUrl: imageUrl,
  //     showProfileImage: true,
  //     userEntity: {
  //       ...this.state.userEntity,
  //       imageName: "Profile Image",
  //     },
  //   });
  // };

  handleShowProfileImage = () => {
    const sessionObject = JSON.parse(localStorage.getItem("bandung"));
    const userId = sessionObject ? sessionObject.userEntityId : null;

    // Construct the image URL with a cache-busting parameter to ensure the latest image is always fetched
    // const imageUrl = `${getPrefix()}/app/user/imageimage?userEntityId=${userId}&t=${Date.now()}`;

    const imageUrl = `${getPrefix()}/app/session/imageimage?userEntityId=${userId}&t=${Date.now()}`;
    console.log("Image URL:", imageUrl);

    // Set the imageUrl in the state
    this.setState({
      profileImageUrl: imageUrl,
      showProfileImage: true,
      userEntity: {
        ...this.state.userEntity,
        imageName: "Profile Image",
      },
    });
  };

  componentDidMount() {
    this.handleShowProfileImage();
  }

  /* renderImageTab() {
    return (
      <div>
        //Conditionally render the profile image
        {this.state.showProfileImage && this.state.userEntity.imageName && (
          <img
            //src={this.state.userEntity.imageUrl}
            src={this.state.profileImageUrl}
            alt="Profile"
            style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }}
          />
        )}

        <form onSubmit={this.executeImage}>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={this.handleImageChange}
          />
          <button type="submit">Upload Image</button>
        </form>

        //{this.state.userEntity.imageName && <img src={this.state.userEntity.imageUrl} alt="Profile" />}
        //Display the image preview

        {this.state.previewImageUrl && (
          <img
            src={this.state.previewImageUrl}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }}
          />
        )}
      </div>
    );
  } */

  renderImageTab() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {this.state.showProfileImage && this.state.userEntity.imageName && (
          <Card style={{ maxWidth: "220px", backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <img
                src={this.state.profileImageUrl}
                alt="Profile"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "10px",
                }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="center"
              >
                Current Profile Image
              </Typography>
            </CardContent>
          </Card>
        )}
        {this.state.previewImageUrl && (
          <Card style={{ maxWidth: "220px", backgroundColor: "#f0f0f0" }}>
            <CardContent>
              <img
                src={this.state.previewImageUrl}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "10px",
                }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="center"
              >
                Preview of New Image
              </Typography>
            </CardContent>
          </Card>
        )}
        {this.state.uploadPercentage > 0 && (
          <div css={containerStyle}>
            <div css={progressBarStyle(this.state.uploadPercentage)}>
              Upload Progress: {this.state.uploadPercentage}%
            </div>
          </div>
        )}

        <form onSubmit={this.executeImage} style={{ marginBottom: "20px" }}>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={this.handleImageChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Upload New Image
          </Button>
        </form>
      </div>
    );
  }

  // executeImage = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("image", this.state.selectedImage);
  //   formData.append("userEntityId", this.state.userEntity.userEntityId);

  //   // Get the session token
  //   const sessionToken = getSessionToken();
  //   console.log("sessionToken", sessionToken);

  //   formData.append("sessionToken", sessionToken);

  //   console.log(getPrefix());

  //   Axios.post(
  //     //"http://localhost:5000/https://www.uncovergem.com/app/user/uploadimage",
  //     //"http://localhost:5000/https://www.uncovergem.com/app/session/uploadimage",
  //     `${getPrefix()}/app/session/uploadimage`,
  //     formData,
  //     {
  //       headers: {
  //         // Include the session token in the Authorization header as a Bearer token
  //         Authorization: `Bearer ${sessionToken}`,
  //         //Authorization: `Bearer ${sessionToken}:${this.state.userEntity.userEntityId}`,
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       console.log("response", JSON.stringify(response.data, null, 2));

  //       // Update the userEntity in the state with the new image information
  //       this.setState((prevState) => ({
  //         userEntity: {
  //           ...prevState.userEntity,
  //           imageName: response.data.imageName,
  //           imageUrl: response.data.imageUrl,
  //         },
  //       }));
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  executeImage = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.selectedImage);
    formData.append("userEntityId", this.state.userEntity.userEntityId);

    const sessionToken = getSessionToken();
    console.log("sessionToken", sessionToken);

    formData.append("sessionToken", sessionToken);

    console.log(getPrefix());

    Axios.post(`${getPrefix()}/app/session/uploadimage`, formData, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.floor((loaded * 100) / total);
        this.setState({
          uploadPercentage: percentCompleted,
        });
      },
    })
      .then((response) => {
        console.log("response", JSON.stringify(response.data, null, 2));

        this.setState((prevState) => ({
          userEntity: {
            ...prevState.userEntity,
            imageName: response.data.imageName,
            imageUrl: response.data.imageUrl,
          },
          uploadPercentage: 0, // reset the progress bar after successful upload
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  renderQuitTab() {
    return null;
  }

  executeQuit(event) {}
}

const ProfileComponentWithRouter = (props) => {
  const router = useRouter();

  return <ProfileComponent {...props} router={router} />;
};

class SigninComponent extends BandungComponent {
  render() {
    if (!validSession()) return this.renderSignin();

    return (
      <div>
        <p>Welcome to Quiz Website</p>
      </div>
    );
  }
}

class JoinComponent extends BandungComponent {
  render() {
    if (!validSession()) return this.renderJoin();
    return (
      <div>
        <p>Welcome to website. (First Time)</p>
      </div>
    );
  }
}

export {
  AccountMenuComponent,
  BandungComponent,
  JoinComponent,
  ProfileComponentWithRouter as ProfileComponent,
  // ProfileComponent,
  SigninComponent,
  adminPermission,
  clearSession,
  editorPermission,
  getPrefix,
  getSession,
  getSessionErrorMessage,
  getSessionToken,
  getSessionUserEntityId,
  managerPermission,
  setPrefix,
  setSession,
  signin,
  signout,
  validSession,
};
