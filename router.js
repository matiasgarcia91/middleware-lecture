const { Router } = require("express");

const router = new Router();

router.get("/hi", (req, res, next) => {
  res.json("hi from router!");
});

module.exports = router;
