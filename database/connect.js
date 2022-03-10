const { connect } = require("mongoose");

module.exports = (dbUri) =>
    connect(dbUri, { dbName: "simple-graphql-express-project" })
        .then((res) =>
            console.log(
                "connected to database. \nDbname : ",
                simple - graphql - express - project
            )
        )
        .catch((err) => {
            console.log(err);
            process.kill(1);
        });
