import React, { Component } from "react";
import axios from "axios";

class Random extends Component {
  constructor() {
    super();
    this.state = {
      random: " "
    };
  }
  componentDidMount() {
    axios.get(`/api/jokes/random`).then(results => {
      console.log(results.data.value);
      //   this.setState({ random: results.data });
    });
  }

  render() {
    return <div>HI</div>;
  }
}

export default Random;
