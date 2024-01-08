const User = require("../../models/user/userModel");
const Admin = require("../../models/admin/adminModel");
const Budget = require("../../models/admin/budgetModel");
const Networth = require("../../models/admin/networthModel");
const Performance = require("../../models/admin/performanceModel");
const Blog = require("../../models/admin/blogModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { strictRemoveComma } = require("comma-separator");
const forgotPasswordEmail = require("../../mails/forgotPasswordMail");
const adminRegisterEmail = require("../../mails/admin-register-mail");
const loginEmail = require("../../mails/loginMail");

//

const userCtrl = {
  // register / create admin

  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      // check if the user already exists in the database
      const existing_user = await User.findOne({ email });
      if (existing_user)
        return res
          .status(400)
          .json({ msg: "User already exists with the email address" });

      // password encryption
      const passwordHash = await bcrypt.hash(password, 12);

      // create user object
      const newUser = new Admin({
        username,
        email,
        password: passwordHash,
      });

      // send email to the newly registered user
      adminRegisterEmail(email, username, password);
      await newUser.save();

      // send feedbacl to the client side
      res.json({
        msg: "Account created successfully!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // login user

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // check for user in the database
      const user = await Admin.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Account not found" });

      // check the password provided by the user

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      // Generate the one-time verication code

      const code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();

      // create user object
      const newUser = {
        id: user._id,
        username: user.username,
        email,
        code,
      };

      // Create activation token to save the userdata till they are verified
      const activation_token = createActivationToken(newUser);

      // send email to the newly registered user
      loginEmail(email, user.username, code);

      // send feedbacl to the client side
      res.json({
        msg: "Please provide the code sent to your email to continue",
        activation_token,
      });

      // const token = createAccessToken({ id: user._id });

      // const userData = {
      //   _id: user._id,
      //   username: user.username,
      //   email,
      // };

      // res.json({ msg: "Login successful!", data: { token, user: userData } });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  authenticateLogin: async (req, res) => {
    try {
      const { activation_token, auth_code } = req.body;

      // validate the activation token received
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { code } = user;

      // Check the code provided by the user
      if (strictRemoveComma(auth_code) !== strictRemoveComma(code)) {
        return res.status(401).json({ msg: "Please provide a valid code" });
      }

      // create access token

      const token = createAccessToken({ id: user.id });

      const userData = {
        _id: user.id,
        username: user.username,
        email: user.email,
      };

      res.json({ msg: "Login successful!", data: { token, user: userData } });
    } catch (error) {
      if (error.message === "jwt expired") {
        return res.status(401).json({ msg: "Session expired, Login again" });
      }
      return res.status(500).json({ msg: error.message });
    }
  },

  // get logged in user with the access token created earlier
  getUser: async (req, res) => {
    try {
      // console.log(req)
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: "User not found" });

      const user = await Admin.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // forgot password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Admin.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exists" });

      // Generate the one-time verication code
      const code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();

      const authorised = {
        id: user._id,
        code,
      };

      // Create activation token to save the userdata till they are verified
      const activation_token = createActivationToken(authorised);

      // send email to the user email
      forgotPasswordEmail(email, user.username, code);

      // send feedback to the user
      res.json({
        msg: "Please check your mail to get your one time code",
        activation_token,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // reset your password
  resetPassword: async (req, res) => {
    try {
      const { activation_token, auth_code, password } = req.body;

      // validate the activation token received
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { id, code } = user;

      // Check the code provided by the user
      if (strictRemoveComma(auth_code) !== strictRemoveComma(code)) {
        return res.status(401).json({ msg: "Invalid code" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      await Admin.findOneAndUpdate(
        { _id: id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (error) {
      if (error.message === "jwt expired") {
        return res
          .status(401)
          .json({ msg: "Session expired, Please try again" });
      }

      return res.status(500).json({ msg: error.message });
    }
  },

  // change your password
  changePassword: async (req, res) => {
    try {
      const { account_password, new_password } = req.body;

      const user = await Admin.findOne({ email: req.user.email });
      if (!user) return res.status(400).json({ msg: "User not found" });

      // check if the password matched
      const isMatch = await bcrypt.compare(account_password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Account password is incorrect" });

      const passwordHash = await bcrypt.hash(new_password, 12);

      await Admin.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update user profile
  updateUser: async (req, res) => {
    try {
      const { firstname, lastname } = req.body;

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          firstname,
          lastname,
        }
      );

      res.json({ msg: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateAdminRole: async (req, res) => {
    try {
      const { admin_id } = req.body;

      await User.findOneAndUpdate(
        { _id: admin_id },
        {
          role: 2,
        }
      );

      res.json({ msg: "Role updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      // console.log(req)
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: "User not found" });

      const user = await User.find().select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getDashboardCount: async (req, res) => {
    try {
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: "Agent not found" });

      const blogs = await Blog.find();
      const networth = await Networth.find();
      const budget = await Budget.find();
      const performance = await Performance.find();
      const user = await User.find().select("-password");
      const agent = await Admin.find().select("-password");

      // get only the last 5 newly registered users
      const newUser = user.slice(0, 5);

      res.json({
        count: {
          blogs: blogs.length,
          networth: networth.length,
          budget: budget.length,
          performance: performance.length,
          users: user.length,
          agents: agent.length,
        },
        users: newUser,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllAgent: async (req, res) => {
    try {
      // console.log(req)
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: "User not found" });

      const agent = await Admin.find().select("-password");
      if (!user) return res.status(400).json({ msg: "Agent does not exist" });

      res.json(agent);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

// ===========================
// Activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = userCtrl;
