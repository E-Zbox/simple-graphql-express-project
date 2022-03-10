module.exports = {
    message: (args, context) => {
        let {
            info: { data },
            req,
        } = context;
        console.log(req.user);
        return `Welcome ${data}`;
    },
};
