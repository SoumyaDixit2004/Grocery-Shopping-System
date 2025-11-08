import Grocery from "../models/Grocery.js";

export const addGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.create({ ...req.body, user: req.user._id });
    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find({ user: req.user._id });
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(grocery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGrocery = async (req, res) => {
  try {
    await Grocery.findByIdAndDelete(req.params.id);
    res.json({ message: "Grocery deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
