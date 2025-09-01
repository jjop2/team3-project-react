import useNavi from "../../hooks/useNavi";

const Board = () => {
  const {goTo} = useNavi();

  return (
    <>
      <h1>게시글 목록</h1>
      <button onClick={() => goTo('/write')}>게시글 작성</button>
    </>
  )
}

export default Board;