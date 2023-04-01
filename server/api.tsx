const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

let itemList = [
  { id: uuidv4(), room: "엄마방", tool: "청소기돌리기" },
  { id: uuidv4(), room: "아빠방", tool: "청소기돌리기" },
  { id: uuidv4(), room: "내방", tool: "청소기돌리기" },
];

app.get("/items", (req, res) => {
  res.json(itemList);
});

app.post("/items", (req, res) => {
  const { room, tool } = req.body;
  const newItem = { id: uuidv4(), room, tool };
  itemList.push(newItem);
  res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { room, tool } = req.body;
  const item = itemList.find((item) => item.id === id);
  if (!item) return res.sendStatus(404);
  item.room = room;
  item.tool = tool;
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  itemList = itemList.filter((item) => item.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
