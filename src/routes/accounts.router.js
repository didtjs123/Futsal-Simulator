// src/routes/accounts.router.js

import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

/** 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
 try {
  const { user_id, pwd, nickname, } = req.body;
  const isExistUser = await prisma.accounts.findFirst({
    where: {
      user_id,
    },
  });

  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }
  
  // 사용자 비밀번호를 암호화합니다.
  const hashedPassword = await bcrypt.hash( pwd, 10);
  // accounts 테이블에 사용자를 추가합니다.
  const user = await prisma.accounts.create({
    data: { 
      user_id: user_id,
      pwd: hashedPassword,
      nickname: nickname,
      Teams: {
        create: [{ teams_name: '내스쿼드' }]
      },
      Player_invens: {
        create: [{ }]
      },
    },
  });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' , data: user });
 }catch (error) {
  console.error('Error during sign-up:', error); // 디버깅용 로그
  return res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.', error: error.message });
 }
});

/** 로그인 API **/
router.post('/sign-in', async (req, res, next) => {
  const { user_id, pwd } = req.body;
  const user = await prisma.accounts.findFirst({ where: { user_id } });

  if (!user)
    return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
  // 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
  else if (!(await bcrypt.compare(pwd, user.pwd)))
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

  // 로그인에 성공하면, 사용자의 accounts_id를 바탕으로 토큰을 생성합니다.
  const token = jwt.sign(
    {
      accounts_id: user.accounts_id,
    },
    'custom-secret-key',
  );

  // authotization 쿠키에 Berer 토큰 형식으로 JWT를 저장합니다.
  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 성공' });
});


/** 사용자 전체 조회 API **/
router.get('/accounts', authMiddleware, async (req, res, next) => {
  const user = await prisma.accounts.findMany({
    select: {
      accounts_id: true,
      user_id  : true,
    },
  });

  return res.status(200).json({ message: '사용자가 전체 조회됐습니다.' , data: user });
});

/** 로그아웃 API **/
router.post('/log-out', async (req, res, next) => {
  try {
    // authorization 쿠키를 삭제하여 로그아웃 처리
    res.clearCookie('authorization');
    return res.status(200).json({ message: '로그아웃 성공' });
  } catch (error) {
    next(error); // 에러 핸들링 미들웨어로 전달
  }
});

export default router;
