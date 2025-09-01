import { useState } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import useNavi from "../../hooks/useNavi";
import axiosInstance from "../../axiosInstance";

const BoardWrite = ( {userInfo, isLoading} ) => {
  useAuthCheck({ userInfo, isLoading });
  const {goTo} = useNavi();

  const [data, setData] = useState({
    title : '',
    content : '',
    writer : userInfo,
    img : null
  })

  const onChangeHandler = (e) => {
    const targetName = e.target.name;
    
    if(targetName !== 'img') {
      setData({
        ...data,
        [targetName] : e.target.value
      })
    } else {
      setData({
        ...data,
        [targetName] : e.target.files[0]
      })
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(!data.title)
      alert('제목을 입력해 주세요')
    else if(!data.content)
      alert('내용을 입력해 주세요')
    else if(!data.img)
      alert('이미지를 등록해 주세요')

    axiosInstance.post('/board', data, {
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    }).then(response => {
      alert(response.data);
      goTo('/board');
    }).catch(error => console.error(error));
  }

  console.log(data)

  return (
    <>
      <div className="boardWrite">
        <h1>게시글 작성</h1>

        <form onSubmit={onSubmitHandler}>
          <input type="text" id="title" name="title" onChange={onChangeHandler} /><br/>
          <textarea name="content" id="content" onChange={onChangeHandler}></textarea><br/>
          <input type="file" name="img" onChange={onChangeHandler} />
          {/* x 누르면 파일 삭제되게 하려고 했는데 옆에 선택된 파일 멘트는 안 없어짐... */}
          <button onClick={(e) => {
            e.preventDefault();
            setData({...data, img : null});
          }}>x</button><br/>
          <input type="submit" value="등록" />
        </form>

        

      </div>
    </>
  )
}

export default BoardWrite;