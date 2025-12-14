import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  // Remove _id if it exists to avoid conflicts with database insert
  delete user._id;
  
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) => model.findOne({ username });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

export const updateUser = (userId, userUpdates) => {
  return model.updateOne({ _id: userId }, { $set: userUpdates });
};

export const deleteUser = (userId) => {
  return model.deleteOne({ _id: userId });
};

export const findUsersByRole = (role) => model.find({ role });

export const findUsersByPartialName = (partialName) => {
  const searchTerm = partialName.toLowerCase();
  return model.find({
    $or: [
      { firstName: { $regex: searchTerm, $options: 'i' } },
      { lastName: { $regex: searchTerm, $options: 'i' } }
    ]
  });
};