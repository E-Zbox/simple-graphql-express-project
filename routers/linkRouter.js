const Router = require("express").Router({
    caseSensitive: true,
    strict: true,
});
// controllers
const { LinkController } = require("../controllers");
// utils
const isAuth = require("../utils/isAuth");

Router.post("/link", isAuth, LinkController);

module.exports = Router;
