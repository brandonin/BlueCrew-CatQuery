import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import axios from 'axios';

class Login extends Component {
  state = {
    login: true,
    name: '',
    username: '',
    password: '',
    birthdate: '',
    breed: '',
    imageUrl: '',
    weight: 0,
  }

  getValidationState() {
    const length = this.state.password.length;
    if (length >= 8 ) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  togglePage = (e) => {
    this.setState({
      login: !this.state.login
    })
  }

  submitRegistration = () => {
      axios.post("http://localhost:8000/cat/register", {...this.state})
      .then(res => {
        alert('it works!')
        // go to next page fams
      }).catch(err => {
        if (err.response && err.response.statusText) alert(err.response.statusText);
        else console.log("unhandled error");
      })
  }
  submitLogin = () => {
      axios.post("http://localhost:8000/cat/login", {...this.state})
      .then(res => {
        // go to next page fams
      }).catch(err => {
        if (err.response && err.response.statusText) alert(err.response.statusText);
      })
  }
  render() {
    return (
      <div>
        <link rel = "stylesheet"
        href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity = "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossOrigin = "anonymous"/>

        <header className="App-header">
          <div className="form-box">
            {this.state.login &&
              <div id="login">
                <h1>Login</h1>
                <form>
                  <FormGroup>
                    <ControlLabel>
                      Username
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.username}
                      placeholder="Login"
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>
                      Password
                    </ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                  </FormGroup>
                </form>
                <button onClick={this.submitLogin} className="pointer">
                  Login
                </button>
                <h5 onClick={this.togglePage} className="pointer">Dont have an account yet? Register.</h5>
              </div>
            }

            {!this.state.login &&
              <div id="register">
                <h1>Register</h1>
                <form>
                  <FormGroup controlId = "formBasicText">
                    <ControlLabel>
                      Name
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.name}
                      placeholder="Name"
                      onChange={e => this.setState({ name: e.target.value })}

                    />
                  </FormGroup>
                  <FormGroup controlId = "formBasicText">
                    <ControlLabel>
                      Username
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.username}
                      placeholder="Username"
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>
                      Password
                    </ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Birthdate
                    </ControlLabel>
                    <FormControl
                      type="date"
                      value={this.state.birthdate}
                      placeholder="Birthdate"
                      onChange={e => this.setState({ birthdate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Breed
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.breed}
                      placeholder="Breed"
                      onChange={e => this.setState({ breed: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>
                      imageUrl
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.imageUrl}
                      placeholder="ImageUrl"
                      onChange={e => this.setState({ imageUrl: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>
                      weight
                    </ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.weight}
                      placeholder="weight"
                      onChange={e => this.setState({ weight: e.target.value })}
                    />
                  </FormGroup>
                </form>
                <button onClick={this.submitRegistration} className="pointer">
                  Register
                </button>
                <h5 onClick={this.togglePage} className="pointer">Have an Account? Login.</h5>
              </div>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default Login;
