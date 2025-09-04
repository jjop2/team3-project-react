import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNavi from "../../hooks/useNavi";
import "./BoardDetail.css"

import axiosInstance from "../../axiosInstance";

const BoardDetail = ({ userInfo }) => {
  const { goTo } = useNavi();
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const [isWriter, setIsWriter] = useState(true); // 로그인한 유저가 게시글 작성자인지 판별

  useEffect(() => {
    axiosInstance.get(`/upload/${id}`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])
  
  useEffect(() => {
    if(!userInfo || !board || userInfo.nickname !== board.writer) {
      setIsWriter(false);
    } else {
      setIsWriter(true);
    }
  }, [userInfo, board]);
  
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
            <img src={`${import.meta.env.VITE_SERVER_URL}/upload/file/${board.img}`} alt="" />
          }
          <p>{board.content}</p>

          <div className="BoardButtonGroup">
            <button className="toListBtn" onClick={() => goTo('/board')}>목록</button>

            {isWriter &&
              <button className="updateBoardBtn" onClick={() => goTo(`/board/${id}/update`)}>수정</button>
            }

            {isWriter &&
              <button className="deleteBoardBtn" onClick={() => {
                if(!confirm('게시물을 삭제하시겠습니까?'))
                  return;

                axiosInstance.delete(`/upload/${id}`)
                  .then(response => {
                    alert(response.data);
                    goTo('/board');
                  })
                  .catch(error => console.error(error))
              }}>삭제</button>
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default BoardDetail;