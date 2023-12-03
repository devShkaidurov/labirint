const express = require('express');
const app = express();
const port = 7170;
const { init, authUser, registerUser, saveMaze, getMazes } = require('./database');
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

app.post('/saveMaze', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      response.setHeader("Content-Type", "application/json");
      saveMaze(payload).then(res => {
        response.end(JSON.stringify(res));
      }, rej => {
        response.end(JSON.stringify(rej));
      })
      .catch(err => {
        response.end(JSON.stringify(err));
      })
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
      const map = instanceMaze.generateAnaloguePrime(widthMaze, heightMaze, 1, start.y, start.x, finish.y, finish.x);
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(map));
  });
})

app.get('/getMazes', (req, response) => {
  response.setHeader("Content-Type", "application/json");
  getMazes().then(res => {
    response.end(JSON.stringify(res));
  }, rej => {
    response.end(JSON.stringify(rej));
  })
  .catch(err => {
    response.end(JSON.stringify(err));
  })
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
      // const map = instanceMaze.generateBT(widthMaze, heightMaze, 0, 5, 14, 20);
      const map = instanceMaze.generateBT(widthMaze, heightMaze, start.y, start.x, finish.y, finish.x);
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(map));
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
