// Kambaz/Enrollments/dao.js
import model from "./model.js";

export default function EnrollmentsDao() {
    async function findAllEnrollments() {
        return model.find();
    }

    // For /api/users/:userId/enrollments
    async function findEnrollmentsForUser(userId) {
        return model.find({ user: userId });
    }

    // For /api/users/:userId/courses (used by Courses routes)
    async function findCoursesForUser(userId) {
        const enrollments = await model
            .find({ user: userId })
            .populate("course");
        return enrollments.map((enrollment) => enrollment.course);
    }

    async function findUsersForCourse(courseId) {
        const enrollments = await model
            .find({ course: courseId })
            .populate("user");
        return enrollments.map((enrollment) => enrollment.user);
    }

    function enrollUserInCourse(userId, courseId) {
        return model.create({
            user: userId,
            course: courseId,
            _id: `${userId}-${courseId}`,
        });
    }

    function unenrollUserFromCourse(userId, courseId) {
        return model.deleteOne({ user: userId, course: courseId });
    }

    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    return {
        findAllEnrollments,
        findEnrollmentsForUser,
        findCoursesForUser,
        findUsersForCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse,
    };
}

// Optional: kept for backwards-compat if something imports it directly.
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}