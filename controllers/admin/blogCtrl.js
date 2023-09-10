const Blog = require('../../models/admin/blogModel');

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const {
        category,
        title,
        content,
      } = req.body;

      // check for empty values
      if (
        category === '' || title === "" || content===""
      ) {
        return res.status(400).json({ msg: 'Inputs cannot be empty' });
      }


      // save data in the database
      const blog = new Blog({
        category,
        title,
        content,
        postedBy: req.user,
      });

      await blog.save();

      res.json({ msg: 'Blog created succcessfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },


//    
};

module.exports = blogCtrl;
