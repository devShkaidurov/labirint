const express = require('express');
const app = express();

app.post('/checkUser', function (req, res) {
    res.send(req)
})
  
app.listen(7171);