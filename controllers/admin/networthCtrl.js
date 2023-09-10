 const Networth = require('../../models/admin/networthModel');


 const networthCtrl = {
   createNetworth: async (req, res) => {
     try {
       const {
         userId,
         category,
         sub_category,
         assets,
         current_value_naira,
         current_value_dollar,
       } = req.body;

       // check for empty values
       if (
         category === '' ||
         !category ||
         sub_category === '' ||
         !sub_category ||
         assets === '' ||
         !assets ||
         current_value_naira === '' ||
         !current_value_naira ||
         current_value_dollar === '' ||
         !current_value_dollar
       ) {
         return res.status(400).json({ msg: 'Inputs cannot be empty' });
       }

       // get the user the networth is being created for
       const user = await User.findById({ _id: userId }).select('-password');

       // save data in the database
       const networth = new Networth({
         category,
         sub_category,
         assets,
         current_value_naira,
         current_value_dollar,
         user: user,
       });

       await networth.save();

       res.json({ msg: 'Networth created succcessfully', networth });
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
         return res.status(400).json({ msg: 'User not found' });

       const networths = await Networth.find();
       if (!networths)
         return res.status(400).json({ msg: 'Data does not exist' });

       res.json(networths);
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
   },

   // get all net worth
   getUserNetworth: async (req, res) => {
     try {
       // console.log(req)
       const check = await Admin.findById(req.user);
       if (check === null)
         return res.status(400).json({ msg: 'User not found' });

       const all_networths = await Networth.find();
       if (!all_networths)
         return res.status(400).json({ msg: 'Data does not exist' });

       // filter through all networths to get single user networths
       const user_networth = all_networths.filter(
         (item) => item.user.toString() === req.params.id
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
         category === '' ||
         !category ||
         sub_category === '' ||
         !sub_category ||
         assets === '' ||
         !assets ||
         current_value_naira === '' ||
         !current_value_naira ||
         current_value_dollar === '' ||
         !current_value_dollar
       ) {
         return res.status(400).json({ msg: 'Inputs cannot be empty' });
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

       res.json({ msg: 'Networth updated successfully' });
     } catch (error) {
       res.status(500).json({ msg: error.message });
     }
   },
 };

 module.exports = networthCtrl