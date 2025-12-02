import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";

export async function findModulesForCourse(courseId) {
  const course = await model.findById(courseId);
  return course.modules;
  // const { modules } = Database;
  // return modules.filter((m) => m.course === courseId);
}

export async function createModule(courseId, module) {
  const newModule = { ...module, _id: uuidv4() };
  const status = await model.updateOne(
    { _id: courseId },
    { $push: { modules: newModule } }
  );
  // Database.modules = [...Database.modules, newModule];
  return newModule;
}

export async function deleteModule(courseId, moduleId) {
  const status = await model.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } }
  );
  return status;
  // const { modules } = Database;
  // Database.modules = modules.filter((m) => m._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const mod = modules.find((m) => m._id === moduleId);
  if (!mod) return null;
  Object.assign(mod, moduleUpdates);
  Database.modules = modules.map((m) => (m._id === moduleId ? mod : m));
  return mod;
}
