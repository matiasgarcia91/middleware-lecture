const express = require("express");

const PORT = 4000;
const app = express();

// parser middleware
const jsonParser = express.json();
app.use(jsonParser);

app.get("/", (req, res) => {
  res.json("Hi back!");
});

app.listen(PORT, () => console.log("Server running!"));
