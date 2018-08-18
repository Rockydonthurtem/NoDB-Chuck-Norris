import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Iii from "./component/Iii";
import Random from "./component/Random";

class App extends Component {
  constructor() {
    super();
    this.state = {
      joke: [],
      favorites: []
    };
    this.addToFavorites = this.addToFavorites.bind(this);
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
        </div>
      );
    });
    return (
      <div className="App">
        <Random />
        <Iii />
        <div className="card">
          {pen}
          {pod}
        </div>
      </div>
    );
  }
}

export default App;
