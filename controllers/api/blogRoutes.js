const router = require('express').Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        ...req.body
      })
      res.status(200).json(blogs)
    } catch (err) {
      res.status(400).json(err)
    }
  })
  
  
  router.get('/:id', async (req, res) => {
    try {
      const oneBlog = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name']
          }
        ]
      })
  
      const blog = oneBlog.get({ plain: true });
    
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(400).json(err)
    }
  })
  
  
  router.post('/', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      })
  
      res.status(200).json(newBlog)
    } catch (err) {
      res.status(400).json(err)
    }
  })

module.exports = router