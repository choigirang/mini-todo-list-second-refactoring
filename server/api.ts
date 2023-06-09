const express = require("express");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");
// id 고유값 부여

app.use(cors());
// cors 접근 설정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express 서버를 쓸 때 app.use("/:id", (req,res) => {})

const clean = [
  { id: 0, room: "엄마방", clean: 0 },
  { id: 1, room: "아빠방", clean: 0 },
  { id: 2, room: "누나방", clean: 0 },
  { id: 3, room: "내방", clean: 0 },
  { id: 4, room: "거실", clean: 0 },
];

const todos = [
  { id: 0, room: "엄마방", tool: "몰래안하기", checked: false },
  { id: 1, room: "아빠방", tool: "걸레질하기", checked: false },
  { id: 2, room: "내방", tool: "청소기돌리기", checked: false },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/clean", (req, res) => {
  res.json(clean);
});

// 특정 id를 가진 요소 불러오기
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((item) => item.id == Number(id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: `Todo with id ${id} not found` });
  }
});

// AddTodo 컴포넌트에서 데이터 추가하기
app.post("/todos", (req, res) => {
  // console.log(req.body);
  const { selectState, room, tool } = req.body;
  const newTodo = {
    id: todos.length + 1,
    room,
    tool,
    checked: false,
  };
  const idx = todos.findIndex((todo) => todo.id === selectState);
  if (idx !== -1) {
    todos.splice(idx, 1, {
      id: selectState,
      room,
      tool,
      checked: false,
    });
  } else {
    todos.push(newTodo);
  }
  res.json(newTodo);
});

// input checkbox를 클릭한 요소에 해당하는 데이터의
// checked 값 설정하기
app.patch("/todos/:id", (req, res) => {
  const { id, room, tool } = req.body;
  const todo = todos.find((item) => item.id === id);
  if (todo) {
    todo.checked = true;
  }
  res.json(todos);
});

app.patch("/clean", (req, res) => {
  const { room, num } = req.body;
  const roomObj = clean.find((item) => item.room === room);
  if (roomObj) {
    if (roomObj.clean >= 100) {
      roomObj.clean = 100;
    } else {
      roomObj.clean += num;
    }
    res.json(clean);
  } else {
    res.status(404).send("Room not found");
  }
});

// 클릭한 요소에 해당하는 데이터 삭제하기
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((item) => item.id == Number(id));
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

// 로그인
let login = [
  { id: "choi", pw: "1234" },
  { id: "kim", pw: "1234" },
];

app.get("/login", (req, res) => {
  console.log(login);
  return res.json(login);
});

app.post("/signin", (req, res) => {
  const { id, pw } = req.body;
  if (!id || !pw) {
    console.log("id나 pw가 없습니다.");
    return res.status(400).json({ message: "id나 pw가 없습니다." });
  }
  const alreadyId = login.find((user) => user.id === id);
  console.log(login.find((user) => user.id === id));
  if (alreadyId !== undefined) {
    console.log("중복되는 아이디입니다.");
    return res.status(400).json({ message: "중복되는 아이디입니다." });
  }
  login.push({ id, pw });
  console.log(login);
  return res.json(login);
});
