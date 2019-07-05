const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Owner = require("../owner/Owner");

module.exports = {
    /**
     * Check for authenticity and returns the JWT.
     * @param {LoginInput} args contains details for login.
     */
    login: async args => {
        const query = JSON.parse(JSON.stringify(args.login));
        console.log("This is a login query", query);
        const owner = await Owner.findOne({
            email: query.userId
        });
        let token = "";

        // Check if owner exist.
        if (owner) {
            // Check if password matches.
            const isMatch = await bcrypt.compareSync(
                query.pwd,
                owner.pwd,
                (err, isMatch) => {
                    return isMatch;
                }
            );

            if (isMatch) {
                // Create a token if password is match.
                token = jwt.sign({
                    username: query.userId
                }, "secretKeyUsedForDecrypt", {
                    expiresIn: "24h"
                });
            }
        }

        const AuthData = {
            userId: query.userId,
            token: token,
            tokenExpiration: 30
        };

        return AuthData;
    }
};