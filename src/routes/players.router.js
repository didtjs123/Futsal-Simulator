import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// 선수 생성
router.post("/players", authMiddleware, async (req, res, next) => {
  try {
    const { rarity, name, stats } = req.body;

    const player = await prisma.players.create({
      data: {
        rarity: rarity,
        name: name,
        stats: {
          speed: stats.speed,
          finishing: stats.finishing,
          shotPower: stats.shotPower,
          defense: stats.defense,
          stamina: stats.stamina,
        },
      },
    });

    return res.status(201).json({ message: "선수가 생성됐습니다.", data: player });
  } catch (error) {
    next(error); // 에러를 다음 핸들러로 전달
  }
});

// 선수 전체조회
router.get("/players", authMiddleware, async (req, res, next) => {
  try {
    const players = await prisma.players.findMany({});

    return res
      .status(200)
      .json({ message: "전체선수가 조회됐습니다.", data: players });
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
});

// 선수 상세조회
router.get("/players/:playersId", authMiddleware, async (req, res, next) => {
  try {
    const { playersId } = req.params;

    const player = await prisma.players.findFirst({
      where: { players_id: +playersId },
    });

    if (!player) {
      return res.status(404).json({ message: "선수를 찾을 수 없습니다." });
    }

    return res
      .status(200)
      .json({ message: "선수가 상세조회 됐습니다.", data: player });
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
});

// 선수 삭제
router.delete("/players/:playersId", authMiddleware, async (req, res, next) => {
  try {
    const { playersId } = req.params;

    // 선수 존재 여부 확인
    const player = await prisma.players.findFirst({
      where: { players_id: +playersId },
    });

    if (!player) {
      return res.status(404).json({ message: "선수가 존재하지 않습니다." });
    }

    // 선수 삭제
    await prisma.players.delete({ where: { players_id: +playersId } });

    return res.status(200).json({ message: "선수가 삭제되었습니다." });
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
});

export default router;
