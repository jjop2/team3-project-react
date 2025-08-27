import { useState } from "react";
import './Question.css'
import { useNavigate } from "react-router-dom";

const Question = () =>{

const QuestionList = [
  {
    id: 1,
    question: "성별을 선택해주세요 👤",
    options: [
      { text: "👨 남성", genre: null },
      { text: "👩 여성", genre: null },
      { text: "❌ 선택하지 않음", genre: null },
    ],
  },
  {
    id: 2,
    question: "나이를 선택해주세요 🧮",
    options: [
      { text: "10대", genre: null },
      { text: "20대", genre: null },
      { text: "30대", genre: null },
      { text: "40대 이상", genre: null },
    ],
  },
  {
    id: 3,
    question: "당신이 선호하는 플레이 스타일은? 🎮",
    options: [
      { text: "🧙 캐릭터 성장과 스토리 진행", genre: "RPG" },
      { text: "⚔️ 빠른 반사신경과 전투 중심", genre: "액션" },
      { text: "🧩 퍼즐 해결과 전략적 선택", genre: "퍼즐" },
      { text: "🏆 팀 경기와 승리 경험", genre: "스포츠" },
      { text: "🗺️ 탐험과 모험 중심", genre: "어드벤처" },
    ],
  },
  {
    id: 4,
    question: "게임에서 가장 즐거운 요소는 무엇인가요? 😆",
    options: [
      { text: "📖 스토리를 따라가는 몰입감", genre: "RPG" },
      { text: "⚡ 적과의 액션 전투", genre: "액션" },
      { text: "🧠 문제를 풀고 전략적 성취", genre: "퍼즐" },
      { text: "🤝 친구와 경기에서 이기는 재미", genre: "스포츠" },
      { text: "🔍 숨겨진 장소를 탐험하는 재미", genre: "어드벤처" },
    ],
  },
  {
    id: 5,
    question: "게임 속 캐릭터 유형은 어떤 걸 좋아하나요? 👤",
    options: [
      { text: "🌱 성장하는 주인공", genre: "RPG" },
      { text: "⚡ 빠르고 공격적인 캐릭터", genre: "액션" },
      { text: "🧩 논리적 문제 해결 캐릭터", genre: "퍼즐" },
      { text: "⚽ 스포츠 선수 캐릭터", genre: "스포츠" },
      { text: "🧭 탐험가 또는 모험가", genre: "어드벤처" },
    ],
  },
  {
    id: 6,
    question: "게임 세계를 선택할 때 어떤 테마를 선호하나요? 🌍",
    options: [
      { text: "🧝 판타지와 모험 가득", genre: "RPG" },
      { text: "🔫 현실적 전투와 액션", genre: "액션" },
      { text: "🧩 논리적 문제와 퍼즐 중심", genre: "퍼즐" },
      { text: "🏟️ 스포츠 경기장과 현실 스포츠", genre: "스포츠" },
      { text: "🗺️ 탐험과 숨겨진 장소 발견", genre: "어드벤처" },
    ],
  },
  {
    id: 7,
    question: "혼자 플레이와 멀티플레이 중 어떤 걸 선호하나요? 👥",
    options: [
      { text: "📖 혼자 스토리를 즐기며 성장", genre: "RPG" },
      { text: "👊 친구와 함께 액션 대전", genre: "액션" },
      { text: "🧩 퍼즐을 혼자 풀며 몰입", genre: "퍼즐" },
      { text: "🤝 팀 경기에서 승리 경험", genre: "스포츠" },
      { text: "🗺️ 혼자 탐험하며 발견", genre: "어드벤처" },
    ],
  },
  {
    id: 8,
    question: "게임 목표를 어떻게 설정하나요? 🎯",
    options: [
      { text: "📈 캐릭터 성장과 퀘스트 완료", genre: "RPG" },
      { text: "⚔️ 적 처치와 점수 경쟁", genre: "액션" },
      { text: "🧠 문제 해결과 전략적 성취", genre: "퍼즐" },
      { text: "🏆 팀 경기 승리와 기록 달성", genre: "스포츠" },
      { text: "🔍 탐험과 숨은 요소 발견", genre: "어드벤처" },
    ],
  },
  {
    id: 9,
    question: "게임을 할 때 가장 집중하는 요소는? 🔎",
    options: [
      { text: "🌱 캐릭터 성장과 퀘스트", genre: "RPG" },
      { text: "⚡ 빠른 손놀림과 콤보 공격", genre: "액션" },
      { text: "🧠 논리적 문제 해결", genre: "퍼즐" },
      { text: "🏟️ 경기 승리와 팀 전략", genre: "스포츠" },
      { text: "🗺️ 탐험과 숨겨진 아이템 발견", genre: "어드벤처" },
    ],
  },
  {
    id: 10,
    question: "게임 그래픽에서 가장 중요하게 생각하는 것은? 🎨",
    options: [
      { text: "🧝 판타지 세계와 캐릭터 디자인", genre: "RPG" },
      { text: "⚔️ 현실적 액션과 전투 장면", genre: "액션" },
      { text: "🧩 퍼즐과 인터페이스의 명확성", genre: "퍼즐" },
      { text: "⚽ 스포츠 경기장과 선수 묘사", genre: "스포츠" },
      { text: "🌄 탐험 환경과 배경 표현", genre: "어드벤처" },
    ],
  },
  {
    id: 11,
    question: "게임 진행 속도는? ⏳",
    options: [
      { text: "🐢 천천히 즐기며 성장", genre: "RPG" },
      { text: "⚡ 빠른 액션과 반사신경", genre: "액션" },
      { text: "🧠 문제 해결과 전략 중심", genre: "퍼즐" },
      { text: "⚽ 실제 경기 속도와 동일", genre: "스포츠" },
      { text: "🗺️ 여유롭게 탐험하며 스토리 진행", genre: "어드벤처" },
    ],
  },
  {
    id: 12,
    question: "보통 게임을 할 때 플레이 시간은 어느 정도인가요? ⏰",
    options: [
      { text: "⏱️ 짧게, 30분~1시간 정도", genre: "퍼즐" },
      { text: "⌛ 1~2시간", genre: "스포츠" },
      { text: "⚡ 3~4시간", genre: "액션" },
      { text: "🕰️ 4시간 이상, 몰입해서 플레이", genre: "RPG" },
      { text: "🌍 시간 구애 없이 탐험과 발견 중심", genre: "어드벤처" },
    ],
  },
];

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});

    const handleNext = () => {
    if (!selected) {
      alert("하나를 선택해주세요!");
      return;
    }
     setAnswers({ ...answers, [QuestionList[current].id]:
      { text: selected, genre: QuestionList[current].options.find(o => o.text === selected).genre}});
     setSelected("");

    // 다음질문
    if (current < QuestionList.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("설문이 완료되었습니다!");

    }
  };
    const handlePrev = () => {

    // 이전질문
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      navigate('/');
    }
  };
  // 선택 답변 저장
  console.log("사용자 답변:", answers);

  return(
    <div className="Question-container">
      <div>
        <p>질문 <span>{QuestionList[current].id}</span>/{QuestionList.length}</p>
        <h2>{QuestionList[current].question}</h2>
        <form>
            {QuestionList[current].options.map((option, i) => (
              <label key={i} className="Question-item">
                <input
                  type="radio"
                  value={option.text}
                  checked={selected === option.text}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <span>{option.text}</span>
              </label>
            ))}
        </form>
      </div>
      <div className="btn-container">
      <button
         onClick={handlePrev}
         className="btn1"
       >
        {current === 0 ? "< 홈으로" : "< 이전"}
       </button>

      <button
         onClick={handleNext}
         className="btn2"
       >
        {current === QuestionList.length - 1 ? "완료" : "다음 >"}
       </button>
       </div>
    </div>

  )
}

export default Question;