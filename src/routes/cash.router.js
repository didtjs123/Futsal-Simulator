import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const prisma = new PrismaClient();

// 캐시 충전 API
router.patch("/cash", authMiddleware, async (req, res) => {
  const { amount } = req.body; // 요청에서 충전 금액 가져오기
  const user = req.accounts; // 인증 미들웨어에서 저장된 사용자 정보
  const parsedAmount = parseInt(amount, 10);
  // amount 유효성 검사
  if (!parsedAmount || parsedAmount <= 0) {
    return res
      .status(400)
      .json({ errorMessage: "유효하지 않은 데이터입니다." });
  }

  try {
    // 캐시 충전
    const updatedUser = await prisma.accounts.update({
      where: { accounts_id: user.accounts_id }, // 인증된 사용자 ID 사용
      data: {
        cash: {
          increment: parsedAmount, // 현재 캐쉬에 amount를 추가
        },
      },
    });

    // 응답
    res.status(200).json({
      message: "캐시 충전이 완료되었습니다.",
      chargeCash: parsedAmount,
      totalCash: updatedUser.cash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "캐쉬 충전을 실패했습니다.",
    });
  }
});

// 보유 캐시 조회 API
router.get("/cash", authMiddleware, async (req, res) => {
  const user = req.accounts; // 인증 미들웨어에서 저장된 사용자 정보

  try {
    // 사용자 캐시 정보 조회
    const account = await prisma.accounts.findUnique({
      where: { accounts_id: user.accounts_id },
    });

    if (!account) {
      return res
        .status(400)
        .json({ errorMessage: "유저 정보가 조회되지 않습니다." });
    }

    // 응답
    res.status(200).json({
      message: "보유 캐시 조회 성공",
      totalCash: account.cash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "캐쉬 조회에 실패했습니다." });
  }
});

export default router;
