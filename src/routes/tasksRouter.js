const { Router } = require("express");
const TasksManager = require(`${__dirname}/../dbManager/tasksManager.js`);

const tasksManager = new TasksManager(
  `${__dirname}/../../assets/misTareas.json`
);

const router = Router();

router.get("/", async (_, res) => {
  try {
    const tasks = await tasksManager.getTasks();
    res.status(200).json({ status: "success", payload: tasks });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tasks } = req.body;
    await tasksManager.saveTasks(tasks);
    res.status(200).json({ status: "success", message: "Progress saved" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;
