const express = require("express");
const tasksRouter = require(`${__dirname}/routes/tasksRouter`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));

app.use("/api/tasks", tasksRouter);

app.get("/", (_, res) => {
  res.sendFile(`${__dirname}/../public/index.html`);
});

app.listen(8080, () => {
  console.log("Servidor listo");
});
