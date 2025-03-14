const fs = require("fs");

class TasksManager {
  constructor(path) {
    this.path = path;
  }

  getTasks = async () => {
    try {
      const fileTasks = await fs.promises.readFile(this.path, "utf-8");
      return fileTasks ? JSON.parse(fileTasks) : [];
    } catch (err) {
      await fs.promises.writeFile(this.path, "[]", "utf-8");
      return [];
    }
  };

  saveTasks = async (tasks) => {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(tasks, null, "\t"),
        "utf-8"
      );
      console.log("Tasks saved successfully");
    } catch (err) {
      throw new Error("Error saving tasks: " + err.message);
    }
  };
}

module.exports = TasksManager;
