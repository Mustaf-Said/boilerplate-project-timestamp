// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
/* 
function isValidDate(date) {
  return (
    date &&
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date)
  );
}

function isValidTimeStamp(timestamp) {
  const result = new Date(timestamp).getTime() > 0;
  console.log("Timestamp: " + timestamp + " is " + result);
  return result;
} */

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
/* 
app.get("/api/", function (req, res) {
  res.json({
    unix: Math.floor(new Date().getTime()),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  if (isValidDate(new Date(req.params.date))) {
    res.json({
      unix: Math.floor(new Date(req.params.date).getTime()),
      utc: new Date(req.params.date).toUTCString(),
    });
  } else if (parseInt(req.params.date)) {
    console.log("NAN: " + req.params.date);
    res.json({
      unix: parseInt(req.params.date),
      utc: new Date(parseInt(req.params.date)).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});
// ip requist
app.get("/api/whoami", (req, res) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress;
  res.json({ ip: clientIp });
});

// lang requist
app.get("/api/whoami", (req, res) => {
  // Extract the "Accept-Language" header
  const preferredLanguage = req.headers["accept-language"] || "unknown";
  // Respond with a JSON object containing the preferred language
  res.json({ language: preferredLanguage });
});
app.get("/api/whoami", (req, res) => {
  // Extract the "User-Agent" header
  const software = req.headers["user-agent"] || "unknown";

  // Respond with a JSON object containing the software information
  res.json({ software });
}); */
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
const url = "https://boilerplate-project-urlshortener.josealfu.repl.co/?v=1649098774645";
const data = { original_url: "https://freeCodeCamp.org" };

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Shortened URL:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
