const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Owner = require("../owner/Owner");

module.exports = {
  /**
   * Check for authenticity and returns the JWT.
   * @param {LoginInput} args contains details for login.
   */
  login: async args => {
    try {

      console.log("This is a login query", args);
      const query = JSON.parse(JSON.stringify(args.login));
      const owner = await Owner.findOne({
        email: query.username
      });

      let authData = {
        error: "Username or Password incorrect"
      };

      if (owner) {
        // Check if password matches.        
        const isMatch = await bcrypt.compareSync(
          query.pwd,
          owner.pwd,
          (err, isMatch) => {
            return isMatch;
          }
        );

        // Create a token if password is match.
        if (isMatch) {
          let token = jwt.sign({
              userId: owner._id
            },
            "secretKeyUsedForDecrypt", {
              expiresIn: "24h"
            }
          );
          authData = {
            token: token,
            tokenExpiration: 24
          };
          return {
            data: authData
          };
        }
      };

      return authData;
      
    } catch (err) {
      console.log(err);
    }
  }

};