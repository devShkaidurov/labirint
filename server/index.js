const http = require('http');

http.createServer(function (request, response) {
  if (request.url === "/auth") {
    console.log("Server auth...");
    let data = "";
        request.on("data", chunk => {
            data += chunk;
        });
        request.on("end", () => {
            console.log(JSON.parse(data));
            response.end("Данные успешно получены");
        });
  } 
  
  else if (request.url === "/regiser") {
    console.log("Register...");
    let data = "";
        request.on("data", chunk => {
            data += chunk;
        });
        request.on("end", () => {
            console.log(JSON.parse(data));
            response.end("Данные успешно получены");
        });
  } 
  
  else {
    response.statusCode = 404;
    response.write("Not Found");
  }

  response.end();
}).listen(7171);