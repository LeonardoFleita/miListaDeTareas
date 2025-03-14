let pendingTasks = [];
const list = document.getElementById("taskList");
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const saveButton = document.getElementById("saveButton");

const renderList = () => {
  list.innerHTML = "";
  pendingTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => deleteTask(index));
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
};

const loadTasks = async () => {
  try {
    const res = await fetch(`/api/tasks`);
    const data = await res.json();
    pendingTasks = data.payload;
    renderList();
  } catch (err) {
    console.error(err);
  }
};

const deleteTask = (index) => {
  pendingTasks.splice(index, 1);
  renderList();
};

//deleteTask no elimina la tarea del archivo json, ya que la consgina pide que los datos se guarden solamente al presionar el botón "guardar progreso", si no se oprime este botón la tarea volverá a aparecer al actualizar la página

addButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) {
    return;
  }
  pendingTasks.push(task);
  taskInput.value = "";
  renderList();
});

const saveProgress = async () => {
  try {
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: pendingTasks }),
    });
    alert("Progreso guardado correctamente");
  } catch (err) {
    alert("Error al guardar las tareas. Intenta de nuevo.");
    console.error("Error saving tasks: ", err.message);
  }
};

saveButton.addEventListener("click", saveProgress);

loadTasks();
