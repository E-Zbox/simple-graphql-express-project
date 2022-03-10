module.exports = {
    Link: {
        async user(parent, args, context) {
            console.log(parent);
            let { _id } = parent;
            let {
                model: { Link, User },
            } = context;

            let { user } = await Link.findById(_id);
            return await User.findById(user);
        },
    },
    Query: {
        async getLink(parent, args, context) {
            let {
                input: { _id },
            } = args;
            let {
                model: { Link },
            } = context;

            let link = await Link.findById(_id);
            return link;
        },
        async getLinks(parent, args, context) {
            let {
                input: { limit, skip },
            } = args;
            let {
                model: { Link },
            } = context;

            let links;

            if (limit && !skip) {
                links = await Link.aggregate([{ $limit: limit }]);
            } else if (!limit && skip) {
                links = await Link.aggregate([{ $skip: skip }]);
            } else if (limit && skip) {
                links = await Link.aggregate([
                    { $skip: skip },
                    { $limit: limit },
                ]);
            } else {
                links = await Link.find();
            }
            return links;
        },
    },
    Mutation: {
        async createLink(args, context) {
            console.log("args", args);
            let {
                input: { url, description },
            } = args;
            let {
                model: { Link, User },
                req: {
                    user: { _id: user },
                },
            } = context;

            let newLink = await Link.create({ url, description, user });
            console.log({ newLink });
            let updatedUser = await User.updateOne(
                { _id: user },
                { $push: { links: newLink._id } }
            );
            console.log({ updatedUser });
            return newLink;
        },
        async updateLink(args, context) {
            let {
                input: { _id, ...others },
            } = args;
            let {
                model: { Link },
            } = context;

            let updatedLink = await Link.updateOne({ _id }, { ...others });
            console.log({ updatedLink });
            return updatedLink;
        },
    },
};
