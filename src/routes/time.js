import express from "express"

const router = express.Router();

router.get("/time", (req, res) => {
    
    const date =  new Date(); // UTC, GMT
    const currentKorTime = `${date.getFullYear()}년 ${(date.getMonth() + 1)}월 ${date.getDay()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`

    // res.status(200).json({time: currentKorTime})
    res.status(200).send(`<p>${currentKorTime}</p>`)

    // 시간 > 분 > 초 > 밀리세컨드
    //           1초 === 1000ms
    //          0.05 === 50ms

    // const year = date.getFullYear();
    // const year = 2024 // 이게 년도 만드는 로직 
})

export default router;
