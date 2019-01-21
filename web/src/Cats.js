import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Cats extends Component {
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

  componentDidMount() {
    axios.get("http://localhost:8000/cats", res => {
      console.log(res);
    }).catch(err => {
      console.log('error', err)
    })
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
      <div className="App">
        <link rel = "stylesheet"
        href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity = "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossOrigin = "anonymous"/>

        <header className="App-header">

        </header>
      </div>
    );
  }
}

export default Cats;
