import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 선수 뽑기 API
router.post("/players/gacha", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기
  const { gachaCount } = req.body; // 요청 데이터에서 뽑기 횟수 가져오기 (1회 또는 11회)

  //includes 1,11 중에 하나라도 일치하면 true를 반환
  if (![1, 11].includes(gachaCount)) {
    return res.status(400).json({ message: "유효하지 않은 뽑기 횟수입니다." });
  }

  try {
    // 뽑기 비용 설정
    const gachaCost = gachaCount === 1 ? 100 : 1000;

    // 사용자 캐시 조회
    const account = await prisma.accounts.findUnique({
      where: { accounts_id: user.accounts_id },
    });

    if (!account) {
      return res
        .status(400)
        .json({ errorMessage: "사용자를 찾을 수 없습니다." });
    }

    // 사용자 캐시 검증
    if (account.cash < gachaCost) {
      return res.status(400).json({ errorMessage: "캐시가 부족합니다." });
    }

    // 캐시 차감
    await prisma.accounts.update({
      where: { accounts_id: user.accounts_id },
      data: {
        cash: {
          decrement: gachaCost,
        },
      },
    });

    // 뽑힌 선수 ID를 담을 배열
    const playersIdArray = [];
    // 뽑힌 선수 모든 정보를 담을 배열
    const playersInfo = [];

    //레어도가 정해진 이후 레어도 내에서 선수가 랜덤으로 뽑히는 구조
    for (let i = 0; i < gachaCount; i++) {
      // 레어도 확률 결정
      const raritygacha = Math.random() * 100;
      let rarity;
      if (raritygacha < 60) {
        rarity = "Common";
      } else if (raritygacha < 90) {
        rarity = "Rare";
      } else {
        rarity = "SuperRare";
      }

      // 해당 레어도에서 무작위 선수 선택
      const players = await prisma.players.findMany({
        where: { rarity },
      });
      const randomNumber = Math.floor(Math.random() * players.length);
      const selectedPlayer = players[randomNumber];

      // 뽑힌 선수를 Player_invens_Players 테이블에 추가하기 위한 준비
      playersIdArray.push({ players_id: selectedPlayer.players_id });
      // 뽑힌 선수 정보를 응답할 데이터 준비
      const { created_at, updated_at, ...playerInfo } = selectedPlayer;
      playersInfo.push(playerInfo);
    }

    // Player_invens에 선수 추가 (인벤토리 생성 및 중간 테이블 업데이트)
    const updatedInventory = await prisma.player_invens.update({
      where: { accounts_id: user.accounts_id },
      data: {
        Player_invens_Players: {
          create: playersIdArray,
        },
      },
    });

    res.status(200).json({
      message: "선수 뽑기가 완료되었습니다.",
      players: playersInfo,
    });
  } catch (error) {
    console.error("Error during player gacha:", error);
    res.status(500).json({ message: "선수 뽑기 중 오류가 발생했습니다." });
  }
});

export default router;
