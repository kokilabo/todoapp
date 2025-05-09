const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("ユーザーです");
});

router.get("/info", (req, res) => {
    res.send("ユーザー情報です");
});

router.get(":id", (res,req) => {
    res.send(`${req.params.id}のユーザー情報を取得しました`);
});


module.exports = router;