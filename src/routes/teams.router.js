import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 팀 편성 API
router.patch("/teams/:teamName", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기
  const { teamName } = req.params; // URL 파라미터에서 팀 이름 가져오기
  const { striker_id, midfielder_id, defender_id } = req.body; // 요청 바디에서 스트라이커, 미드필더, 디펜더 ID 가져오기

  // 유효성 검사
  if (!teamName) {
    return res.status(400).json({ errorMessage: "팀 이름이 필요합니다." });
  }

  try {
    // 팀 이름으로 팀 검색 (해당 사용자 소유)
    const team = await prisma.teams.findFirst({
      where: {
        accounts_id: user.accounts_id,
        teams_name: teamName,
      },
    });

    if (!team) {
      return res.status(400).json({ errorMessage: "팀을 찾을 수 없습니다." });
    }

    // 선수 유효성 검사 (각 선수는 사용자의 보유 선수여야 함)
    const playerIds = [striker_id, midfielder_id, defender_id].filter(Boolean); // 요청된 선수 ID 중 존재하는 값만 필터링
    const ownedPlayers = await prisma.player_invens_players.findMany({
      where: {
        player_invens: { accounts_id: user.accounts_id },
        players_id: { in: playerIds },
      },
      select: { players_id: true },
    });

    const ownedPlayerIds = ownedPlayers.map((p) => p.players_id);
    const invalidPlayers = playerIds.filter(
      (id) => !ownedPlayerIds.includes(id)
    );
    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        errorMessage:
          "선택한 선수 중 보유하지 않은 선수ID가 포함되어 있습니다.",
        "미보유 선수ID": invalidPlayers,
      });
    }

    // 팀 편성
    await prisma.teams.update({
      where: { teams_id: team.teams_id },
      data: {
        striker_id: striker_id || null,
        midfielder_id: midfielder_id || null,
        defender_id: defender_id || null,
        Teams_Players: {
          deleteMany: {}, // 기존 팀-선수 관계 삭제 (중복 방지)
          create: playerIds.map((playerId) => ({
            players_id: playerId,
          })),
        },
      },
    });

    // 응답
    res.status(200).json({
      message: "팀 편성이 업데이트되었습니다.",
      team: {
        team_name: team.teams_name,
        striker_id,
        midfielder_id,
        defender_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "팀 편성 업데이트 중 오류가 발생했습니다.",
    });
  }
});

// 팀 상세 조회 API
router.get("/teams/:teamName", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기
  const { teamName } = req.params; // URL 파라미터에서 팀 이름 가져오기

  try {
    // 팀 이름으로 팀 검색 (해당 사용자 소유)
    const team = await prisma.teams.findFirst({
      where: {
        accounts_id: user.accounts_id,
        teams_name: teamName,
      },
      include: {
        Teams_Players: {
          include: {
            Players: true,
          },
        },
      },
    });

    if (!team) {
      return res.status(404).json({ message: "팀을 찾을 수 없습니다." });
    }

    // 선수 정보 추출
    const players = team.Teams_Players.map((p) => p.Players);

    // 응답
    res.status(200).json({
      team_name: team.teams_name,
      playersInfo: players,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "팀 상세 조회 중 오류가 발생했습니다.",
    });
  }
});

// 팀 전체 조회 API
router.get("/teams", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기

  try {
    // 해당 사용자가 소유한 모든 팀 검색
    const teams = await prisma.teams.findMany({
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

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "보유한 팀이 없습니다." });
    }

    // 팀별 선수 정보 추출
    const teamDetails = teams.map((team) => {
      const players = team.Teams_Players.map((p) => p.Players);
      return {
        team_name: team.teams_name,
        playersInfo: players,
      };
    });

    // 응답
    res.status(200).json({
      message: "보유 팀 목록 조회가 완료되었습니다.",
      teams: teamDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "팀 전체 조회 중 오류가 발생했습니다.",
    });
  }
});

export default router;
