const express = require("express");
const testRouter = require("./router");

const PORT = 4000;
const app = express();

const jsonParser = express.json();

app.use(jsonParser);

// Router;
app.use("/router", testRouter);

// Middlewares
// REQUEST   =>   middlewares | middleware3   => Routes  => express error handler

// Middleware function
function logginMiddleware(req, res, next) {
  const currentTime = new Date();
  console.log("Request recieved in middleware!!", currentTime);
  next();
}

function allRoutesMiddleware(req, res, next) {
  console.log("App level middleware!");
  next();
}

// App level middleware
app.use(allRoutesMiddleware);

// Route level
app.get("/testMiddleware", logginMiddleware, (req, res, next) => {
  res.json("Im in the route");
});

app.get("/", (req, res) => {
  res.json("Hi back!");
});

app.listen(PORT, () => console.log("Server running!"));
