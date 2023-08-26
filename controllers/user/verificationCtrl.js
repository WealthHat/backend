const Verification = require('../../models/user/verificationModel');
const User = require('../../models/user/userModel');

const verificationCtrl = {
  // create user profiling
  verification: async (req, res) => {
    try {
      const { gender, nationality, dob, phone, address } = req.body;

      //    validate for empty fields
      if (!gender || !nationality || !dob || !phone || !address)
        return res.status(400).json({ msg: 'Field cannot be empty' });

      // check if user is logged in
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(400).json({ msg: 'Please login to continue' });

      // check if the user has completed his profiling
      if (!user.isProfiled) {
        return res
          .status(401)
          .json({
            msg: 'Please complete your profiling information before verification',
          });
      }

      // update user information
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          isVerified: true,
        }
      );

      // save data in the database
      const newVerify = new Verification({
        gender,
        nationality,
        dob,
        phone,
        address,
        createdBy: req.user,
      });

      await newVerify.save();
      res.json({ msg: 'Your verification information has been saved' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = verificationCtrl;
