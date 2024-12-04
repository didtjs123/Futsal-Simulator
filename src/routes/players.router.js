import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//선수 생성
router.post('/players', async (req, res, next) => {
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
        stamina: stats.stamina
      },
    },
  });

  return res.status(201).json({ message: '선수가 생성됐습니다.' , data: player });
});

// 선수 전체조회
router.get('/players', async (req, res, next) => {
  const player = await prisma.players.findMany({
    select: {
      players_id: true,
      player_invens_players_id: true,
      teams_players_id: true,
      rarity: true,
      stats: {
        speed: true,
        finishing: true,
        shotPower: true,
        defense: true,
        stamina: true,
      },
      created_at: true,
      updated_at: true,
    },
  });

  return res.status(200).json({ message: '전체선수가 조회됐습니다.' , data: player });
});

// 선수 상세조회
router.get('/players/:playersId', async (req, res, next) => {
  const { players_Id } = req.params;
  const player = await prisma.players.findFirst({
    where: { players_Id: +players_Id },
    select: {
      players_id: true,
      player_invens_players_id: true,
      teams_players_id: true,
      rarity: true,
      stats: {
        speed: true,
        finishing: true,
        shotPower: true,
        defense: true,
        stamina: true,
      },
      created_at: true,
      updated_at: true,
    },
  });

  return res.status(200).json({ message: '선수가 상세조회 됐습니다.' , data: player });
});

// 선수 삭제
router.delete('/players/:playersId', async (req, res, next) => {
  const { players_Id } = req.params;

  const player = await prisma.players.findFirst({ where: { players_Id: +players_Id } });

  if (!player)
    return res.status(404).json({ message: '선수가 존재하지 않습니다.' });

  await prisma.players.delete({ where: { players_Id: +players_Id } });

  return res.status(200).json({ data: '선수가 삭제되었습니다.' });
});

export default router;
