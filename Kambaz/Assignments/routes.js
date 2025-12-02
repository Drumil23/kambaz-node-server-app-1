import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAllAssignments = async (req, res) => {
    const { course } = req.query;
    if (course) {
      const assignments = await assignmentsDao.findAssignmentsByCourse(course);
      res.json(assignments);
      return;
    }
    const assignments = await assignmentsDao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await assignmentsDao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.json(assignment);
  };

  const createAssignment = async (req, res) => {
    const newAssignment = await assignmentsDao.createAssignment(req.body);
    res.json(newAssignment);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignmentsDao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    await assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
