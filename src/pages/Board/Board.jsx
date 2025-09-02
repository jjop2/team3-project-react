import useNavi from "../../hooks/useNavi";
import './Board.css'

import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Board = () => {
  const {goTo} = useNavi();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/board')
      .then(response => setList(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [])

  if(loading)
    return <div>게시글 목록 불러오는 중...</div>


  // 게시글 카드
  function boardCard(board) {
    return (
      <div className="boardCard" onClick={() => {
        goTo(`/board/${board.id}`);
      }}>
        {/* 이미지 - board.img */}
        <div className="boardImg" style={{'backgroundImage':`url(${import.meta.env.VITE_SERVER_URL}/upload/${board.img})`}}></div>
        <div className="boardText">
          <h3>{board.title}</h3>
          <p>{board.writer}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="board">
        <h1>게시글 목록</h1>
        <button onClick={() => goTo('/board/write')}>게시글 작성</button>

        <button onClick={()=>goTo('/board/1')}>임시</button>

        <div className="boardList">
          {
            list.map((board, i) => {
              return (
                <div key={i}>
                  {boardCard(board)}
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Board;