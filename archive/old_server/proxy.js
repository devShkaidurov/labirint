const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

const URL = "http://127.0.0.1:7170";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(cors({}));

app.use("/", createProxyMiddleware({
    target: URL,
    ws: true,
    logLevel: "debug"
}));

app.listen(7171, "127.0.0.1", () => {
    console.log("Started proxy server!");
})
