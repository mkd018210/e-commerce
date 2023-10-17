const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tags not found!"});
  }  
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      incluse: [{ medel: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tag not found!"});
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(res.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(404).json({ message: "Tag creation failed" });
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
    ? res.status(404).json({ message: "No tag found with this id!" })
    : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Tag updated failed!" });
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destory({ where: {id: req.params.id } });
    !deleted
    ? res.status(404).json({ message: "No tag found with this id!"})
    : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Tag deletion failed!" });
  }
  // delete on tag by its `id` value
});

module.exports = router;
