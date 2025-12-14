import { v4 as uuidv4 } from "uuid";
import ModulesModel from "./model.js";

export default function ModulesDao() {
    async function findModulesForCourse(courseId) {
        return ModulesModel.find({ course: courseId });
    }

    async function createModule(courseId, module) {
        const { _id, course, ...rest } = module;
        const id = _id || uuidv4();
        const doc = { ...rest, _id: id, course: courseId };
        const created = await ModulesModel.create(doc);
        return created;
    }

    async function deleteModule(courseId, moduleId) {
        return ModulesModel.deleteOne({ _id: moduleId, course: courseId });
    }

    async function updateModule(courseId, moduleId, moduleUpdates) {
        const { _id, course, ...rest } = moduleUpdates;
        return ModulesModel.updateOne(
            { _id: moduleId, course: courseId },
            { $set: rest }
        );
    }

    return {
        findModulesForCourse,
        createModule,
        deleteModule,
        updateModule,
    };
}