const express = require('express');
const app = express();
const port = 7170;
const { init, authUser, registerUser } = require('./database');
const { getRandomEntries } = require('./helperMethods');

app.use(express.json());

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

app.listen(port, () => {
  // init().then(() => {
  //   console.log("Server has connected to database.")
  // }, () => {
  //   console.log("Server cannot connect to database. Server stopped! ");
  //   app.close();
  // });
  console.log(`Server listening on port ${port}`)
})
