const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categories);
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }],
  });
  res.status(200).json(category);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({ category_name: req.body.category_name })
    .then((newCategory) => {
      res.status(200).json(newCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      req.body, 
      {where: {id: req.params.id}}
    );
    if (!updatedCategory[0]) {
      res.status(404).json({ message: "No category found with this id" });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((deletedCategory) => {
      res.status(200).json(deletedCategory);
    })
    .catch((err) => res.json(err));
  // delete a category by its `id` value
});

module.exports = router;
