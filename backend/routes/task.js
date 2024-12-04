const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const { authenticateToken } = require("./auth");

// Create a new task and associate it with a user
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body; // Extract task details from the request body
    const { id: userId } = req.headers; // Extract user ID from the headers

    // Create a new task
    const newTask = new Task({ title, desc });
    const savedTask = await newTask.save();

    // Add the task ID to the user's task list
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    return res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all tasks for a user, sorted by creation date
router.get("/get-all-task", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.headers; // Extract user ID from the headers

    // Fetch user data and populate tasks
    const userData = await User.findById(userId).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } }, // Sort tasks by creation date
    });

    return res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task by ID and update the user's task list
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id: taskId } = req.params; // Extract task ID from the route params
    const { id: userId } = req.headers; // Extract user ID from the headers

    // Delete the task and remove it from the user's task list
    await Task.findByIdAndDelete(taskId);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update task details (title and description)
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id: taskId } = req.params; // Extract task ID from the route params
    const { title, desc } = req.body; // Extract updated details from the request body

    // Update the task
    await Task.findByIdAndUpdate(taskId, { title, desc });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle task importance
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;

    // Find the task and toggle the "important" field
    const task = await Task.findById(taskId);
    await Task.findByIdAndUpdate(taskId, { important: !task.important });

    return res
      .status(200)
      .json({ message: "Task importance updated successfully" });
  } catch (error) {
    console.error("Error updating task importance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle task completion
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;

    // Find the task and toggle the "complete" field
    const task = await Task.findById(taskId);
    await Task.findByIdAndUpdate(taskId, { complete: !task.complete });

    return res
      .status(200)
      .json({ message: "Task completion status updated successfully" });
  } catch (error) {
    console.error("Error updating task completion:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all important tasks for a user
router.get("/get-imp-task", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.headers;

    // Fetch user's tasks marked as important
    const userData = await User.findById(userId).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching important tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all completed tasks for a user
router.get("/get-complete-task", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.headers;

    // Fetch user's completed tasks
    const userData = await User.findById(userId).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all incomplete tasks for a user
router.get("/get-incomplete-task", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.headers;

    // Fetch user's incomplete tasks
    const userData = await User.findById(userId).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({ data: userData.tasks });
  } catch (error) {
    console.error("Error fetching incomplete tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
