import useNavi from "../../hooks/useNavi";
import './Board.css'

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";

import sampleImg from "../../images/모험돌이.png"

const Board = () => {
  const {goTo} = useNavi();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]); // 게시글 목록
  const pazeSize = useRef(12);


  // useEffect(() => {
  //   axiosInstance.get('/upload')
  //     .then(response => setList(response.data))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, [])

  // if(loading)
  //   return <div>게시글 목록 불러오는 중...</div>


  // if(!list)
  //   return <div>등록된 게시물이 없습니다.</div>


  // // 게시글 카드
  // function boardCard(board) {
  //   return (
  //     <div className="boardCard" onClick={() => {
  //       goTo(`/board/${board.id}`);
  //     }}>
  //       <div className="boardImg" style={{'backgroundImage':`url(${import.meta.env.VITE_SERVER_URL}/upload/${board.img})`}}></div>
  //       <div className="boardText">
  //         <h3>{board.title}</h3>
  //         <p>{board.writer}</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="board">
        <h1>자유 게시판</h1>
        <button onClick={() => goTo('/board/write')}>게시글 작성</button>

        <div className="boardList">
          {/* {
            list.map((board, i) => {
              return (
                <div key={i}>
                  {boardCard(board)}
                </div>
              )
            })
          } */}
          
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="boardCard" key={index}>
              <div
                className="boardImg"
                style={{ backgroundImage: `url(${sampleImg})` }}
              ></div>
              <div className="boardText">
                <h3>제목 {index + 1}</h3>
                <p>작성자</p>
              </div>
            </div>
          ))}


        </div>
      </div>
    </>
  )
}

export default Board;