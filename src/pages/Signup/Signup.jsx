import { useState } from "react"
import '../Login/Login.css';
import '../Login/Buttongroup.css';
import useNavi from "../../hooks/useNavi";
import axios from "axios";



const Signup = () => {
  const {goHome, goTo} = useNavi();
  const [member, setMember] = useState({
    username : '',
    nickname:'',
    password : '',
    email : '',
  });

  const onChangeHandler = (e) => {
    setMember({
    ...member,
    [e.target.name] : e.target.value
  })
  }

  const handleSignup = () => {
    if (!member.username || !member.password || !member.email) {
      alert('모든 항목을 입력해 주세요')
      return;
      }
      
      console.log("Signup Request:", member); // 요청
    axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, member)
      .then(response=>{
        alert(response.data);

        goTo('/');
      }).catch(error=>{
       console.error('Axios Error:', error.response?.data || error.message);
            alert('회원가입 실패: ' + (error.response?.data || '오류 발생'));
      })

  }
  
  return (
  <>
    <section className="signup-form-container">

    <h1 className="form-title"> 👨‍👨‍👧 회원 가입 페이지</h1>

    <div className="input-group">
    아이디 : 
    <input id="username"type="text" name="username" onChange={onChangeHandler} placeholder='아이디를 입력해주세요. ' required/> <br />
    </div>

    <div className="input-group">
    닉네임 : 
    <input id="nickname"type="text" name="nickname" onChange={onChangeHandler} placeholder='닉네임을 입력해주세요. ' required/> <br />
    </div>

    <div className="input-group">
    비밀번호 : 
    <input id="password" type="password" name="password" onChange={onChangeHandler} placeholder='비밀번호를 입력해주세요. ' required/> <br />
    </div>

    <div className="input-group">
    이메일 : 
    <input id="email" type="email" name="email" onChange={onChangeHandler} placeholder='이메일을 입력해 주세요 ' required /> <br />
    </div>

    <div className="button-signup">
    <button onClick={handleSignup}>회원 가입 </button>
    </div>

         <div className="special-login">
             <button className="social-button kakao-button">
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                alt="Kakao icon"
                className="social-icon"
                    />
                    <span>카카오 회원가입</span>
                  </button>
      
               <button className="social-button google-button">
                <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google icon"
              className="social-icon"
          />
            <span>Google 회원가입</span>
              </button>
        </div>

        <div className="to-login-page"> 
        <button onClick={ () => {
          goTo('/login')
        }}>로그인 창으로 이동하기</button>
      </div>
    
    </section>


  </>

  )
  }

  export default Signup;