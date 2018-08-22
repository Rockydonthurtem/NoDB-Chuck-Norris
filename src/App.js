import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Iii from "./component/Iii";
import Name from "./component/Name";
import Header from "./component/Header";
import Random from "./component/Random";
import router from "./router";

class App extends Component {
  constructor() {
    super();
    this.state = {
      joke: [],
      favorites: [],
      updateJoke: " "
    };
    this.addToFavorites = this.addToFavorites.bind(this);
    this.handleJokeUpdate = this.handleJokeUpdate.bind(this);
  }
  componentDidMount() {
    axios.get("/api/jokes").then(results => {
      // console.log(results.data[0].value);
      // this.setState({ joke: results.data[0].value });
      console.log(results);
      this.setState({ joke: results.data });
    });
  }
  addToFavorites(joke) {
    // console.log(joke)
    axios.post(`/api/jokes`, joke).then(results => {
      console.log(results);
      this.setState({ favorites: results.data });
    });
  }
  deleteFav(id) {
    axios.delete(`/api/jokes/${id}`).then(results => {
      console.log(results);
      this.setState({ favorites: results.data });
    });
  }
  updateFav(id, text) {
    console.log(this.state);
    axios.put(`/api/jokes/${id}`, { text }).then(results => {
      console.log(results);
      this.setState({ favorites: results.data, updateJoke: "" });
    });
  }
  handleJokeUpdate(val) {
    this.setState({ updateJoke: val });
  }

  render() {
    // console.log(this.state.favorites, "state");
    // let gp = this.state.joke.map(joke => {
    // return (
    //   // <div key={joke.id}>
    //   //   {joke.joke}
    //   // </div>
    // )
    // });
    let pod = this.state.joke.map(joke => {
      return (
        <div className="big" key={joke.id}>
          <p className="favor">{joke.joke}</p>
          <button
            className="addToFav"
            onClick={() => this.addToFavorites(joke)}
          >
            Get Sum
          </button>
        </div>
      );
    });
    let pen = this.state.favorites.map((e, id) => {
      return (
        <div key={e.id} className="One">
          <p className="joke" onClick={() => this.deleteFav(id)}>
            {e.joke}
          </p>
          <div>
            <br />
            <input
              className="updateJoke"
              onChange={e => this.handleJokeUpdate(e.target.value)}
              type="text"
              placeholder="You think you're funnier than me?"
              value={this.state.updateJoke}
            />
            <button
              onClick={() => this.updateFav(e.id, this.state.updateJoke)}
              value={this.state.updateJoke}
            >
              Edit Joke
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        <div />
        <Header />
        {router}

        <Iii />
        <div className="card">
          <div className="pod">{pod}</div>
          {pen}
        </div>

        <div className="namerr">
          <Name />
          <br />
          <br />
          <br />
          <Random>
            What is this you ask? Thiss is a rendering of a child prop using
            props.children of this.props.children
          </Random>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
