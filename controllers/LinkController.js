const { join } = require("path");
const { readFileSync } = require("fs");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");

const context = {
    model: require("../models"),
};
const graphiql = false;
const resolvers = require("../resolvers/linkResolver");
const typeDefs = `${readFileSync(join(__dirname, "../schema.graphql"), {
    encoding: "utf8",
})}`;
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = graphqlHTTP((req, res) => ({
    context: { ...context, req },
    graphiql,
    schema,
}));
