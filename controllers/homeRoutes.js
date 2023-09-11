const router = require('express').Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");


// Get route for homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("home", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User, 
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for Comments
router.get('/comments', (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  res.render('comments')
})

// Get route for dashboard
router.get("/dashboard", withAuth, (req, res) => {
  if (req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard");
});

// Get route for login page
router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  res.render("login");
});

// Get route for SignUp page
router.get("/signup", (req, res) => {
  res.render("signup");
});





module.exports = router;
