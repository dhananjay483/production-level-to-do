import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isImportant: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
