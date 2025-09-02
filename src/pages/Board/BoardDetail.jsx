import { useState } from "react";
import { useParams } from "react-router-dom";
import useNavi from "../../hooks/useNavi";
import "./BoardDetail.css"

import sampleImg from "../../images/모험돌이.png"

const BoardDetail = ({ userInfo }) => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const { goTo } = useNavi();

  if(loading)
    return <div>로딩 중...</div>
  
  if(!board)
    return <div>존재하지 않는 게시물입니다.</div>

  return (
    <>
      <div className="boardDetailWrapper">
        <div className="boardDetail">
          <h2>제목</h2>
          <p>작성자</p>
          <img src={sampleImg} alt="" />
          <p>내용</p>

          <div className="BoardButtonGroup">
            <button className="toListBtn" onClick={() => goTo('/board')}>목록</button>
            <button className="deleteBoardBtn" onClick={() => {
              if(!userInfo || userInfo.username != board.writer) {
                alert('작성자만 삭제 가능합니다.')
                return;
              }
            }}>삭제</button>

          </div>
        </div>
          </div>
    </>
  )
}

export default BoardDetail;