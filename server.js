const express = require("express");
const { toData, toJWT } = require("./auth/jwt");

const PORT = 4000;
const app = express();

// parser middleware
const jsonParser = express.json();
app.use(jsonParser);

// Logging middleware with header
function logginMiddleware(req, res, next) {
  const currentTime = new Date();
  console.log("request recieved at:", currentTime);
  res.setHeader("X-Codaisseur-Time", currentTime);
  next();
}

// fail randomly middleware
function failRandomly(req, res, next) {
  if (Math.random() * 2 >= 1) {
    console.log("request success!");
    next();
  } else {
    res.status(500).send("Request failed randomly");
  }
}

// applying middleware at app level
app.use(logginMiddleware);

app.get("/", (req, res) => {
  console.log("Got to route");
  res.json("Hi back!");
});

// middleware at route level
app.get("/success", failRandomly, (req, res) => {
  res.json("never failing");
});

// JWT token

app.get("/token", (req, res, next) => {
  // Real life example:
  // get email and password in login route
  // check our tables for that user
  // get back a userId || user doesn't exist
  // if user exists => grab his id and create a token.
  const userId = 1;
  const token = toJWT({ userId });
  res.send({ token });
});

app.get("/checkToken", (req, res, next) => {
  // check for an Authorization header
  // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4NDYyMzE2MiwiZXhwIjoxNTg0NjMwMzYyfQ.cGJt3jUGsZKpWmJ7JXNMFHasBof544ehvLKsINC1IDE"
  const authorization = req.headers.authorization;
  const auth = authorization.split(" "); // => ["Bearer", "tokemaouihdiadohasoidh"]\

  // check split auth header for authType (Bearer) and if there is anything in the second index
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // try and decode the token
    try {
      const data = toData(auth[1]);

      // show the decoded data => userId + info about expiry
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(PORT, () => console.log("Server running!"));
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4NDYyMzE2MiwiZXhwIjoxNTg0NjMwMzYyfQ.cGJt3jUGsZKpWmJ7JXNMFHasBof544ehvLKsINC1IDE
