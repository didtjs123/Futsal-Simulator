import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 게임 생성 API
router.post("/game/futsal", authMiddleware, async (req, res, next) => {
  try {
    const user = req.accounts; // 인증된 사용자 정보 가져오기
    const { enemyTeamId } = req.body; // 요청 바디에서 상대 팀 ID 가져오기

    // 유효성 검사
    if (!enemyTeamId) {
      return res.status(400).json({ errorMessage: "상대 팀 ID가 필요합니다." });
    }

    // 내 팀 정보 가져오기
    const myTeam = await prisma.teams.findFirst({
      where: {
        accounts_id: user.accounts_id,
      },
      include: {
        Teams_Players: {
          include: {
            Players: true,
          },
        },
      },
    });

    if (!myTeam) {
      return res.status(400).json({ errorMessage: "팀이 없습니다." });
    }

    // 상대 팀 정보 가져오기 (내 계정이 아닌 다른 팀이어야 함)
    const enemyTeam = await prisma.teams.findFirst({
      where: {
        teams_id: enemyTeamId,
        NOT: {
          accounts_id: user.accounts_id,
        },
      },
      include: {
        Teams_Players: {
          include: {
            Players: true,
          },
        },
      },
    });

    if (!enemyTeam) {
      return res
        .status(404)
        .json({ errorMessage: "상대 팀을 찾을 수 없습니다." });
    }

    // 각 팀의 선수 능력치 합산 계산
    const calculateTeamScore = (team) => {
      return team.Teams_Players.reduce((total, teamPlayer) => {
        const player = teamPlayer.Players;
        const playerScore =
          player.stats.speed * 0.1 +
          player.stats.finishing * 0.25 +
          player.stats.shot_power * 0.15 +
          player.stats.defense * 0.3 +
          player.stats.stamina * 0.2;
        return total + playerScore;
      }, 0);
    };

    const mySquadScore = calculateTeamScore(myTeam);
    const enemySquadScore = calculateTeamScore(enemyTeam);

    const maxScore = mySquadScore + enemySquadScore;
    const randomValue = Math.random() * maxScore;

    let myScore, enemyScore, result;

    if (randomValue < mySquadScore) {
      // 유저 승리 처리
      myScore = Math.floor(Math.random() * 4) + 2; // 2에서 5 사이
      enemyScore = Math.floor(Math.random() * Math.min(3, myScore)); // myScore보다 작은 값을 설정
      result = `승리: 유저 ${myScore} - ${enemyScore} 상대`;
    } else {
      // 상대 유저 승리 처리
      enemyScore = Math.floor(Math.random() * 4) + 2; // 2에서 5 사이
      myScore = Math.floor(Math.random() * Math.min(3, enemyScore)); // enemyScore보다 작은 값을 설정
      result = `패배: 상대 ${enemyScore} - ${myScore} 유저`;
    }

    // 응답
    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
