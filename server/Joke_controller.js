const axios = require("axios");
let joke = [];
let favorites = [];
let random = [];
let id = 0;

module.exports = {
  read: (req, res, next) => {
    axios.get(`https://api.icndb.com/jokes`).then(results => {
      console.log("RESULTS HEAR CEDRIC: ", results.data.value);
      let incoming = results.data.value;
      joke = incoming;

      res.status(200).json(joke.slice(0, 15));
    });
  },

  big: (req, res, next) => {
    axios.get(`https://api.icndb.com/jokes/random`).then(results => {
      console.log(results);
      let oneOff = results.data;
      random.push(oneOff);
      console.log(random);
      res.status(200).send(random);
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
  }
  //http://api.icndb.com/jokes/random (Get random & add it to favorites)
  //api.icndb.com/jokes/count
  //http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
  //Use catergory to display explicit jokes
};
