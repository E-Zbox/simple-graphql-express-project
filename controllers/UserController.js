require("dotenv").config();
const { BCRYPT_SALT, JWT_SECRET } = process.env;
const { join } = require("path");
const { readFileSync } = require("fs");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");
// models
const { User } = require("../models");

const context = {
    model: { User },
    env: { BCRYPT_SALT, JWT_SECRET },
};
const graphiql = false;
const resolvers = require("../resolvers/userResolver");
const typeDefs = readFileSync(join(__dirname, "../schema.graphql"), {
    encoding: "utf8",
});
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = graphqlHTTP({ context, graphiql, schema });
