const path = require("path");
const staticFileHandler = require("./staticFileHandler");

const handleStaticFiles = (req, res) => {
  const filePath = `./frontend/dist/${req.url}`;
  // get ext name
  const extName = String(path.extName(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
    ".ico": "image/x-icon",
  };
  const contentType = mimeTypes[extName] || "application/octet-stream";
  return staticFileHandler(req, res, filePath, contentType);
};

const handleApi = (res) => {
  res.writeHead(200, {
    ContentType: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
  });
  res.end(JSON.stringify({ message: "hello from the server" }));
};

const requestListener = (req, res) => {
  // get url
  const { url } = req;
  console.log(url);
  //public directory
  if (url === "/") {
    return staticFileHandler(req, res, "./frontend/dist/index.html", "text/html");
  }

  if (url.include("api")) {
    return handleApi(res);
  }
  return handleStaticFiles(req, res);
};

module.exports = requestListener;
