import mongoose from "mongoose";
import schema from "./schema.js";

const ModulesModel = mongoose.model("modules", schema);
export default ModulesModel;