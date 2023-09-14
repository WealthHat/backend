const Blog = require('../../models/admin/blogModel');

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const { category, title, content } = req.body;

      // check for empty values
      if (category === '' || title === '' || content === '') {
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
  // get all blogs
  getAllblog: async (req, res) => {
    try {
      // console.log(req)
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: 'Agent not found' });

      const blogs = await Blog.find();
      if (!blogs) return res.status(400).json({ msg: 'Data does not exist' });

      res.json(blogs);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // get single blog
  getBlog: async (req, res) => {
    try {
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: 'Agent not found' });

      const blog = await Blog.find({ _id: req.params.id });
      if (!blog) return res.status(400).json({ msg: 'Blog does not exist' });

      res.json(blog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // update blog
  updateBlog: async (req, res) => {
    try {
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: 'Agent not found' });

      const { category, title, content } = req.body;

      // check for empty values
      if (category === '' || title === '' || content === '') {
        return res.status(400).json({ msg: 'Inputs cannot be empty' });
      }

      await Blog.findOneAndUpdate(
        { _id: id },
        {
          category,
          title,
          content,
        }
      );

      res.json({ msg: 'Blog updated successfully' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // delete blog
  deleteBlog: async (req, res) => {
    try {
      const check = await Admin.findById(req.user);
      if (check === null)
        return res.status(400).json({ msg: 'Agent not found' });

      await Blog.findByIdAndDelete(req.params.id);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //
};

module.exports = blogCtrl;
