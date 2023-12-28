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
      response.end(JSON.stringify({isValid: isValid}));
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
      if (alg === "Алгоритм Ли") {
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

        let path = instanceMaze.leeAlgorithm(map, y, x, start.x, start.y, finish.x, finish.y);
        path = path.reverse();
        console.dir("Answer: ")
        console.dir(path);
        const maze1 = instanceMaze.OverlayLee(maze, path);
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ maze: maze1, path: path }));
      } else {
        const y = maze.length;
        const x = maze[0].length;
        const map = new Array(x);
        for (let k = 0; k < x; k++) {
          map[k] = new Array(y);
          for (let j = 0; j < y; j++)
            map[k][j] = {};
        }
        const map1 = new Array(x);
        for (let k = 0; k < x; k++) {
          map1[k] = new Array(y);
          for (let j = 0; j < y; j++)
            map1[k][j] = {};
        }
        let start = {};
        let finish = {};
        maze.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell.isWall) {
              map[y][x] = 1;
              map1[x][y] = 0;
            }
            else {
              map[y][x] = 0;
              map1[x][y] = 1;
            }

            if (cell.isStart) {
              start = {x: x, y: y};
              map[y][x] = 1;
              map1[x][y] = 0;
            }
            if (cell.isFinish) {
              finish = {x: x, y: y};
              map[y][x] = 1;
              map1[x][y] = 0;
            }
          })
        })
        const {find, path1} = instanceMaze.solveMaze(map, start, finish);
        let pathLee = instanceMaze.leeAlgorithm(map1, y, x, start.x, start.y, finish.x, finish.y);


        // если есть в массиве три (пять) одинаковые координаты, то надо удалить последнюю из них
        path1.forEach(coord1 => {
          let counter = 0;
          let indexLast = 0;
          path1.forEach((coord2, index) => {
            if (coord1.col === coord2.col && coord1.row === coord2.row) {
              indexLast = index;
              counter++;
            }
          })

          if (counter === 3 || counter === 5) {
            path1.splice(indexLast, 1);
          }
        })
        
        const path = path1.map((item, index) => {
          return [item.col, item.row, index]
        })

        // maze
        const newMap = new Array(maze.length);
        for (let index = 0; index < path.length; index++) {
          for (let i = 0; i < maze.length; i++) {
            newMap[i] = new Array(maze[0].length)
            for (let j = 0; j < maze[0].length; j++) {
              const currentCellPath = path[index];
              const x = currentCellPath[1];
              const y = currentCellPath[0];
              if (i === x && j === y && maze[x][y].isPath) 
                newMap[i][j].isPath = false;
              else if (i === x && j === y) 
                newMap[i][j].isPath = true;
              else {
                for (let k = 0; k < pathLee.length; k++) {
                  const currentCellPathLee = pathLee[k];
                  const xLee = currentCellPathLee[1];
                  const yLee = currentCellPathLee[0];
                  if (i === xLee && j === yLee) {
                      newMap[i][j].isPath = true;
                  }
              }
            }
          }
        }
      }


        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ path: path, pathLee: newMap }));
      }
  });
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
