const express = require("express");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");
// id 고유값 부여

app.use(cors());
// cors 접근 설정

const todos = [
  { id: 0, room: "엄마방", tool: "몰래안하기" },
  { id: 1, room: "아빠방", tool: "걸레질하기" },
  { id: 2, room: "내방", tool: "청소기돌리기" },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

// 특정 id를 가진 요소 불러오기
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((item) => item.id == id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: `Todo with id ${id} not found` });
  }
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  const { room, tool } = req.body;
  const newTodo = {
    id: todos.length,
    room,
    tool,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// 클릭한 요소를 삭제하기
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((item) => item.id == id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: `Todo with id ${id} not found` });
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
