const moment = require("moment");
const Admin = require("../../models/admin/adminModel");
const Networth = require("../../models/admin/networthModel");
const User = require("../../models/user/userModel");

const networthCtrl = {
  createNetworth: async (req, res) => {
    try {
      const {
        userId,
        category,
        type,
        assets,
        current_value_naira,
        current_value_dollar,
      } = req.body;

      // check for empty values
      if (
        !userId ||
        category === "" ||
        !category ||
        type === "" ||
        !type ||
        assets === "" ||
        !assets ||
        current_value_naira === "" ||
        !current_value_naira ||
        current_value_dollar === "" ||
        !current_value_dollar
      ) {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      }

      // get the user the networth is being created for
      const user = await User.findById({ _id: userId }).select("-password");

      // save data in the database
      const networth = new Networth({
        category,
        type,
        assets,
        current_value_naira,
        current_value_dollar,
        user: user,
      });

      await networth.save();

      res.json({ msg: "Networth created succcessfully", networth });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  // get all net worth
  getAllNetworth: async (req, res) => {
    try {
      // console.log(req)
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: "User not found" });

      const networths = await Networth.find()
        .populate("user", "_id firstname lastname email")
        .sort("-createdAt");
      if (!networths)
        return res.status(400).json({ msg: "Data does not exist" });

      res.json(networths);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // get all net worth
  getUserNetworth: async (req, res) => {
    try {
      const all_networths = await Networth.find()
        .populate("user", "_id firstname lastname email")
        .sort("-createdAt");
      if (!all_networths)
        return res.status(400).json({ msg: "Data does not exist" });

      // filter through all networths to get single user networths
      const user_networth = all_networths.filter(
        // (item) => console.log(item.user.toString(), req.params.id)
        (item) => item.user._id.toString() === req.params.id
      );

      res.json(user_networth);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update user networth
  updateUserNetworth: async (req, res) => {
    try {
      const {
        id,
        category,
        sub_category,
        assets,
        current_value_naira,
        current_value_dollar,
      } = req.body;

      // check for empty values
      if (
        category === "" ||
        !category ||
        sub_category === "" ||
        !sub_category ||
        assets === "" ||
        !assets ||
        current_value_naira === "" ||
        !current_value_naira ||
        current_value_dollar === "" ||
        !current_value_dollar
      ) {
        return res.status(400).json({ msg: "Inputs cannot be empty" });
      }

      await Networth.findOneAndUpdate(
        { _id: id },
        {
          category,
          sub_category,
          assets,
          current_value_naira,
          current_value_dollar,
        }
      );

      res.json({ msg: "Networth updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  networthChart: async (req, res) => {
    try {
      // get all networths
      const allnetworths = await Networth.find();

      // map through all networths to get the data needed
      const networths = allnetworths.map((item) => ({
        naira: Number(item.current_value_naira),
        dollar: Number(item.current_value_dollar),
        date: moment(item.createdAt).format("l"),
      }));

      // sort the networths array by date
      networths.sort((a, b) => new Date(a.date) - new Date(b.date));

      // initialize an empty objects to store the sums
      let sumsByDateNaira = {};
      let sumsByDateDollar = {};

      // Iterate through the sorted networths

      // naira
      for (const networth of networths) {
        const { naira, date } = networth;

        // check if the date already exists in the sumsByDate Object
        if (sumsByDateNaira[date]) {
          // if it exists add the amount to the existing sum
          sumsByDateNaira[date] += naira;
        } else {
          // if it doesn't exist, create an new entry with the amount
          sumsByDateNaira[date] = naira;
        }
      }

      // dollar
      for (const networth of networths) {
        const { dollar, date } = networth;

        // check if the date already exists in the sumsByDate Object
        if (sumsByDateDollar[date]) {
          // if it exists add the amount to the existing sum
          sumsByDateDollar[date] += dollar;
        } else {
          // if it doesn't exist, create an new entry with the amount
          sumsByDateDollar[date] = dollar;
        }
      }

      //
      let response;

      // generate response array and check if the currency is naira or dollar
      if (req.query.currency === "naira") {
        response = Object.entries(sumsByDateNaira).map(([date, naira]) => ({
          date,
          amount: naira,
        }));
      } else if (req.query.currency === "dollar") {
        response = Object.entries(sumsByDateDollar).map(([date, dollar]) => ({
          date,
          amount: dollar,
        }));
      } else {
        return res.status(400).json({ msg: "Currency is not found" });
      }

      // convert the start date and end dates to date object
      const start = new Date(req.query.start_date);
      const end = new Date(req.query.end_date);

      // filter the data array based on the date range
      const filteredData = response.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });

      res.json({ filteredData });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = networthCtrl;
