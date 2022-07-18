const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product }],
    })

    res.status(200).json(tagData)
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]
    })

    if (!tagData) {
      res.status(400).json(`Can't find what you're looking for!`)
    }

    res.status(200).json(tagData)
    
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      } 
    })

    if (!tagData) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }

    res.status(200).json(tagData)
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      } 
    })

    if (!tagData) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }

    res.status(200).json(tagData)
    
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

module.exports = router;
