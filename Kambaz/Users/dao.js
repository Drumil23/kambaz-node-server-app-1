import model from "./model.js";
import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

let { users } = db;

export const createUser = (user) => {
  // Remove _id if it exists to avoid conflicts with database insert
  delete user._id;
  
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
  
  // In-memory implementation:
  // const newUser = { ...user, _id: Date.now().toString() };
  // users.push(newUser);
  // return newUser;
};

export const findAllUsers = () => users;

export const findUserById = (userId) => users.find((user) => user._id === userId);

export const findUserByUsername = (username) => users.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
  users.find((user) => user.username === username && user.password === password);

export const updateUser = (userId, userUpdates) => {
  const user = users.find((user) => user._id === userId);
  Object.assign(user, userUpdates);
  return user;
};

export const deleteUser = (userId) => {
  users = users.filter((user) => user._id !== userId);
  db.users = users;
};

export const findUsersByRole = (role) => users.filter((user) => user.role === role);

export const findUsersByPartialName = (partialName) => {
  const searchTerm = partialName.toLowerCase();
  return users.filter((user) => {
    const firstName = (user.firstName || "").toLowerCase();
    const lastName = (user.lastName || "").toLowerCase();
    return firstName.includes(searchTerm) || lastName.includes(searchTerm);
  });
};