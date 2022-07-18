const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    })
    // be sure to include its associated Products
    res.status(200).json(categoriesData)
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)
  }
 
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoriesData) {
      res.status(404).json({ message: `Can't find what you're looking for!`})
    }
    // be sure to include its associated Products
    res.status(200).json(categoriesData);
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body)
    res.status(200).json(categoriesData);
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(req.body, {
      where: req.params.id
    })

    if (!categoriesData) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }
    res.status(200).json(categoriesData)
  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)
  }

});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = Category.destroy({
      where: req.params.id
    })
    if (!categoriesData) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }
    res.status(200).json(categoriesData)

  } catch (err) {
    console.log(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err)

  }

});

module.exports = router;
