import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNavi from "../../hooks/useNavi";
import "./BoardDetail.css"

import axiosInstance from "../../axiosInstance";

const BoardDetail = ({ userInfo }) => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const { goTo } = useNavi();

  useEffect(() => {
    axiosInstance.get(`/upload/${id}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if(loading)
    return <div>로딩 중...</div>
  
  if(!board)
    return <div>존재하지 않는 게시물입니다.</div>

  return (
    <>
      <div className="boardDetailWrapper">
        <div className="boardDetail">
          <h2>{board.title}</h2>
          <p>{board.writer}</p>
          {
            board.img != null &&
            <img src={`${import.meta.env.VITE_SERVER_URL}/upload/${board.file}`} alt="" />
          }
          <p>{board.content}</p>

          <div className="BoardButtonGroup">
            <button className="toListBtn" onClick={() => goTo('/board')}>목록</button>
            <button className="deleteBoardBtn" onClick={() => {
              if(!userInfo || userInfo.username != board.writer) {
                alert('작성자만 삭제 가능합니다.')
                return;
              }

              if(!confirm('게시물을 삭제하시겠습니까?'))
                return;

              axiosInstance.delete(`/upload/${id}`)
                .then(response => {
                  alert(response.data);
                  goTo('/board');
                })
                .catch(error => console.error(error))
            }}>삭제</button>

          </div>
        </div>
          </div>
    </>
  )
}

export default BoardDetail;