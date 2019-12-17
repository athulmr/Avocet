const JWT = require('jsonwebtoken');
const User = require('../model/User');
const { JWT_SECRET } = require('../config');

signToken = user => {
  console.log('signToken', user);
  
  const token = JWT.sign({
    iss: 'AvocetApp',
    sub: user._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
  return {
    token,
    user
  }
}

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password } = req.value.body;
    console.log('sign up');
    

    // Check if there is a user with the same email
    let foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Is there a Google account with the same email?
    foundUser = await User.findOne({ 
      $or: [
        { "google.email": email },
        { "facebook.email": email },
      ] 
    });
    if (foundUser) {
      // Let's merge them?
      foundUser.methods.push('local')
      foundUser.local = {
        email: email, 
        password: password
      }
      await foundUser.save()
      // Generate the token
      const signed = signToken(foundUser);
      // Respond with token
      res.cookie('access_token', signed.token, {
        httpOnly: true
      });
      res.status(200).json({ success: true, user: signed.user });
    }
    
    // Create a new user
    const newUser = new User({ 
      methods: ['local'],
      local: {
        email: email, 
        password: password
      },
      name
    });

    const savedUser = await newUser.save();

    // Removing cred from result
    const userDetails = { 
      _id: savedUser._id,
      email: savedUser.local.email,
      name: savedUser.name,
      restaurants: savedUser.restaurants
    }
    // Generate the token
    const signed = signToken(userDetails);
    // Send a cookie containing JWT
    res.cookie('access_token', signed.token, {
      httpOnly: true
    });
    res.status(200).json({ success: true, user: signed.user });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const signed = signToken(req.user);
    res.cookie('access_token', signed.token, {
      httpOnly: true
    });
    res.status(200).json({ success: true, user : signed.user});
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    // console.log('I managed to get here!');
    res.json({ success: true });
  },

  googleOAuth: async (req, res, next) => {   
    // Generate token
    const signed = signToken(req.user);
    res.cookie('access_token', signed.token, {
      httpOnly: true
    });
    res.cookie('session_token', 'yes');
    res.redirect(302, process.env.REDIRECT_URL);
  },

  linkGoogle: async (req, res, next) => {
    res.json({ 
      success: true,
      methods: req.user.methods, 
      message: 'Successfully linked account with Google' 
    });
  },

  unlinkGoogle: async (req, res, next) => {
    // Delete Google sub-object
    if (req.user.google) {
      req.user.google = undefined
    }
    // Remove 'google' from methods array
    const googleStrPos = req.user.methods.indexOf('google')
    if (googleStrPos >= 0) {
      req.user.methods.splice(googleStrPos, 1)
    }
    await req.user.save()

    // Return something?
    res.json({ 
      success: true,
      methods: req.user.methods, 
      message: 'Successfully unlinked account from Google' 
    });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const signed = signToken(req.user);
    res.cookie('access_token', signed.token, {
      httpOnly: true
    });
    res.status(200).json({ success: true });
  },

  linkFacebook: async (req, res, next) => {
    res.json({ 
      success: true, 
      methods: req.user.methods, 
      message: 'Successfully linked account with Facebook' 
    });
  },

  unlinkFacebook: async (req, res, next) => {
    // Delete Facebook sub-object
    if (req.user.facebook) {
      req.user.facebook = undefined
    }
    // Remove 'facebook' from methods array
    const facebookStrPos = req.user.methods.indexOf('facebook')
    if (facebookStrPos >= 0) {
      req.user.methods.splice(facebookStrPos, 1)
    }
    await req.user.save()

    // Return something?
    res.json({ 
      success: true,
      methods: req.user.methods, 
      message: 'Successfully unlinked account from Facebook' 
    });
  },

  dashboard: async (req, res, next) => {
    console.log('I managed to get here!');
    console.log('dashboard ',req.user);
    
    res.json({ 
      secret: "resource",
      methods: req.user.methods
    });
  },

  checkAuth: async (req, res, next) => {
    // console.log('I managed to get here!', req);
    const userDetails = { 
      _id: req.user._id,
      email: req.user.local.email,
      name: req.user.name,
      restaurants: req.user.restaurants,
      picture: req.user.picture
    }
    res.json({ success: true, user: userDetails });
  }
}