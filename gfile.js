import express from 'express';
const router = express.Router();

router.post('/in-game', async (req, res) => {
    let gameResult = ""

    function cl() { console.clear() };

    var trand = 0
    function texter(code, name) {

        //오프닝
        if (code === "op") {
            trand = Math.floor(Math.random() * 3) + 1
            if (trand === 1) {
                gameResult += "자 오늘의 매치업은 리그 경기입니다. 리그 경기 한 경기 한 경기가 매우 중요하게 작용하겠죠.\n그렇습니다. 역시 리그는 흐름이 중요합니다, 매경기 집중해서 최선을 다해야합니다.\n"
            }
            if (trand === 2) {
                gameResult += "여러분 안녕하십니까! 축구인들의 심장, 리버풀의 중심지! 안필드에서 인사드립니다!\n"
            }
            if (trand === 3) {
                gameResult += "네, 오늘은 두 클럽 모두 서로 비등비등한 상대를 만났습니다~ 접전이 예상되는데요~\n"
            }
        }
        //패스
        if (code === "ps") {
            trand = Math.floor(Math.random() * 7) + 1
            if (trand === 1) {
                gameResult += name + " 공간을 만들어내는 지능적인 패스!\n"
            }
            if (trand === 2) {
                gameResult += name + " 의 패스! 수비 라인을 무너뜨립니다!\n"
            }
            if (trand === 3) {
                gameResult += name + " 공을 길게 끌지 않고 빠르게 연결해줍니다!\n"
            }
            if (trand === 4) {
                gameResult += name + " 좁은 공간에서 수비수를 따돌리는 패스!\n"
            }
            if (trand === 5) {
                gameResult += name + "의 원터치 패스!\n"
            }
            if (trand === 6) {
                gameResult += "이런 좋은 패스가 경기의 템포를 살려줍니다.\n"
            }
            if (trand === 7) {
                gameResult += "자~ 택배 배달 하나 해야죠?\n"
            }

        }
        //공 이동?
        if (code === "tb") {
            trand = Math.floor(Math.random() * 5) + 1
            if (trand === 1) {
                gameResult += name + "가 잡습니다.\n"
            }
            if (trand === 2) {
                gameResult += name + "입니다.\n"
            }
            if (trand === 3) {
                gameResult += name + "가 받아줍니다.\n"
            }
            if (trand === 4) {
                gameResult += name + ", 호흡 맞춥니다.\n"
            }
            if (trand === 5) {
                gameResult += "공 넘겨받는 " + name + "\n"
            }

        }
        //태클
        if (code === "tk") {

        }
        //옐로카드
        if (code === "yc") {
            trand = Math.floor(Math.random() * 6) + 1
            if (trand === 1) {
                gameResult += "저런 행동은 스포츠맨쉽에 어긋나죠.\n"
            }
            if (trand === 2) {
                gameResult += "옐로우카드를 받습니다.\n"
            }
            if (trand === 3) {
                gameResult += "옐로우카드! 경기가 점점 과열됩니다.\n"
            }
            if (trand === 4) {
                gameResult += name + " 상대 선수를 밀쳤습니다.\n"
            }
            if (trand === 5) {
                gameResult += name + "의 비신사적인 행위\n"
            }
            if (trand === 6) {
                gameResult += name + "아 결국 파울을 하네요\n"
            }

        }
        //슛
        if (code === "sh") {
            trand = Math.floor(Math.random() * 13) + 1
            if (trand === 1) {
                gameResult += name + " 날카로운 슈팅!\n"
            }
            if (trand === 2) {
                gameResult += name + " 슛! 좋아하는 각도죠!\n"
            }
            if (trand === 3) {
                gameResult += name + " 역습에 이은 빠른 슛팅!\n"
            }
            if (trand === 4) {
                gameResult += name + " 헤딩 슛!\n"
            }
            if (trand === 5) {
                gameResult += name + " 키퍼와 1:1찬스!\n"
            }
            if (trand === 6) {
                gameResult += name + " 지능적으로 수비 라인을 벗겨내며 단독찬스!\n"
            }
            if (trand === 7) {
                gameResult += name + "의 한 박자 빠른 슈팅!\n"
            }
            if (trand === 8) {
                gameResult += "빠른 전개에 이은 " + name + "의 슛!\n"
            }
            if (trand === 9) {
                gameResult += name + " 수비수를 앞에 두고 마음먹고 때립니다.\n"
            }
            if (trand === 10) {
                gameResult += name + "의 중거리 슛!\n"
            }
            if (trand === 11) {
                gameResult += name + " 골대 구석을 노리는 슛!\n"
            }
            if (trand === 12) {
                gameResult += name + " 2대1 패스에 이은 슛!\n"
            }
            if (trand === 13) {
                gameResult += name + " 수비수를 따돌리고 회심의 슛!\n"
            }
        }
        //방어
        if (code === "df") {
            trand = Math.floor(Math.random() * 10) + 1
            if (trand === 1) {
                gameResult += "골키퍼 무릎으로 쳐 냅니다.\n"
            }
            if (trand === 2) {
                gameResult += name + "의 신들린 선방\n"
            }
            if (trand === 3) {
                gameResult += "상대 선수는 골문이 좁아 보이겠어요.\n"
            }
            if (trand === 4) {
                gameResult += "시도는 좋았습니다.\n"
            }
            if (trand === 5) {
                gameResult += "골키퍼의 방어 능력, 좋습니다.\n"
            }
            if (trand === 6) {
                gameResult += name + " 멋진 다이빙!\n"
            }
            if (trand === 7) {
                gameResult += name + ", 아크로바틱한 세이브!\n"
            }
            if (trand === 8) {
                gameResult += "아! 이 골키퍼 뚫기 어렵죠~\n"
            }
            if (trand === 9) {
                gameResult += "역시 레벨이 높은 골키퍼입니다. 잘 막아냈습니다.\n"
            }
            if (trand === 10) {
                gameResult += "아, 정말 듬직~한 키퍼의 듬직~한 선방입니다.\n"
            }
        }
        //골
        if (code === "gl") {
            trand = Math.floor(Math.random() * 10) + 1
            if (trand === 1) {
                gameResult += "고오오오오오오오오오오오오오오올!\n"
            }
            if (trand === 2) {
                gameResult += "골! 오늘 감이 좋은데요!!\n"
            }
            if (trand === 3) {
                gameResult += "골~ 와! 이게 들어가네요.\n"
            }
            if (trand === 4) {
                gameResult += "득점포가 불을 뿜습니다.\n"
            }
            if (trand === 5) {
                gameResult += "기적같은 골!\n"
            }
            if (trand === 6) {
                gameResult += "대단한 골! 팬들이 열광합니다!.\n"
            }
            if (trand === 7) {
                gameResult += "골! 기회를 놓치지 않네요!.\n"
            }
            if (trand === 8) {
                gameResult += "골~ 키퍼 맞고 들어갑니다!\n"
            }
            if (trand === 9) {
                gameResult += "고오올~ 이 슈팅 크로스바 바로 밑으로 들어갑니다!\n"
            }
            if (trand === 10) {
                gameResult += "엄청난 테크니션입니다, 멋진 골입니다!\n"
            }
        }
        //빗나감
        if (code === "ms") {
            trand = Math.floor(Math.random() * 10) + 1
            if (trand === 1) {
                gameResult += "마무리가 아쉽습니다.\n"
            }
            if (trand === 2) {
                gameResult += "어이없이 빗나갑니다.\n"
            }
            if (trand === 3) {
                gameResult += "아... 발만 가져다 대면 골이었는데요.\n"
            }
            if (trand === 4) {
                gameResult += "슈팅 시도 자체는 나쁘지 않았습니다.\n"
            }
            if (trand === 5) {
                gameResult += "볼이 뜨네요. 디딤발 위치가 좋지 않았어요.\n"
            }
            if (trand === 6) {
                gameResult += "팬들이 야유합니다.\n"
            }
            if (trand === 7) {
                gameResult += "이런 실수를 하면 안되거든요.\n"
            }
            if (trand === 8) {
                gameResult += "너무 힘이 들어가서 임팩트가 정확하지 못했네요.\n"
            }
            if (trand === 9) {
                gameResult += "아깝습니다. 살짝 빗나가는군요~\n"
            }
            if (trand === 10) {
                gameResult += "득점으로 연결하질 못합니다.\n"
            }

        }
    }




    const Ateam = {
        teamname: "수족관",

        p1name: "아귀",
        p1speed: 86,
        p1goal: 98,
        p1power: 94,
        p1defense: 75,
        p1stamina: 85,

        p2name: "꽁치",
        p2speed: 98,
        p2goal: 84,
        p2power: 99,
        p2defense: 80,
        p2stamina: 86,

        p3name: "장어",
        p3speed: 90,
        p3goal: 70,
        p3power: 81,
        p3defense: 90,
        p3stamina: 80,

        p4name: "넙치",
        p4speed: 90,
        p4goal: 70,
        p4power: 81,
        p4defense: 90,
        p4stamina: 80,

        p5name: "참치",
        p5speed: 90,
        p5goal: 70,
        p5power: 81,
        p5defense: 90,
        p5stamina: 80,
    }
    const Bteam = {
        teamname: "동물원",

        p1name: "사자",
        p1speed: 90,
        p1goal: 90,
        p1power: 99,
        p1defense: 70,
        p1stamina: 90,

        p2name: "얼룩말",
        p2speed: 99,
        p2goal: 75,
        p2power: 89,
        p2defense: 75,
        p2stamina: 85,

        p3name: "불곰",
        p3speed: 80,
        p3goal: 70,
        p3power: 90,
        p3defense: 99,
        p3stamina: 80,

        p4name: "기린",
        p4speed: 90,
        p4goal: 70,
        p4power: 81,
        p4defense: 90,
        p4stamina: 80,

        p5name: "백마",
        p5speed: 90,
        p5goal: 70,
        p5power: 81,
        p5defense: 90,
        p5stamina: 80,
    }

    function ingame1(a, b) {
        const a1p = (a.p1speed * 0.1) + (a.p1goal * 0.25) + (a.p1power * 0.15) + (a.p1defense * 0.3) + (a.p1stamina * 0.2)
        const a2p = (a.p2speed * 0.1) + (a.p2goal * 0.25) + (a.p2power * 0.15) + (a.p2defense * 0.3) + (a.p2stamina * 0.2)
        const a3p = (a.p3speed * 0.1) + (a.p3goal * 0.25) + (a.p3power * 0.15) + (a.p3defense * 0.3) + (a.p3stamina * 0.2)
        const ap = a1p + a2p + a3p

        const b1p = (b.p1speed * 0.1) + (b.p1goal * 0.25) + (b.p1power * 0.15) + (b.p1defense * 0.3) + (b.p1stamina * 0.2)
        const b2p = (b.p2speed * 0.1) + (b.p2goal * 0.25) + (b.p2power * 0.15) + (b.p2defense * 0.3) + (b.p2stamina * 0.2)
        const b3p = (b.p3speed * 0.1) + (b.p3goal * 0.25) + (b.p3power * 0.15) + (b.p3defense * 0.3) + (b.p3stamina * 0.2)
        const bp = b1p + b2p + b3p

        const maxScore = ap + bp;
        const randomValue = Math.random() * maxScore;

        var ascore = 0
        var bscore = 0
        var rand = 0
        var page = 0
        var ball = ""
        var bname = ""
        var bteam = ""
        var bgoal = 0
        var bdefense = 0
        var tkpower = 0
        var tk = 0

        function bcheck() {
            if (ball === "ap1" || ball === "ap2" || ball === "ap3" || ball === "ap4" || ball === "ap5") {
                if (ball === "ap1") {
                    bname = a.p1name
                    bgoal = a.p1goal
                    bdefense = a.p1defense
                }
                if (ball === "ap2") {
                    bname = a.p2name
                    bgoal = a.p2goal
                    bdefense = a.p2defense
                }
                if (ball === "ap3") {
                    bname = a.p3name
                    bgoal = a.p3goal
                    bdefense = a.p3defense
                }
                if (ball === "ap4") {
                    bname = a.p4name
                    bgoal = a.p4goal
                    bdefense = a.p4defense
                }
                if (ball === "ap5") {
                    bname = a.p5name
                    bgoal = a.p5goal
                    bdefense = a.p5defense
                }
                bteam = "a"
            }
            if (ball === "bp1" || ball === "bp2" || ball === "bp3" || ball === "bp4" || ball === "bp5") {
                if (ball === "bp1") {
                    bname = b.p1name
                    bgoal = b.p1goal
                    bdefense = b.p1defense
                }
                if (ball === "bp2") {
                    bname = b.p2name
                    bgoal = b.p2goal
                    bdefense = b.p2defense
                }
                if (ball === "bp3") {
                    bname = b.p3name
                    bgoal = b.p3goal
                    bdefense = b.p3defense
                }
                if (ball === "bp4") {
                    bname = b.p4name
                    bgoal = b.p5goal
                    bdefense = b.p5defense
                }
                if (ball === "bp5") {
                    bname = b.p5name
                    bgoal = b.p5goal
                    bdefense = b.p5defense
                }
                bteam = "b"
            }
        }

        var turn = 10

        for (let i = 0; i < turn;) {
            page = 0
            bteam = ""

            if (i === Math.floor(turn / 2)) {
                gameResult += ascore + " - " + bscore + "\n"
                gameResult += "후반 시작\n"
            }
            if (i === 0) {//첫 시작
                gameResult += ascore + " - " + bscore + "\n"
                gameResult += "경기 시작\n"
                texter("op", "non")
                if (a.p1speed > b.p1speed) {
                    ball = "ap1"
                }
                if (a.p1speed < b.p1speed) {
                    ball = "bp1"
                }
                if (a.p1speed === b.p1speed) {
                    rand = Math.floor(Math.random() * 2) + 1
                    if (rand === 1) {
                        ball = "ap1"
                    } else {
                        ball = "bp1"
                    }
                    rand = 0
                }
            } else {
                rand = Math.floor(Math.random() * 100) + 1
                if (rand > 50) {
                    ball = "ap" + (Math.floor(Math.random() * 4) + 1)
                } else {
                    ball = "bp" + (Math.floor(Math.random() * 4) + 1)
                }
                rand = 0
            }
            while (page === 0) {
                rand = Math.floor(Math.random() * 100) + 1
                if (rand > 0 && rand <= 25) { //25% 패스
                    bcheck()
                    texter("ps", bname)
                    if (ball === "ap1" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap2"
                        }
                        if (rand === 2) {
                            ball = "ap3"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap2" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap3"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap3" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap2"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap4" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap2"
                        }
                        if (rand === 3) {
                            ball = "ap3"
                        }
                        rand = 0
                    }
                    if (ball === "bp1" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp2"
                        }
                        if (rand === 2) {
                            ball = "bp3"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp2" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp3"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp3" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp2"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp4" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp2"
                        }
                        if (rand === 3) {
                            ball = "bp3"
                        }
                        rand = 0
                    }
                }
                if (rand > 25 && rand <= 50) { //25% 드리블
                    bcheck()
                    texter("tb", bname)
                    rand = Math.floor(Math.random() * 100) + 1
                    if (rand > 0 && rand <= 30) { //30% 패스
                        bcheck()
                        texter("ps", bname)
                        if (ball === "ap1" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap2"
                            }
                            if (rand === 2) {
                                ball = "ap3"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap2" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap3"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap3" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap2"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap4" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap2"
                            }
                            if (rand === 3) {
                                ball = "ap3"
                            }
                            rand = 0
                        }
                        if (ball === "bp1" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp2"
                            }
                            if (rand === 2) {
                                ball = "bp3"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp2" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp3"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp3" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp2"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp4" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp2"
                            }
                            if (rand === 3) {
                                ball = "bp3"
                            }
                            rand = 0
                        }
                    }
                    if (rand > 30 && rand <= 40) { //10% 태클 당함
                        switch (bteam) {
                            case "a":
                                ball = "bp" + tk
                                break;
                            case "b":
                                ball = "ap" + tk
                                break;
                            default://err
                                break;
                        }
                        bcheck()
                        texter("tk", bname)
                        rand = Math.floor(Math.random() * 10) + 1
                        if (rand === 1) {
                            texter("yc", bname)
                            page = 1
                        }
                        rand = 0
                    }
                    if (rand > 40) { //60% 슛
                        rand = 0
                        page = 1
                    }
                    rand = 0
                }
                if (rand > 50 && rand <= 60) { //10% 뺏기기
                    rand = Math.floor(Math.random() * 4) + 1
                    if (bteam === "a") {
                        if (rand === 1) {
                            tkpower = b.p1power
                            tk = 1
                        }
                        if (rand === 2) {
                            tkpower = b.p2power
                            tk = 2
                        }
                        if (rand === 3) {
                            tkpower = b.p3power
                            tk = 3
                        }
                        if (rand === 4) {
                            tkpower = b.p4power
                            tk = 4
                        }
                    }
                    if (bteam === "b") {
                        if (rand === 1) {
                            tkpower = a.p1power
                            tk = 1
                        }
                        if (rand === 2) {
                            tkpower = a.p2power
                            tk = 2
                        }
                        if (rand === 3) {
                            tkpower = a.p3power
                            tk = 3
                        }
                        if (rand === 4) {
                            tkpower = a.p4power
                            tk = 4
                        }
                    }
                    rand = Math.floor(Math.random() * ((bdefense - 50) + (tkpower - 50))) + 1
                    if (rand <= (tkpower - 50)) {
                        switch (bteam) {
                            case "a":
                                ball = "bp" + tk
                                break;
                            case "b":
                                ball = "ap" + tk
                                break;
                            default://err
                                break;
                        }
                    }
                    bcheck()
                    texter("tk", bname)
                    rand = Math.floor(Math.random() * 10) + 1
                    if (rand === 1) {
                        texter("yc", bname)
                        page = 1
                    }
                    rand = 0
                }
                if (rand > 60) { //40% 슛
                    rand = 0
                    page = 1
                }
            }
            if (page === 1) {// 슛
                bcheck()
                texter("sh", bname)
                if (bteam === "a") {
                    rand = Math.floor(Math.random() * ((bgoal - 50) + (b.p5defense - 50))) + 1
                    if (rand <= (b.p5defense - 50)) {
                        texter("df", b.p5name)
                    } else {
                        rand = Math.floor(Math.random() * 100) + 1
                        if (rand <= (bgoal - 20)) {
                            texter("gl", bname)
                            ascore++
                        } else {
                            texter("ms", bname)
                        }
                    }
                }
                if (bteam === "b") {
                    rand = Math.floor(Math.random() * ((bgoal - 50) + (a.p5defense - 50))) + 1
                    if (rand <= (a.p5defense - 50)) {
                        texter("df", a.p5name)
                    } else {
                        rand = Math.floor(Math.random() * 100) + 1
                        if (rand <= (bgoal - 20)) {
                            texter("gl", bname)
                            bscore++
                        } else {
                            texter("ms", bname)
                        }
                    }
                }
                i++
                if (i === Math.floor(turn / 2)) {
                    gameResult += "전반 종료\n"
                }
                gameResult += ascore + " - " + bscore + "\n"
            }

        }
        gameResult += ascore + " - " + bscore + "\n"
        gameResult += "후반 종료\n"
        gameResult += "게임 결과\n"
        gameResult += ascore + " - " + bscore + "\n"
        if (ascore > bscore) {
            gameResult += a.teamname + "팀 승리!\n"
        }
        if (ascore < bscore) {
            gameResult += b.teamname + "팀 승리!\n"
        }
        if (ascore === bscore) {
            gameResult += "무승부!\n"
        }
    }
    function ingame2(a, b) {
        var ascore = 0
        var bscore = 0
        var rand = 0
        var page = 0
        var ball = ""
        var bname = ""
        var bteam = ""
        var bgoal = 0
        var bdefense = 0
        var tkpower = 0
        var tk = 0

        function bcheck() {
            if (ball === "ap1" || ball === "ap2" || ball === "ap3" || ball === "ap4" || ball === "ap5") {
                if (ball === "ap1") {
                    bname = a.p1name
                    bgoal = a.p1goal
                    bdefense = a.p1defense
                }
                if (ball === "ap2") {
                    bname = a.p2name
                    bgoal = a.p2goal
                    bdefense = a.p2defense
                }
                if (ball === "ap3") {
                    bname = a.p3name
                    bgoal = a.p3goal
                    bdefense = a.p3defense
                }
                if (ball === "ap4") {
                    bname = a.p4name
                    bgoal = a.p4goal
                    bdefense = a.p4defense
                }
                if (ball === "ap5") {
                    bname = a.p5name
                    bgoal = a.p5goal
                    bdefense = a.p5defense
                }
                bteam = "a"
            }
            if (ball === "bp1" || ball === "bp2" || ball === "bp3" || ball === "bp4" || ball === "bp5") {
                if (ball === "bp1") {
                    bname = b.p1name
                    bgoal = b.p1goal
                    bdefense = b.p1defense
                }
                if (ball === "bp2") {
                    bname = b.p2name
                    bgoal = b.p2goal
                    bdefense = b.p2defense
                }
                if (ball === "bp3") {
                    bname = b.p3name
                    bgoal = b.p3goal
                    bdefense = b.p3defense
                }
                if (ball === "bp4") {
                    bname = b.p4name
                    bgoal = b.p5goal
                    bdefense = b.p5defense
                }
                if (ball === "bp5") {
                    bname = b.p5name
                    bgoal = b.p5goal
                    bdefense = b.p5defense
                }
                bteam = "b"
            }
        }

        var turn = 20

        for (let i = 0; i < turn; i++) {
            page = 0
            bteam = ""
            if (i === Math.floor(turn / 2)) {
                gameResult += "전반 종료\n"
                gameResult += ascore + " - " + bscore + "\n"
                gameResult += "후반 시작\n"
            }
            if (i === 0) {//첫 시작
                gameResult += ascore + " - " + bscore + "\n"
                gameResult += "경기 시작\n"
                texter("op", "non")
                if (a.p1speed > b.p1speed) {
                    ball = "ap1"
                }
                if (a.p1speed < b.p1speed) {
                    ball = "bp1"
                }
                if (a.p1speed === b.p1speed) {
                    rand = Math.floor(Math.random() * 2) + 1
                    if (rand === 1) {
                        ball = "ap1"
                    } else {
                        ball = "bp1"
                    }
                    rand = 0
                }
            } else {
                rand = Math.floor(Math.random() * 100) + 1
                if (rand > 50) {
                    ball = "ap" + (Math.floor(Math.random() * 4) + 1)
                } else {
                    ball = "bp" + (Math.floor(Math.random() * 4) + 1)
                }
                rand = 0
            }
            while (page === 0) {
                rand = Math.floor(Math.random() * 100) + 1
                if (rand > 0 && rand <= 25) { //25% 패스
                    bcheck()
                    texter("ps", bname)
                    if (ball === "ap1" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap2"
                        }
                        if (rand === 2) {
                            ball = "ap3"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap2" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap3"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap3" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap2"
                        }
                        if (rand === 3) {
                            ball = "ap4"
                        }
                        rand = 0
                    }
                    if (ball === "ap4" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "ap1"
                        }
                        if (rand === 2) {
                            ball = "ap2"
                        }
                        if (rand === 3) {
                            ball = "ap3"
                        }
                        rand = 0
                    }
                    if (ball === "bp1" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp2"
                        }
                        if (rand === 2) {
                            ball = "bp3"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp2" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp3"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp3" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp2"
                        }
                        if (rand === 3) {
                            ball = "bp4"
                        }
                        rand = 0
                    }
                    if (ball === "bp4" && rand > 0) {
                        rand = Math.floor(Math.random() * 3) + 1
                        if (rand === 1) {
                            ball = "bp1"
                        }
                        if (rand === 2) {
                            ball = "bp2"
                        }
                        if (rand === 3) {
                            ball = "bp3"
                        }
                        rand = 0
                    }
                }
                if (rand > 25 && rand <= 50) { //25% 드리블
                    bcheck()
                    texter("tb", bname)
                    rand = Math.floor(Math.random() * 100) + 1
                    if (rand > 0 && rand <= 30) { //30% 패스
                        bcheck()
                        texter("ps", bname)
                        if (ball === "ap1" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap2"
                            }
                            if (rand === 2) {
                                ball = "ap3"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap2" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap3"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap3" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap2"
                            }
                            if (rand === 3) {
                                ball = "ap4"
                            }
                            rand = 0
                        }
                        if (ball === "ap4" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "ap1"
                            }
                            if (rand === 2) {
                                ball = "ap2"
                            }
                            if (rand === 3) {
                                ball = "ap3"
                            }
                            rand = 0
                        }
                        if (ball === "bp1" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp2"
                            }
                            if (rand === 2) {
                                ball = "bp3"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp2" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp3"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp3" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp2"
                            }
                            if (rand === 3) {
                                ball = "bp4"
                            }
                            rand = 0
                        }
                        if (ball === "bp4" && rand > 0) {
                            rand = Math.floor(Math.random() * 3) + 1
                            if (rand === 1) {
                                ball = "bp1"
                            }
                            if (rand === 2) {
                                ball = "bp2"
                            }
                            if (rand === 3) {
                                ball = "bp3"
                            }
                            rand = 0
                        }
                    }
                    if (rand > 30 && rand <= 40) { //10% 태클 당함
                        switch (bteam) {
                            case "a":
                                ball = "bp" + tk
                                break;
                            case "b":
                                ball = "ap" + tk
                                break;
                            default://err
                                break;
                        }
                        bcheck()
                        texter("tk", bname)
                        rand = Math.floor(Math.random() * 10) + 1
                        if (rand === 1) {
                            texter("yc", bname)
                            page = 1
                        }
                        rand = 0
                    }
                    if (rand > 40) { //60% 슛
                        rand = 0
                        page = 1
                    }
                    rand = 0
                }
                if (rand > 50 && rand <= 60) { //10% 뺏기기
                    rand = Math.floor(Math.random() * 4) + 1
                    if (bteam === "a") {
                        if (rand === 1) {
                            tkpower = b.p1power
                            tk = 1
                        }
                        if (rand === 2) {
                            tkpower = b.p2power
                            tk = 2
                        }
                        if (rand === 3) {
                            tkpower = b.p3power
                            tk = 3
                        }
                        if (rand === 4) {
                            tkpower = b.p4power
                            tk = 4
                        }
                    }
                    if (bteam === "b") {
                        if (rand === 1) {
                            tkpower = a.p1power
                            tk = 1
                        }
                        if (rand === 2) {
                            tkpower = a.p2power
                            tk = 2
                        }
                        if (rand === 3) {
                            tkpower = a.p3power
                            tk = 3
                        }
                        if (rand === 4) {
                            tkpower = a.p4power
                            tk = 4
                        }
                    }
                    rand = Math.floor(Math.random() * ((bdefense - 50) + (tkpower - 50))) + 1
                    if (rand <= (tkpower - 50)) {
                        switch (bteam) {
                            case "a":
                                ball = "bp" + tk
                                break;
                            case "b":
                                ball = "ap" + tk
                                break;
                            default://err
                                break;
                        }
                    }
                    bcheck()
                    texter("tk", bname)
                    rand = Math.floor(Math.random() * 10) + 1
                    if (rand === 1) {
                        texter("yc", bname)
                        page = 1
                    }
                    rand = 0
                }
                if (rand > 60) { //40% 슛
                    rand = 0
                    page = 1
                }
            }
            if (page === 1) {// 슛
                bcheck()
                texter("sh", bname)
                if (bteam === "a") {
                    rand = Math.floor(Math.random() * ((bgoal - 50) + (b.p5defense - 50))) + 1
                    if (rand <= (b.p5defense - 50)) {
                        texter("df", b.p5name)
                    } else {
                        rand = Math.floor(Math.random() * 100) + 1
                        if (rand <= (bgoal - 20)) {
                            texter("gl", bname)
                            ascore++
                        } else {
                            texter("ms", bname)
                        }
                    }
                }
                if (bteam === "b") {
                    rand = Math.floor(Math.random() * ((bgoal - 50) + (a.p5defense - 50))) + 1
                    if (rand <= (a.p5defense - 50)) {
                        texter("df", a.p5name)
                    } else {
                        rand = Math.floor(Math.random() * 100) + 1
                        if (rand <= (bgoal - 20)) {
                            texter("gl", bname)
                            bscore++
                        } else {
                            texter("ms", bname)
                        }
                    }
                }
                gameResult += ascore + " - " + bscore + "\n"
            }

        }
        gameResult += ascore + " - " + bscore + "\n"
        gameResult += "후반 종료\n"
        gameResult += "게임 결과\n"
        gameResult += ascore + " - " + bscore + "\n"
        if (ascore > bscore) {
            gameResult += a.teamname + "팀 승리!\n"
        }
        if (ascore < bscore) {
            gameResult += b.teamname + "팀 승리!\n"
        }
        if (ascore === bscore) {
            gameResult += "무승부!\n"
        }
    }




    cl()
    ingame2(Ateam, Bteam);




    return (gameResult)
})

export default router;