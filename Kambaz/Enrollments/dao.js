import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(userId, courseId) {
  return model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });
  // const { enrollments } = Database;
  // enrollments.push({
  //   _id: uuidv4(),
  //   user: userId,
  //   course: courseId,
  // });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export function unenrollAllUsersFromCourse(courseId) {
  return model.deleteMany({ course: courseId });
}

export function findEnrollmentsForUser(userId) {
  return model.find({ user: userId });
}

export function findEnrollmentsForCourse(courseId) {
  return model.find({ course: courseId });
}
