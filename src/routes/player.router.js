import express from "express";
import { PrismaClient } from "@prisma/client";
import { playerDatas } from "../../playerdata.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/player-data", async (req, res) => {
  try {
    // req(request)  -> 사용자 먼가 요청한 데이터가 있다.
    // res(response) -> res는 응답이다.
    const players = await prisma.players.createMany({
      data: playerDatas,
    });

    res.status(201).json({ message: "선수들 데이터 생성 성공" });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "선수들 데이터 생성 실패" });
  }
});

export default router;
