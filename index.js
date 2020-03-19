const express = require("express");
const testRouter = require("./router");

const PORT = 4000;
const app = express();

app.get("/", (req, res) => {
  res.json("Hi back!");
});

// Router;
app.use("/router", testRouter);

app.listen(PORT, () => console.log("Server running!"));
