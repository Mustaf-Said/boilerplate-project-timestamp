// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", (req, res) => {
  let yourIP = req.ip;
  let yourLanguage = req.header("accept-language");
  let yourSoftware = req.header("user-agent");
  res.json({
    ipaddress: yourIP,
    language: yourLanguage,
    software: yourSoftware,
  });
});

//You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url
async (getUserInput) => {
  const url = getUserInput("https://dummyjson.com/todos/add");
  const res = await fetch(url + "/api/shorturl", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({
      todo: "https://freeCodeCamp.org",
      completed: true,
      userId: 99,
    }),
  });
  if (res.ok) {
    const { error } = await res.json();
    assert.isNotNull(error);
    assert.strictEqual(error.toLowerCase(), "invalid url");
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};

//Todo api
/* fetch("https://dummyjson.com/todos/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    todo: "freeCodeCamp",
    completed: true,
    userId: 99,
  }),
})
  .then((res) => res.json())
  .then(console.log); */

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
