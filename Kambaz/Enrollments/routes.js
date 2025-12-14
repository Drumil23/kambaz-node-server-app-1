// Kambaz/Enrollments/routes.js
import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();

    // GET /api/enrollments
    app.get("/api/enrollments", async (req, res) => {
        try {
            const enrollments = await dao.findAllEnrollments();
            res.json(enrollments);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

    // GET /api/users/:userId/enrollments
    app.get("/api/users/:userId/enrollments", async (req, res) => {
        try {
            const { userId } = req.params;
            const enrollments = await dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

    // POST /api/users/:userId/courses/:courseId/enrollments
    app.post(
        "/api/users/:userId/courses/:courseId/enrollments",
        async (req, res) => {
            try {
                const { userId, courseId } = req.params;
                const enrollment = await dao.enrollUserInCourse(userId, courseId);
                res.json(enrollment);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
        }
    );

    // DELETE /api/users/:userId/courses/:courseId/enrollments
    app.delete(
        "/api/users/:userId/courses/:courseId/enrollments",
        async (req, res) => {
            try {
                const { userId, courseId } = req.params;
                const status = await dao.unenrollUserFromCourse(userId, courseId);
                res.json(status);
            } catch (e) {
                res.status(500).json({ error: e.message });
            }
        }
    );
}