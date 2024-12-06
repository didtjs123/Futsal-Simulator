import express from "express";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import accountsRouter from "./routes/accounts.router.js";
import cashRouter from "./routes/cash.router.js";
import teamsRouter from "./routes/teams.router.js";
import playersGacha from "./routes/players-gacha.router.js";
import playerDataRouter from "./routes/player.router.js";
import { config } from "dotenv";
import playersInven from "./routes/inven-players.router.js";
import players from "./routes/players.router.js";
import gameFutsal from "./routes/game.router.js";

config();

//express 생성
const app = express();

//서버 포트
const PORT = 3017;

//json 데이터 처리, body 데이터 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//쿠키 파서 전역 활성화
app.use(cookieParser());

//라우터 등록
app.use("/api", [
  accountsRouter,
  cashRouter,
  teamsRouter,
  playersGacha,
  playersInven,
  players,
  playerDataRouter,
  gameFutsal,
]);

// //에러 처리 미들웨어
// app.use(errorHandlerMiddleware);

//서버 실행, 클라이언트 요청 대기
app.listen(PORT, () => {
  console.log(PORT, "server port open!");
});
