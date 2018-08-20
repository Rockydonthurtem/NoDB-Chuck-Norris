const axios = require("axios");
let joke = [];
let favorites = [];
let random = [];
let name = [];
let id = 0;

module.exports = {
  read: (req, res, next) => {
    axios.get(`https://api.icndb.com/jokes`).then(results => {
      // console.log("RESULTS HEAR CEDRIC: ", results.data.value);
      let incoming = results.data.value;
      joke = incoming;

      res.status(200).json(joke.slice(0, 15));
    });
  },

  big: (req, res, next) => {
    axios.get(`https://api.icndb.com/jokes/random`).then(results => {
      // console.log(results, "Random results here");
      let oneOff = results.data.value;
      random.push(oneOff);
      // console.log(random);
      res.status(200).send(random);
    });
  },
  nameName: (req, res, next) => {
    axios
      .get(
        `http://api.icndb.com/jokes/random?firstName=${
          req.body.firstName
        }&amp;lastName=${req.body.lastName}`
      )
      .then(results => {
        console.log(results, "RESULTS HERE");
        // console.log(req.body, "CHECK HERE");
        name.push(results.data.value);
        console.log(results.data.value, "For Name HERE");

        res.status(200).send(name);
      });
  },
  create: (req, res, next) => {
    console.log(req.body);
    // const { joke } = req.body;
    favorites.push(req.body);
    res.status(200).json(favorites);
    //plan JS on back end
  },

  delete: (req, res, next) => {
    console.log(req.params);
    const deleteJoke = req.params.id;
    minusOne = favorites.map(e => e.id === deleteJoke);
    favorites.splice(minusOne, 1);
    res.status(200).json(favorites);
  },

  update: (req, res, next) => {
    // console.log(req.body);
    const { text } = req.body;
    const updateArray = favorites.map(e => {
      if (e.id == req.params.id) {
        e.joke = text;
      }
      return e;
    });

    // console.log(updateArray, "indexIsHere");
    favorites = updateArray;

    // favorites[updateIndex] = {
    //   id: id,
    //   joke: text || e.joke
    // };
    res.status(200).send(favorites);
  }

  //http://api.icndb.com/jokes/random (Get random & add it to favorites)
  //api.icndb.com/jokes/count
  //http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
  //Use catergory to display explicit jokes
};
