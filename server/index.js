const express = require('express');
const app = express();
const port = 7170;
const Maze = require('./Maze/maze');

app.use(express.json());


app.post('/maze', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", () => {
      const sizes = JSON.parse(data);
      const maze = new Maze();
      const map = maze.generate(sizes.x, sizes.y);

      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(map));
  });

  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
