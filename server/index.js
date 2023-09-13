const express = require('express');
const app = express();
const port = 7171;

app.post('/auth', (req, res) => {
  let data = "";
  req.on("data", chunk => {
      data += chunk;
  });
  req.on("end", () => {
      console.log(JSON.parse(data));
  });

  res.statusCode = 200;
  res.end(JSON.stringify({message: "Hello from server!"}));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})