import React, { Component } from "react";
import axios from "axios";
// import Header from "./Header";

class Name extends Component {
  constructor() {
    super();
    this.state = {
      nameChanger: [],
      updateName: [],
      firstName: " ",
      lastName: " "
    };
  }
  componentDidMount() {
    // console.log(this.state);
    axios.get(`/api/name`).then(results => {
      console.log(results);
      this.setState({
        nameChanger: results.data.value
      });
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
  }
  handleChange(e) {
    this.setState({ firstName: e });
  }
  handleLastChange(e) {
    this.setState({ lastName: e });
  }
  postName(firstName, lastName) {
    console.log(firstName, lastName);
    axios.post(`/api/name`, { firstName, lastName }).then(results => {
      console.log(results);
      this.setState({
        updateName: results.data,
        firstName: "",
        lastName: ""
      });
    });
  }
  render() {
    //why is nameChanger and updateName an empty array
    console.log(this.state);
    let toy = this.state.updateName.map((e, i) => {
      console.log(e);
      return <div key={i}>{e.joke}</div>;
    });
    return (
      <div className="Names">
        <div className="toy">{toy}</div>

        <input
          onChange={e => this.handleChange(e.target.value)}
          value={this.state.firstName}
          type="text"
          placeholder="First name"
        />
        <input
          onChange={e => this.handleLastChange(e.target.value)}
          value={this.state.lastName}
          type="text"
          placeholder="Last name"
        />
        <br />
        <button
          onClick={() =>
            this.postName(this.state.firstName, this.state.lastName)
          }
        >
          New Name
        </button>
        <br />
      </div>
    );
  }
}
export default Name;
