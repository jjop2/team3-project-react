import { useEffect, useState } from "react";
import useNavi from "../../hooks/useNavi";
import "./UserModify.css";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

function UserModify({userInfo, setAuth, setUserInfo}) {

  const {goHome,goTo} =useNavi();

  const [userData, setUserData] = useState({
    username:"",
    nickname:"",
    email:"",
    password:""
  });

  // 페이지 로드 시 props의 userInfo로 상태 초기화
  useEffect(() => {
    if (userInfo) {
      setUserData({
        username: userInfo.username || "",
        nickname: userInfo.nickname || "",
        email: userInfo.email || "",
        password: "",
      });
    }
  }, [userInfo]); // userInfo 변경 시 실행

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name !== "username"){

      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    };

  const handleUpdate = () =>{
    axiosInstance.put('/usermodify',{
      nickname:userData.nickname,
      email:userData.email,
      password:userData.password||null
    }).then((response)=>{
      alert(response.data);
      // userData를 업데이트된 값으로 갱신 (예: 백엔드에서 반환된 데이터 사용)
      setUserData(prev =>({
        ...prev,
        nickname:response.data.nickname||prev.nickname,
        email:response.data.email||prev.email,
        password:""
      }))
      axiosInstance.get('/userinfo')
      .then(infoReponse=>{
        setUserInfo(infoReponse.data); // app.jsx에서 관리되는 userinfo업데이트
      })
    })
    .catch((error)=>{
      console.log("Axios Error",error);
      alert("수정실패");
    });
  };

    const handleDelete = () =>{
      if(window.confirm("정말로 탈퇴하시겠습니까?")) {
        axiosInstance.delete('/delete')
        .then((response)=>{
          console.log("Delete Response:",response.data);
          alert(response.data);
          sessionStorage.removeItem('jwt'); // 로그아웃, 세션토큰제거
          setAuth(false); //header와 동기화
          setUserInfo(null); //header와 동기화
          goTo("/");
        })
        .catch((error)=>{
          console.log("Axios Error:", error);
          alert("탈퇴 실패"+(error));
        });

      }
    };

 

  

  return (
    <>
      <section className="UserModify-profile-container">
        <h1 className="UserModify-profile-title">👨‍👦 정보 수정</h1>

        <div className="UserModify-profile-input-group">
          <label htmlFor="UserModify-username">아이디 :</label>
          <input id="UserModify-username" type="text" name="username" placeholder="" required 
           value={userData.username} onChange={handleChange} readOnly/> <br />
        </div>

        <div className="UserModify-profile-input-group">
          <label htmlFor="UserModify-nickname">닉네임 :</label>
          <input id="UserModify-nickname" type="text" name="nickname" placeholder="" required 
           value={userData.nickname} onChange={handleChange}/> <br />
        </div>

        <div className="UserModify-profile-input-group">
          <label htmlFor="UserModify-password">비밀번호 :</label>
          <input id="UserModify-password" type="password" name="password" placeholder="" required 
           onChange={handleChange} /> <br />
        </div>

        <div className="UserModify-profile-input-group">
          <label htmlFor="UserModify-email">email :</label>
          <input id="UserModify-email" type="text" name="email" placeholder="" required 
          value={userData.email} onChange={handleChange}/> <br />
        </div>

        <div className="UserModify-action-group-button">
          <button onClick={handleUpdate}>수정</button>
          <button onClick={handleDelete}>탈퇴</button>
        </div>

        <div className="UserModify-action-to-home-page">
          <button onClick={()=>{
            goTo("/")
          }}>HOME 이동하기</button>
        </div>
      </section>
    </>
  );
}

export default UserModify;