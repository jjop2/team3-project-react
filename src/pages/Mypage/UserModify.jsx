import { useEffect, useState } from "react";
import useNavi from "../../hooks/useNavi";
import "./UserModify.css";
import axiosInstance from "../../axiosInstance";
import './UserModify.css'
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
    // 소셜 로그인 시 nickname만 허용, 나머지 차단
    
    // if (userInfo?.oauth && name !== "nickname") {
    //     return; // username, password, email 수정 차단
    // }
    setUserData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
  };
    
 
  
  const handleUpdate = () => {
    const vaildateForm = (data)=>{
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/;
      const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{10,20}$/;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

      

      if(!data.nickname||!nicknameRegex.test(data.nickname)){
        alert("닉네임은 2~20자 이내의 한글, 영대문자, 숫자만 가능합니다");
        return false;
      }
      if(!passwordRegex.test(data.password)){
        alert("비밀번호는 10~20자 이내여야하며, 특수문자를 포함해야 합니다")
        return false;
      }
      if(!data.email||!emailRegex.test(data.email)){
        alert("유효하지 않은 이메일 주소입니다");
        return false;
      }
      return true;
    };
    if(!vaildateForm(userData)){
      return;
    }

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
      }));
      axiosInstance.get('/userinfo')
      .then(infoReponse=>{
        setUserInfo(infoReponse.data); // app.jsx에서 관리되는 userinfo업데이트
      });
    })
    .catch((error)=>{
      console.log("Axios Error",error);
      alert("수정실패");
    });
  };
  

  
  const handleDelete = () => {
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
        {userInfo.oauth == 'BOARD'?
        <div className="UserModify-profile-input-group">
          <label htmlFor="UserModify-password">비밀번호 :</label>
          <input id="UserModify-password" type="password" name="password" placeholder="" required 
           onChange={handleChange}/> <br />
        </div>
        :
        null  
        }

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