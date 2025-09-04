import useNavi from "../../hooks/useNavi";
import './Board.css'

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Board = () => {
  const {goTo} = useNavi();
  const [loading, setLoading] = useState(true);
  const [boardList, setBoardList] = useState([]); // 게시글 전체 목록
  const [visibleCount, setVisibleCount] = useState(8); // 화면에 보여줄 개수

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8); // 8개씩 늘리기
  };

  useEffect(() => {
    axiosInstance.get('/upload')
      .then(response => setBoardList(response.data))
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
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/upload/file/${board.img}`}
          
          className="boardImg"
        />
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
        <div className="boardTop">
          <h1>커뮤니티</h1>
        </div>

        <div className="boardList">
          {
            boardList.length > 0 ? (
              boardList.slice(0, visibleCount).map((board, i) => {
                return (
                  <div key={i}>
                    {boardCard(board)}
                  </div>
                )
              })
            ) : (
              <p>
                아무도 게시글을 올리지 않았어요... <br />
                테스트를 마치고 나만의 유형을 사람들과 공유해 보세요!
              </p>
            )
          }
        </div>

          {visibleCount < boardList.length && (
            <div>
              <button className="btn" onClick={handleLoadMore}>더보기</button>
            </div>
          )}

          <div className="boardBottom">
            <button className="toWriteBtn" onClick={() => goTo('/board/write')}>게시글 작성</button>
          </div>

      </div>
    </>
  )
}

export default Board;