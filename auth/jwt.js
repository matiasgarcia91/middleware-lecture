// require jsonwebtoken
const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

function toJWT(data) {
  // userId
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  // reverse process.
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
