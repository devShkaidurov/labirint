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
      const instanceMaze = new Maze();
      const isValid = instanceMaze.checkOnValidMaze(payload);
      console.dir("Is valid: " + isValid);
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ isValid: isValid}));
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

app.post('/getPath', (req, response) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", async () => {
      const payload = JSON.parse(data);
      const alg  = payload.alg;
      let maze = payload.maze;
      const instanceMaze = new Maze();
      if (true || alg === "Алгоритм Ли") {
        const y = maze.length;
        const x = maze[0].length;
        const map = new Array(x);
        for (let k = 0; k < x; k++) {
          map[k] = new Array(y);
          for (let j = 0; j < y; j++)
            map[k][j] = {};
        }
        let start = {};
        let finish = {};
        maze.forEach((row, y) => {
          console.dir(row);
          row.forEach((cell, x) => {
            if (cell.isWall)
              map[x][y] = 0;
            else 
              map[x][y] = 1;

            if (cell.isStart) {
              start = {x: x, y: y};
              map[x][y] = 0;
            }
            if (cell.isFinish) {
              finish = {x: x, y: y};
              map[x][y] = 0;
            }
          })
        })

        const path = instanceMaze.leeAlgorithm(map, y, x, start.x, start.y, finish.x, finish.y);
        console.dir("Answer: ")
        console.dir(path);
        const maze1 = instanceMaze.OverlayLee(maze, path);
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ maze: maze1, path: path }));
      } else {
        let start = {};
        maze.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell.isStart) {
              start = {x: x, y: y};
            }
          })
        })
        const ans = instanceMaze.setNeighbourStartFinish(maze.length, maze[0].length, start.x, start.y);
        const nSx=ans[0][0];
        const nSy=ans[0][1];
        const maze1 = instanceMaze.findExit(maze, nSy, nSx);
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ maze: maze1 }));
      }
  });
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
