import model from "./model.js";
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

const { courses, enrollments } = Database;

export function findAllCourses() {
  return model.find({}, {number: 1, description: 1});
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
  // const newCourse = { ...course, _id: uuidv4() };
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}

export function deleteCourse(courseId) {
  // const { courses, enrollments } = Database;
  // Database.courses = courses.filter((course) => course._id !== courseId);
  // Database.enrollments = enrollments.filter(
  //   (enrollment) => enrollment.course !== courseId
  // );
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  // const { courses } = Database;
  // const course = courses.find((c) => c._id === courseId);
  // if (!course) return null;
  // Object.assign(course, courseUpdates);
  // Database.courses = courses.map((c) => (c._id === courseId ? course : c));
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export async function findCoursesForEnrolledUser(userId) {
  const { enrollments } = Database;
  const courses = await model.find({}, {number: 1, description: 1});
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)
  );
  return enrolledCourses;
}
