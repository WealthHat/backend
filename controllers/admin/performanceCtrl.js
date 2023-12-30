//  const Networth = require('../../models/admin/networthModel');
 const Performance = require('../../models/admin/performanceModel');
 const User = require("../../models/user/userModel")
  const Admin = require('../../models/admin/adminModel');



 const performanceCtrl = {
   createPerformance: async (req, res) => {
     try {
       const {
         userId,
         category,
         symbol,
         name,
         price,
         priceChange,
         percentChange,
         shares,
         pricePaid,
         costBasis,
         marketValue,
         gainLoss,
         weight,
       } = req.body;

       // check for empty values
       if (
         (category==="",
         symbol==="",
         name==="",
         price==="",
         priceChange==="",
         percentChange==="",
         shares==="",
         pricePaid==="",
         costBasis==="",
         marketValue==="",
         gainLoss==="",
         weight==="")
       ) {
         return res.status(400).json({ msg: 'Inputs cannot be empty' });
       }

       // get the user the networth is being created for
       const user = await User.findById({ _id: userId }).select('-password');

       // save data in the database
       const performance = new Performance({
          category,
         symbol,
         name,
         price,
         priceChange,
         percentChange,
         shares,
         pricePaid,
         costBasis,
         marketValue,
         gainLoss,
         weight,
         user: user,
       });

       await performance.save();

       res.json({ msg: 'Performance created succcessfully', performance });
     } catch (error) {
       res.status(500).json({ msg: error.message });
     } 
   },

  //  // get all performance
   getAllPerformance: async (req, res) => {
     try {
       // console.log(req)
       const check = await Admin.findById(req.user);
       if (check === null)
         return res.status(400).json({ msg: 'User not found' });

       const performance = await Performance.find()
         .populate('user', '_id firstname lastname email')
         .sort('-createdAt');;
       if (!performance)
         return res.status(400).json({ msg: 'Data does not exist' });

       res.json(performance);
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
   },

  //  // get all user performance
   getUserPerformance: async (req, res) => {
     try {
       // console.log(req)
       const check = await Admin.findById(req.user);
       if (check === null)
         return res.status(400).json({ msg: 'User not found' });

       const all_performance = await Performance.find()
       if (!all_performance)
         return res.status(400).json({ msg: 'Data does not exist' });

       // filter through all performance to get single user performance
       const user_performance = all_performance.filter(
         (item) => item.user.toString() === req.params.id
       );

       res.json(user_performance);
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
   },

  //  // update user performance
   updateUserPerformance: async (req, res) => {
     try {
        const {
          id,
          category,
          symbol,
          name,
          price,
          priceChange,
          percentChange,
          shares,
          pricePaid,
          costBasis,
          marketValue,
          gainLoss,
          weight,
        } = req.body;

       // check for empty values
         if (
           (category === '',
           symbol === '',
           name === '',
           price === '',
           priceChange === '',
           percentChange === '',
           shares === '',
           pricePaid === '',
           costBasis === '',
           marketValue === '',
           gainLoss === '',
           weight === '')
         ) {
           return res.status(400).json({ msg: 'Inputs cannot be empty' });
         }

       await Performance.findOneAndUpdate(
         { _id: id },
         {
           category,
           symbol,
           name,
           price,
           priceChange,
           percentChange,
           shares,
           pricePaid,
           costBasis,
           marketValue,
           gainLoss,
           weight,
         }
       );

       res.json({ msg: 'Performance updated successfully' });
     } catch (error) {
       res.status(500).json({ msg: error.message });
     }
   },
 };

 module.exports = performanceCtrl