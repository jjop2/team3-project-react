import { useEffect, useState } from "react";
import useNavi from "../../hooks/useNavi";
import './SurveyResult.css';
import axiosInstance from "../../axiosInstance";
const SurveyResult = ({topTwoGenres, surveyResultInfo, userInfo}) =>{

   const { goTo } = useNavi();

  const genreCombinations = {
  "Action+Simulation": {
    title: "총질 마스터",
    desc: "빠른 손가락 + 계산적인 머리, FPS 속의 참모장교",
  },
  "Action+Racing": {
    title: "질주광",
    desc: "속도는 곧 생명, 브레이크 따위는 장식",
  },
  "Action+Sports": {
    title: "운동 돌격대",
    desc: "필드 위 전투요정, 스포츠판 람보",
  },
  "Action+RPG": {
    title: "모험돌이",
    desc: "던전도, 드래곤도 그냥 오늘의 점심거리",
  },
  "Simulation+Racing": {
    title: "가상 레이싱왕",
    desc: "F1 드라이버를 꿈꾸는 방구석 설계자",
  },
  "Simulation+Sports": {
    title: "전략왕 스포츠맨",
    desc: "선수도 감독도 내가 한다! 승부조작(?) 금지",
  },
  "Simulation+RPG": {
    title: "생활왕 RPG",
    desc: "농사도 하고 몬스터도 때려잡는, 1인 다역 인생왕",
  },
  "Racing+Sports": {
    title: "트랙의 지배자",
    desc: "잔디든 아스팔트든 다 내 경기장",
  },
  "Racing+RPG": {
    title: "질주 모험러",
    desc: "바람보다 빠르게, 퀘스트보다 멀리",
  },
  "Sports+RPG": {
    title: "챔피언 탐험가",
    desc: "리그 우승 + 세계 구원, 하루 2승 클리어",
  },
};
  // 장르 조합하기
  const combinationKey = topTwoGenres
    ? Object.keys(genreCombinations).find(key =>
        topTwoGenres.every(genre => key.includes(genre))
      )
    : null;

  const result = genreCombinations[combinationKey];
  
  useEffect(()=>{ 
      axiosInstance.post('/surveyresult',
       {
        age : surveyResultInfo.age,
        gender : surveyResultInfo.gender,
        preferGenre1Id: surveyResultInfo.preferGenre1,
        preferGenre2Id: surveyResultInfo.preferGenre2,
        combinationGenre : result.title
       })
      .then(response => {
        goTo('/surveyresult');
      }) .catch(error =>{
        console.error(error)
        alert('서버에 전송하지 못했습니다.');
      })
    ;
  }, [])

  return(
    <div className="items-container">
      {result ? (
          <div className="items">
            <h2>{result.title}</h2>
            <p>{result.desc}</p>
            <img src={`../src/images/${result.title}.PNG`} alt={result.title} />
          </div>
        ) : (
          <p>결과를 찾을 수 없습니다. 다시 시도해 주세요.</p>
        )}
        <div className="btn-container">
         <button className="btn1" onClick={()=>{
          goTo('/')
        }}>처음으로 돌아가기</button>

          <button className="btn2" onClick={() => {
            goTo(`/recommendgame`)
          }}>맞춤형 게임 추천</button>
        </div>
    </div>
  )
}

export default SurveyResult;