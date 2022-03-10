const Router = require("express").Router({
    caseSensitive: true,
});
// controller
const { UserController } = require("../controllers");
Router.post("/auth/user", UserController);

module.exports = Router;
