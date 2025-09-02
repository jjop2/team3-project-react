import { useState } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import useNavi from "../../hooks/useNavi";
import axiosInstance from "../../axiosInstance";
import './BoardWrite.css'

const BoardWrite = ( {userInfo, isLoading} ) => {
  useAuthCheck({ userInfo, isLoading });
  const {goTo} = useNavi();
  
  const [data, setData] = useState({
    title : '',
    content : '',
    writer : userInfo,
    img : null
  })

  // 이미지 미리보기용 URL 저장
  const [imgPreviewUrl, setImgPreviewUrl] =  useState(null);

  const onChangeHandler = (e) => {
    const targetName = e.target.name;
    
    if(targetName !== 'img') {
      setData({
        ...data,
        [targetName] : e.target.value
      })
    } else {
      const file = e.target.files[0];
      setData({
        ...data,
        [targetName] : file
      });

      // 파일이 선택되면 미리보기 URL 생성
      if(file) {
        // URL.createObjectURL : 파일 객체에 대한 임시 URL을 생성
        setImgPreviewUrl(URL.createObjectURL(file));
      } else {
        setImgPreviewUrl(null);
      }
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(!data.title) {
      alert('제목을 입력해 주세요');
      return;
    } else if(!data.content) {
      alert('내용을 입력해 주세요');
      return;
    } else if(!data.img) {
      alert('이미지를 등록해 주세요');
      return;
    }

    /*
      요청 바디 : data
      {
        title: 제목,
        content: 내용,
        writer: 로그인한 사용자 정보(userInfo = id, nickname, username, email, role, oauth),
        img: 선택한 이미지 정보(name("galio.jpg"), size(25486), type("image/jpeg") 등)
      }
    */

    axiosInstance.post('/board', data, {
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    }).then(response => {
      alert(response.data);
      goTo('/board');
    }).catch(error => console.error(error));
  }
  

  return (
    <>
      <div className="boardWrite">
        <h1>게시글 작성</h1>

        <form onSubmit={onSubmitHandler}>
          <p>제목</p>
          <input type="text" id="title" name="title" onChange={onChangeHandler} /><br/>
          <textarea name="content" id="content" onChange={onChangeHandler}></textarea><br/>
          <input type="file" id="imgUpload" name="img" onChange={onChangeHandler} style={{'display':'none'}} accept="image/*" />
          <label htmlFor="imgUpload">
            파일 업로드
          </label>
          {imgPreviewUrl && (
            <div className="image_preview">
              <img src={imgPreviewUrl} alt="미리보기"  />
            </div>
          )}
          <button onClick={(e) => {
            e.preventDefault();
            setData({...data, img : null});
            setImgPreviewUrl(null);
            // input file의 value를 초기화하여 같은 파일을 다시 선택할 수 있게 함
            document.getElementById('imgUpload').value = '';
          }}>x</button><br/>
          <input type="submit" value="등록" />
        </form>

        <button onClick={()=>goTo('/board')}>목록으로</button>

        

      </div>
    </>
  )
}

export default BoardWrite;