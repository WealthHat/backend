const Profiling = require('../../models/user/profilingModel');
const User = require('../../models/user/userModel');

const profilingCtrl = {
  // create user profiling
  createProfiling: async (req, res) => {
    try {
      const {
        howold,
        situation,
        retire,
        financial,
        goal,
        withdraw,
        when,
        percentage,
        likely,
        approach,
      } = req.body;

      //    validate for empty fields
      if (
        !howold ||
        !situation ||
        !retire ||
        !financial ||
        !goal ||
        !withdraw ||
        !when ||
        !percentage ||
        !likely ||
        !approach
      )
        return res.status(400).json({ msg: 'Field cannot be empty' });

      // check if user is logged in
      const user = await User.findById(req.user.id);
      if (!user)
        return res.status(400).json({ msg: 'Please login to continue' });

      //  get only the values from the requst object and turn it into an array
      let result = Object.values(req.body);

      // map through and convert to Int
      const resp = result.map((item) => {
        return parseInt(item, 10);
      });

      // add all the values in the array together
      const response = resp.reduce((acc, item) => {
        return acc + item;
      }, 0);

      // calculate the user risk profile score based on the provided information from the body of the request
      let profile;

      if (response >= 76) {
        profile = 'Aggressive';
      } else if (response >= 62) {
        profile = 'Growth';
      } else if (response >= 48) {
        profile = 'Balanced';
      } else if (response >= 34) {
        profile = 'Cautious';
      } else {
        profile = 'Conservative';
      }

      // update user information
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          riskProfile: profile,
          profileScore: response,
          isProfiled:true
        }
      );

      // save data in the database
      const newProfile = new Profiling({
        howold,
        situation,
        retire,
        financial,
        goal,
        withdraw,
        when,
        percentage,
        likely,
        approach,
        createdBy: req.user,
      });

      await newProfile.save()
      res.json({ msg: 'Your profiling information has been saved' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = profilingCtrl;
