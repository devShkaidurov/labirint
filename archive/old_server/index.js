const express = require('express');
const app = express();
const port = 7170;
const Maze = require('./Maze/maze');

app.use(express.json());

const maze = new Maze();

app.post('/maze', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", () => {
      const sizes = JSON.parse(data);
      // const map = maze.generatePrime(sizes.x, sizes.y);
      const map = maze.generateBT(sizes.x, sizes.y);

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({x: 123}));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
