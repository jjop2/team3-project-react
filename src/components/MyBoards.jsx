import { useEffect, useState } from "react";
import useNavi from "../hooks/useNavi";
import axiosInstance from "../axiosInstance";
import "./MyBoards.css"

const MyBoards = ({userInfo}) => {
  const {goTo} = useNavi();
  const [loading, setLoading] = useState(true);
  const [myList, seMyList] = useState([]); // 게시글 전체 목록
  const [visibleCount, setVisibleCount] = useState(8); // 화면에 보여줄 개수

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8); // 8개씩 늘리기
  };

  useEffect(() => {
    axiosInstance.get(`/myboards/${userInfo.id}`)
      .then(response => seMyList(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [])

  if(loading)
    return <div>게시글 목록 불러오는 중...</div>

  // 게시글 카드
  function myBoardCard(board, i) {
    return (
      <div className="myBoardCard" onClick={() => {
        goTo(`/board/${board.id}`);
      }}>
        <div className="myBoardText">
          <p className="myBoardTitle">{board.title}</p>
          <p className="myBoardName">{board.writerName}</p>
        </div>
      </div>
    )
  }
  

  return (
    <>
      <div className="myBoards">
        <div className="myList">
          {
            myList.length > 0 ? (
              myList.slice(0, visibleCount).map((board, i) => {
                return (
                  <div key={i}>
                    {myBoardCard(board, i)}
                  </div>
                )
              })
            ) : (
              <p>
                아직 게시글을 올리지 않으셨네요 <br />
                테스트를 마치고 나만의 유형을 공유해보세요!
              </p>
            )
          }

          {visibleCount < myList.length && (
            <div>
              <button className="btn" onClick={handleLoadMore}>더보기</button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default MyBoards;