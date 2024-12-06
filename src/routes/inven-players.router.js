// src/routes/inventory.router.js

import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 인벤토리 내 선수 전체 조회 API
router.get("/inven/players", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기

  try {
    // 사용자의 인벤토리에서 모든 선수 조회
    const inven = await prisma.player_invens.findUnique({
      where: { accounts_id: user.accounts_id },
      include: {
        Player_invens_Players: {
          include: {
            Players: true,
          },
        },
      },
    });

    if (!inven) {
      return res.status(400).json({ message: "텅..선수가 없습니다." });
    }

    // 선수 정보 추출 (시간 관련 컬럼 제외, 인벤토리 ID 포함, 플레이어 ID 제외)
    const players = inven.Player_invens_Players.map((p) => {
      const { players_id, created_at, updated_at, ...playerInfo } = p.Players;
      return {
        player_inven_id: p.player_invens_players_id,
        ...playerInfo,
      };
    });

    res.status(200).json({
      message: "인벤토리 내 선수 조회가 완료되었습니다.",
      players,
    });
  } catch (error) {
    console.error("Error during inventory player retrieval:", error);
    res
      .status(500)
      .json({ message: "인벤토리 선수 조회 중 오류가 발생했습니다." });
  }
});

export default router;
