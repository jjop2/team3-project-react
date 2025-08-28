import { useEffect, useState } from "react";
import './Question.css'
import useNavi from "../hooks/useNavi";
import axios from "axios";
import QuestionList from "./QuestionList.js";

const Question = ({setTopTwoGenres}) =>{
const {goHome, goTo} = useNavi();


  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [age , setAge] = useState("");
  const [gender, setGender] = useState("");

  // 선택된 나이 및 성별 추출하기
  useEffect(()=> {
    if(answers[1]) {
      setAge(answers[1].text);
    }
    if(answers[2]) {
      setGender(answers[2].text);
    }
  },[answers]);

    // 장르별 카운터
    const countGenres = (answers) => {
    const genreCount = {};
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
      
      //서버로 전송하기
      axios.post(`${import.meta.env.VITE_SERVER_URL}/survey`,
       {
        age : age,
        gender : gender,
        topGenres: topGenres
       })
      .then(response => {
        console.log(response);
        goTo('/surveyresult');
      }) .catch(error =>{
        console.error(error)
        alert('서버에 전송하지 못했습니다.');
      })
    }
  };
    const handlePrev = () => {

    // 이전질문
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      goTo('/');
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