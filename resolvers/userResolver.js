const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    Mutation: {
        async signUpUser(parent, args, context) {
            let { email, password: _password, username } = args;
            let {
                User,
                env: { BCRYPT_SALT },
            } = context;

            let password = await bcrypt.hash(_password, parseInt(BCRYPT_SALT));
            let newUser = await User.create({ email, password, username });
            console.log({ newUser });
            return newUser;
        },
        async signInUser(parent, args, context) {
            let { email, password } = args;
            let {
                model: { User },
                env: { JWT_SECRET },
            } = context;
            console.log(JWT_SECRET);

            let {
                _id,
                password: hashedPassword,
                username,
            } = await User.findOne({ email });

            console.log(hashedPassword);

            let isValid = await bcrypt.compare(password, hashedPassword);
            if (!isValid) {
                return "wrong email or password";
            }

            let user = { _id, email, username };
            let token = jwt.sign(user, JWT_SECRET, { expiresIn: "10h" });

            return { token };
        },
    },
};
