const schemas = require("../schemas/itemsSchema");
const Item = require("../models/Item");

const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find({});

    return res.status(200).json({
      success: true,
      data: allItems,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Item.findById(id).populate('_id').exec();

    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }

    return res.status(404).json({
      success: false,
      message: `item id '${id}' not found`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for item id",
    });
  }
};



const createNewItem = async (req, res) => {
  const { error, value } = schemas.createNewItem.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  const newItemData = {
    ...value,
    user_id: req.user.id
  };

  const newItem = new Item(newItemData);

  try {
    const saved = await newItem.save();

    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error saving the item: ${err.message}` });
  }
};





const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { id: userId, isAdmin } = req.user;

  try {
    const item = await Item.findOne({ _id: id });

    if (!item) {
      return res.status(404).json({ success: false, message: `Item id ${id} not found.` });
    }

    if (isAdmin || item.user_id.toString() === userId) {
      const deleted = await Item.findByIdAndDelete(id);

      if (!deleted) {
        throw new Error();
      }

      return res.status(200).json({ success: true, deleted: deleted });
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized: You are not allowed to delete this item.' });
    }
  } catch (err) {
    return res.status(404).json({ success: false, message: `Item id ${id} not found or error deleting the item.` });
  }
};





const updateItem = async (req, res) => {
  const { error, value } = schemas.updateItem.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  const { id } = req.params;

  try {
    const updated = await Item.findByIdAndUpdate(id, value, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: `Item id ${id} was not found.` });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error updating the item: ${err.message}` });
  }
};







module.exports = {
  getAllItems,
  getItemById,
  createNewItem,
  deleteItem,
  updateItem,
};
