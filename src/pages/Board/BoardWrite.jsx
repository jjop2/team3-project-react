import { useState } from "react";

const BoardWrite = ( {userInfo} ) => {

  return (
    <>
      <div className="boardWrite">
        <h1>게시글 작성</h1>

        <form action="">
          <p>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" name="title" />
          </p>
          <p>
            <label htmlFor="content">내용</label>
            <textarea name="content" id="content"></textarea>
          </p>
          
          <input type="file" name="file" />
          <input type="submit" value="등록" />
        </form>

        

      </div>
    </>
  )
}

export default BoardWrite;