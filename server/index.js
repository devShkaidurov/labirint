const express = require('express');
const app = express();
const port = 7170;
const { init, authUser, registerUser } = require('./database');
const { getRandomEntries } = require('./helperMethods');
const Maze = require('./maze');

app.use(express.json());

// realize methods
app.post('/register', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", () => {
      const payload = JSON.parse(data);
      response.setHeader("Content-Type", "application/json");
      registerUser(payload).then(res => {
        response.end(JSON.stringify(res));
      }, rej => {
        response.end(JSON.stringify(rej));
      })
      .catch(err => {
        response.end(JSON.stringify(err));
      })
  });
});

app.post('/auth', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      response.setHeader("Content-Type", "application/json");
      authUser(payload).then(res => {
        response.end(JSON.stringify(res));
      }, rej => {
        response.end(JSON.stringify(rej));
      })
      .catch(err => {
        response.end(JSON.stringify(err));
      })
  });
});

app.post('/getRandomEntry', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const maze = JSON.parse(data);
      response.setHeader("Content-Type", "application/json");
      const entries = getRandomEntries(maze);
      response.end(JSON.stringify(entries));
  });
})

// unrealize methods
app.post('/validateMaze', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      response.setHeader("Content-Type", "application/json");
      const isValid = true;
      response.end(JSON.stringify(isValid));
  });
})


app.post('/saveMaze', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      const maze = payload.maze;
      const name = payload.name;
      console.dir(maze);
      console.dir(name);
      response.setHeader("Content-Type", "application/json");
      // const entries = getRandomEntries(maze);
      response.end(JSON.stringify({ok: true}));
  });
})

app.post('/createPrime', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      const heightMaze = payload.height;
      const widthMaze = payload.width;
      const start = payload.start;
      const finish = payload.finish;

      const instanceMaze = new Maze();
      const map = instanceMaze.generatePrime(widthMaze, heightMaze, start.y, start.x, finish.y, finish.x);
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(map));
  });
})

app.post('/createBT', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      const heightMaze = payload.height;
      const widthMaze = payload.width;
      const start = payload.start;
      const finish = payload.finish;

      const instanceMaze = new Maze();
      const map = instanceMaze.generateBT(widthMaze, heightMaze, start.y, start.x, finish.y, finish.x);
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(map));
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
