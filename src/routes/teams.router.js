import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 팀 편성 API
router.patch("/teams", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증된 사용자 정보 가져오기
  const { teamName } = req.query; // 쿼리 파라미터에서 팀 이름 가져오기
  const { striker_inven_id, midfielder_inven_id, defender_inven_id } = req.body; // 요청 바디에서 스트라이커, 미드필더, 디펜더 인벤토리 ID 가져오기

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
    const playerInvenIds = [
      striker_inven_id,
      midfielder_inven_id,
      defender_inven_id,
    ].filter(Boolean); // 요청된 선수 인벤토리 ID 중 존재하는 값만 필터링
    const ownedPlayers = await prisma.player_invens_Players.findMany({
      where: {
        player_invens_players_id: {
          in: playerInvenIds,
        },
        Player_invens: {
          accounts_id: user.accounts_id,
        },
      },
      select: {
        player_invens_players_id: true,
        players_id: true, // Players 테이블과 연결된 players_id도 가져옴
      },
    });

    const ownedPlayerInvenIds = ownedPlayers.map(
      (p) => p.player_invens_players_id
    );
    const invalidPlayers = playerInvenIds.filter(
      (id) => !ownedPlayerInvenIds.includes(id)
    );
    if (invalidPlayers.length > 0) {
      return res.status(400).json({
        errorMessage:
          "선택한 선수 중 보유하지 않은 선수ID가 포함되어 있습니다.",
        "미보유 선수ID": invalidPlayers,
      });
    }

    // 동일한 선수 중복 편성 방지
    const uniquePlayerIds = new Set(
      ownedPlayers.map((player) => player.players_id)
    );
    if (uniquePlayerIds.size !== ownedPlayers.length) {
      return res.status(400).json({
        errorMessage: "같은 선수를 편성할 수 없습니다.",
      });
    }

    // 팀 편성
    await prisma.teams.update({
      where: { teams_id: team.teams_id },
      data: {
        striker_id: striker_inven_id || null,
        midfielder_id: midfielder_inven_id || null,
        defender_id: defender_inven_id || null,
        Teams_Players: {
          deleteMany: {}, // 기존 팀-선수 관계 삭제 (중복 방지)
          create: ownedPlayers.map((player) => ({
            players_id: player.players_id, // Players 테이블과 연결된 players_id 사용
          })),
        },
      },
    });

    // 응답
    res.status(200).json({
      message: "팀 편성이 업데이트되었습니다.",
      team: {
        team_name: team.teams_name,
        striker_inven_id,
        midfielder_inven_id,
        defender_inven_id,
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

    // 선수 정보 추출 (플레이어 인벤 ID 포함, 플레이어 ID 및 기타 정보 제외)
    const players = await Promise.all(
      team.Teams_Players.map(async (p) => {
        const playerInven = await prisma.player_invens_Players.findFirst({
          where: {
            players_id: p.players_id,
            Player_invens: {
              accounts_id: user.accounts_id,
            },
          },
        });

        if (playerInven) {
          const {
            created_at,
            updated_at,
            players_id,
            teams_players_id,
            teams_id,
            ...playerInfo
          } = p.Players;
          return {
            player_inven_id: playerInven.player_invens_players_id,
            ...playerInfo,
          };
        } else {
          return null;
        }
      })
    );

    // 응답에서 유효한 선수 정보만 반환
    res.status(200).json({
      team_name: team.teams_name,
      playersInfo: players.filter((player) => player !== null),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "팀 상세 조회 중 오류가 발생했습니다.",
    });
  }
});

// 내 팀 전체 조회 API
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

    // 팀별 선수 정보 추출 (플레이어 인벤 ID 포함)
    const teamDetails = teams.map((team) => {
      const players = team.Teams_Players.map((p) => {
        const { created_at, updated_at, players_id, ...playerInfo } = p.Players;
        return {
          player_inven_id: p.player_invens_players_id,
          ...playerInfo,
        };
      });
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

// 계정 전체 팀 조회 API
router.get("/all-teams", async (req, res) => {
  try {
    // 모든 계정의 팀 검색
    const teams = await prisma.teams.findMany({
      include: {
        Accounts: {
          select: {
            nickname: true,
          },
        },
        Teams_Players: {
          include: {
            Players: {
              select: {
                rarity: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "조회할 팀이 없습니다." });
    }

    // 팀 정보 추출 (닉네임 포함)
    const teamDetails = teams.map((team) => {
      const players = team.Teams_Players.map((p) => {
        return {
          rarity: p.Players.rarity,
          name: p.Players.name,
        };
      });
      return {
        team_id: team.teams_id,
        nickname: team.Accounts.nickname,
        playersInfo: players,
      };
    });

    // 응답
    res.status(200).json({
      message: "모든 팀 조회가 완료되었습니다.",
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
