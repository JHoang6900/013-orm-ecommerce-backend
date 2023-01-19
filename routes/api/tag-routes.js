const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [{model: Product,},]
    },
  );
  res.status(200).json(tags);
  // find all tags
  // be sure to include its associated Product data
});





router.get("/:id", async (req, res) => {
  const tag = await Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }],
  });
  res.status(200).json(tag);
});
  // find a single tag by its `id`
  // be sure to include its associated Product data

  router.post("/", (req, res) => {
    // create a new tag
    Tag.create({ tag_name: req.body.tag_name })
      .then((newTag) => {
        res.status(200).json(newTag);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.put("/:id", async (req, res) => {
    try {
      const updatedTag = await Tag.update(
        req.body, 
        {where: {id: req.params.id}}
      );
      if (!updatedTag[0]) {
        res.status(404).json({ message: "No tag found with this id" });
      } else {
        res.status(200).json(updatedTag);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
      

  router.delete("/:id", (req, res) => {
    Tag.destroy({
      where: { id: req.params.id },
    })
      .then((deletedTag) => {
        res.status(200).json(deletedTag);
      })
      .catch((err) => res.json(err));
    // delete a tag by its `id` value
  });

module.exports = router;
