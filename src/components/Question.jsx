import { useState } from "react";
import './Question.css'
import { useNavigate } from "react-router-dom";
import useNavi from "../hooks/useNavi";

const Question = ({setTopTwoGenres}) =>{
const {goHome, goTo} = useNavi();
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
      { text: "🏗️ 전략과 관리 중심", genre: "Simulation" },
      { text: "⚔️ 빠른 액션과 전투 중심", genre: "Action" },
      { text: "🏎️ 스피드와 경쟁 중심", genre: "Racing" },
      { text: "🏆 팀 경기 중심", genre: "Sports" },
      { text: "🧙 캐릭터 성장 중심", genre: "RPG" },
    ],
  },
  {
    id: 4,
    question: "게임에서 가장 즐거운 요소는 무엇인가요? 😆",
    options: [
      { text: "🏎️ 레이스에서 승리하는 재미", genre: "Racing" },
      { text: "🧩 문제 해결과 전략", genre: "Simulation" },
      { text: "⚡ 전투와 도전", genre: "Action" },
      { text: "📖 몰입감 있는 스토리", genre: "RPG" },
      { text: "🤝 팀 경기와 경쟁", genre: "Sports" },
    ],
  },
  {
    id: 5,
    question: "게임 속 캐릭터 유형은 어떤 걸 좋아하나요? 👤",
    options: [
      { text: "🏎️ 레이서 캐릭터", genre: "Racing" },
      { text: "🏗️ 계획적 캐릭터", genre: "Simulation" },
      { text: "⚡ 공격적 캐릭터", genre: "Action" },
      { text: "🌱 성장하는 캐릭터", genre: "RPG" },
      { text: "⚽ 스포츠 선수 캐릭터", genre: "Sports" },
    ],
  },
  {
    id: 6,
    question: "게임 세계를 선택할 때 어떤 테마를 선호하나요? 🌍",
    options: [
      { text: "🏗️ 전략과 관리 중심 세계", genre: "Simulation" },
      { text: "🏎️ 레이싱 트랙과 경쟁", genre: "Racing" },
      { text: "🧝 판타지와 모험", genre: "RPG" },
      { text: "🔫 현실적 액션", genre: "Action" },
      { text: "🏟️ 현실 스포츠", genre: "Sports" },
    ],
  },
  {
    id: 7,
    question: "혼자 플레이와 멀티플레이 중 어떤 걸 선호하나요? 👥",
    options: [
      { text: "🏎️ 혼자 레이스 즐기기", genre: "Racing" },
      { text: "👊 친구와 액션 대전", genre: "Action" },
      { text: "📖 혼자 성장", genre: "RPG" },
      { text: "🏗️ 전략과 계획 혼자 수행", genre: "Simulation" },
      { text: "🤝 팀 경기에서 승리", genre: "Sports" },
    ],
  },
  {
    id: 8,
    question: "게임 목표를 어떻게 설정하나요? 🎯",
    options: [
      { text: "🏎️ 최고 기록 달성", genre: "Racing" },
      { text: "⚔️ 점수 경쟁과 적 처치", genre: "Action" },
      { text: "🏆 팀 경기 승리", genre: "Sports" },
      { text: "📈 캐릭터 성장 완료", genre: "RPG" },
      { text: "🏗️ 전략 목표 달성", genre: "Simulation" },
    ],
  },
  {
    id: 9,
    question: "게임을 할 때 가장 집중하는 요소는? 🔎",
    options: [
      { text: "⚡ 빠른 손놀림과 콤보", genre: "Action" },
      { text: "🏗️ 전략적 계획", genre: "Simulation" },
      { text: "🏎️ 레이스 승리", genre: "Racing" },
      { text: "🏟️ 경기 승리와 팀 전략", genre: "Sports" },
      { text: "🌱 캐릭터 성장", genre: "RPG" },
    ],
  },
  {
    id: 10,
    question: "게임 그래픽에서 가장 중요하게 생각하는 것은? 🎨",
    options: [
      { text: "🏎️ 트랙과 차량 표현", genre: "Racing" },
      { text: "🏗️ 전략적 인터페이스", genre: "Simulation" },
      { text: "⚔️ 액션과 전투 장면", genre: "Action" },
      { text: "🧝 판타지 세계와 캐릭터 디자인", genre: "RPG" },
      { text: "⚽ 스포츠 경기장 묘사", genre: "Sports" },
    ],
  },
  {
    id: 11,
    question: "게임 진행 속도는? ⏳",
    options: [
      { text: "🏎️ 레이스 속도", genre: "Racing" },
      { text: "⚡ 빠른 액션과 반사신경", genre: "Action" },
      { text: "🏗️ 전략적 판단", genre: "Simulation" },
      { text: "⚽ 실제 경기 속도", genre: "Sports" },
      { text: "🐢 천천히 즐기며 성장", genre: "RPG" },
    ],
  },
  {
    id: 12,
    question: "보통 게임을 할 때 플레이 시간은 어느 정도인가요? ⏰",
    options: [
      { text: "30분 이하", genre: "Racing"},
      { text: "30분~1시간", genre: "Sports"},
      { text: "1~2시간", genre: "Action"},
      { text: "3~4시간", genre: "Simulation" },
      { text: "4시간 이상, 몰입해서 플레이", genre: "RPG" },
      
    ],
  },
];

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  
    const countGenres = (answers) => {
    const genreCount = {};

    // 장르별 카운터
    Object.values(answers).forEach((answer) => {
      const genre = answer.genre;
      if (genre) {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      }
    });

    return genreCount;
  };


    const handleNext = () => {
    if (!selected) {
      alert("하나를 선택해주세요!");
      return;
    }

    const updatedAnswers = {
    ...answers,
      [QuestionList[current].id]: {
      text: selected,
      genre: QuestionList[current].options.find(o => o.text === selected).genre,
    },
  };
  setAnswers(updatedAnswers);
     setSelected("");

    // 다음질문
    if (current < QuestionList.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("설문이 완료되었습니다!");

      // 장르별 카운트
      const genreCount = countGenres(updatedAnswers);

      // 2개 장르 뽑기
      const sorted = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
      const topGenres = sorted.slice(0, 2).map(item => item[0]);
      setTopTwoGenres(topGenres);
      goTo('/surveyresult');
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