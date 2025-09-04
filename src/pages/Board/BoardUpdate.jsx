import { useParams } from "react-router-dom";
import useNavi from "../../hooks/useNavi";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import useAuthCheck from "../../hooks/useAuthCheck";
import axios from "axios";

const BoardUpdate = ({ userInfo, isLoading }) => {
  useAuthCheck({ userInfo, isLoading });

  const { id } = useParams();
  const { goTo } = useNavi();

  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const [imgPreviewUrl, setImgPreviewUrl] =  useState(null);
  const [update, setUpdate] = useState({
    title : '',
    content : '',
    file: null,
    existingImg: ''
  });
  
  useEffect(() => {
    axiosInstance.get(`/upload/${id}`)
      .then(response => {
        setBoard(response.data);
        setUpdate({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          existingImg: response.data.img
        });

        // 미리보기
        if(response.data.img) {
          setImgPreviewUrl(`${import.meta.env.VITE_SERVER_URL}/upload/file/${response.data.img}`);
        }
        
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }, [])
    
    if(loading)
      return <div>로딩 중...</div>
    
    if(userInfo.nickname !== board.writerName) {
      alert('잘못된 접근입니다');
      goTo(-1);
    }
    
    
    const onChangeHandler = (e) => {
      const targetName = e.target.name;
      
      if(targetName !== 'file') {
        setUpdate({
          ...update,
          [targetName] : e.target.value
        })
      } else {
        const file = e.target.files[0];
        setUpdate({
          ...update,
          [targetName] : file
        });
        
        if(file) {
          setImgPreviewUrl(URL.createObjectURL(file));
        } else {
          setImgPreviewUrl(null);
        }
      }
    }

    const jwt = sessionStorage.getItem('jwt');
    
    const onSubmitHandler = (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("title", update.title);
      formData.append("content", update.content);

      if(update.file != null)
        formData.append("file", update.file);
      else
        formData.append("existingImg", board.img);

    if(!confirm('수정하시겠습니까?')) {
      return;
    }
    
    axios.put(`${import.meta.env.VITE_SERVER_URL}/upload/${id}`, formData, {
      headers: {
        'Authorization': jwt
      }
    })
      .then(response => {
        alert(response.data);
        goTo('/board')
      }).catch(error => console.error(error))
  }

  return (
    <>
      <div className="boardUpdate">
        <h1>게시글 수정</h1>

        <form className="boardForm" onSubmit={onSubmitHandler}>
          <span>작성자</span>
          <input type="text" id="author" name="author" value={userInfo.nickname} readOnly />
          <span>제목</span>
          <input type="text" id="title" name="title" value={update.title} onChange={onChangeHandler} />
          <span>내용</span>
          <input id="content" name="content" value={update.content} onChange={onChangeHandler} />
          <span>이미지 파일</span>
          <input type="file" id="imgUpload" name="file" onChange={onChangeHandler} style={{ 'display': 'none' }} accept="image/*" />
          
          <div className="labelbutton">
            <label htmlFor="imgUpload">
              파일 업로드
            </label>
            {imgPreviewUrl && (
              <div className="image_preview">
                <img src={imgPreviewUrl} alt="미리보기" />
              </div>
            )}
            {imgPreviewUrl && (
              <button className="delete_btn" onClick={(e) => {
                e.preventDefault();
                setData({ ...data, file: null });
                setImgPreviewUrl(null);
                // input file의 value를 초기화하여 같은 파일을 다시 선택할 수 있게 함
                document.getElementById('imgUpload').value = '';
              }}>업로드 삭제</button>
            )}
          </div>
          
          <div className="inputbutton">
            <input className="board_btn input1" type="submit" value="수정" />
            <button type="button" className="board_btn beforebutton" onClick={() => goTo(-1)}>취소</button>
          </div>

        </form>


      </div>
    </>
  )
}

export default BoardUpdate;