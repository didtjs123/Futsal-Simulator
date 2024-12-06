import express from "express";
import router from "./routes/time.js";

const app = express();

app.get("/", (req, res) =>{
    res.send("<h1>원빈님 아파트 아파트~ 코드 저장해 저장해~</h1>")
})

app.use(router);

app.listen(3000, () => {
    console.log("성공~")
})