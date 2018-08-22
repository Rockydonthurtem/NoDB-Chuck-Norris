import React, { Component } from "react";
import axios from "axios";
// import Header from "./Header";

class Random extends Component {
  constructor() {
    super();
    this.state = {
      random: [],
      notRandom: " "
    };
    this.handleRandom = this.handleRandom.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/jokes/random`).then(results => {
      console.log(results.data);
      this.setState({ random: results.data });
    });
  }
  handleRandom() {
    axios.get(`/api/jokes/random`).then(results => {
      console.log(results);
      this.setState({ random: results.data });
    });
  }
  render() {
    let rand = this.state.random.map((e, i) => {
      return (
        <div key={i}>
          {e.joke}
          {/* <button
            onClick={() => this.handleRandom(this.state.random)}
            value={this.state.random}
          >
            Take a Guess
          </button> */}
        </div>
      );
    });
    return (
      <div>
        {/* <Header /> */}
        {rand}
        <button
          onClick={() => this.handleRandom(this.state.random)}
          value={this.state.notRandom}
        >
          Take a Guess
        </button>
        {this.props.children}
      </div>
    );
  }
}

export default Random;
