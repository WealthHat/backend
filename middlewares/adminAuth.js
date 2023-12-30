const jwt = require('jsonwebtoken');
const Admin = require('../models/admin/adminModel');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Invalid Authentication' });

    // validate the jwt
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: 'Invalid Authorization' });

     

      const { id } = user;
      Admin.findById(id).then((userdata) => {
        // check for admin
        if (userdata.role !== 5) {
          return res
            .status(401)
            .json({ msg: 'Only super admin can access this route' });
        }

        req.user = userdata;
        next();
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
