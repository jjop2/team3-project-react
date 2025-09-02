import useNavi from "../../hooks/useNavi";
import './Board.css'

import img1 from "../../images/모험돌이.png"

const Board = () => {
  const {goTo} = useNavi();

  return (
    <>
      <div className="board">
        <h1>게시글 목록</h1>
        <button onClick={() => goTo('/write')}>게시글 작성</button>

        <div className="boardList">
          <div className="boardCard">
            <div className="boardImg" style={{'backgroundImage':`url(${img1})`}}></div>
            <div className="boardText">
              <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
              <p>작성자</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Board;