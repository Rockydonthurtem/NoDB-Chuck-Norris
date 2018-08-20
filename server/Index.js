const express = require("express");
const bodyParser = require("body-parser");
Joke_controller = require("./Joke_controller");

const app = express();
app.use(bodyParser.json());

app.get(`/api/jokes`, Joke_controller.read);
app.get(`/api/jokes/random`, Joke_controller.big);
app.post(`/api/name`, Joke_controller.nameName);
app.post(`/api/jokes`, Joke_controller.create);
app.delete(`/api/jokes/:id`, Joke_controller.delete);
app.put(`/api/jokes/:id`, Joke_controller.update);
const Port = 3001;

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
