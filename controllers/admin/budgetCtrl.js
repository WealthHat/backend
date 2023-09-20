 const Budget = require('../../models/admin/budgetModel');
 const User = require('../../models/user/userModel');
 const Admin = require('../../models/admin/adminModel');


 const budgetCtrl = {
   createBudget: async (req, res) => {
     try {
       const {
         userId,
         category,
         title,
         monthly,
         annually,
       } = req.body;

       // check for empty values
       if (
         category === '' ||
         !category ||
         title === '' ||
         !title ||
         monthly === '' ||
         !monthly ||
         annually === '' ||
         !annually
       ) {
         return res.status(400).json({ msg: 'Inputs cannot be empty' });
       }

       // get the user the networth is being created for
       const user = await User.findById({ _id: userId }).select('-password');

       // save data in the database
       const budget = new Budget({
         category,
         title,
         monthly,
         annually,
         user: user,
       });

       await budget.save();

       res.json({ msg: 'Budget created succcessfully' });
     } catch (error) {
       res.status(500).json({ msg: error.message });
     }
   },

  //  // get all net worth
   getAllBudget: async (req, res) => {
     try {
       // console.log(req)
       const check = await Admin.findById(req.user);
       if (check === null)
         return res.status(400).json({ msg: 'User not found' });

       const budget = await Budget.find()
         .populate('user', '_id firstname lastname email')
         .sort('-createdAt');
       if (!budget)
         return res.status(400).json({ msg: 'Data does not exist' });

       res.json(budget);
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
   },

  //  // get all net worth
   getUserBudget: async (req, res) => {
     try {

       const check = await Admin.findById(req.user);
       if (check === null)
         return res.status(400).json({ msg: 'User not found' });

       const all_budgets = await Budget.find().sort('-createdAt');
       if (!all_budgets)
         return res.status(400).json({ msg: 'Data does not exist' });

       // filter through all budget to get single user budget
       const user_budget = all_budgets.filter(
         (item) => item.user.toString() === req.params.id
       );

       res.json(user_budget);
     } catch (error) {
       return res.status(500).json({ msg: error.message });
     }
   },

  //  // update user budget
   updateUserBudget: async (req, res) => {
     try {
       const {
         id,
         category,
         title,
         monthly,
         annually,
       } = req.body;

       // check for empty values
       if (
        id==="" || !id ||
         category === '' ||
         !category ||
         title === '' ||
         !title ||
         monthly === '' ||
         !monthly ||
         annually === '' ||
         !annually
       ) {
         return res.status(400).json({ msg: 'Inputs cannot be empty' });
       }

       await Budget.findOneAndUpdate(
         { _id: id },
         {
          category,
         title,
         monthly,
         annually,
         }
       );

       res.json({ msg: 'Budget updated successfully' });
     } catch (error) {
       res.status(500).json({ msg: error.message });
     }
   },
 };
 
 module.exports = budgetCtrl