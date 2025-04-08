const express = require("express");
const path = require("path");
const port = 3000;
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());

const clientPath = path.join(__dirname, "../../client/src");
app.use(express.static(clientPath));

let todos = [];

//todoリストの取得エンドポイント
app.get("/todos", (req, res) => {
    res.json(todos);
});

//todoの追加エンドポイント
app.post("/todos", (req, res) => {
    const newtodo = req.body;
    todos.push(newtodo);
    res.status(201).json(newtodo);
});



// ルーティング
app.use("/user", userRouter);
app.listen(port, () => console.log(`${port}番ポートで起動中`));
