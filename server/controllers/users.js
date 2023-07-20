import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers");
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, occupation, location, website, twitter, discord, github, linkedin, youtube } =
      req.body;
    const user = await User.findById(id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (occupation) user.occupation = occupation;
    if (location) user.location = location;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};