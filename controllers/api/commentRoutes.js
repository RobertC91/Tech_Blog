const router = require('express').Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(allComments)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const oneComment = await Comment.findByPk(req.params.id, {
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(oneComment)
  } catch (err) {
    res.status(400).json(err)
  }
})


router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    })

    res.status(200).json(newComment)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    res.status(200).json(updatedComment)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy(req.body, {
      where: {
        id: req.params.id,
      }
    })

    res.status(200).json(deletedComment)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router;
