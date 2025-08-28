import { useState } from "react"
import '../Login/Login.css';
import '../Login/Buttongroup.css';
import useNavi from "../../hooks/useNavi";
import axios from "axios";



const Signup = () => {
  const {goHome, goTo} = useNavi();
  const [member, setMember] = useState({
    username : '',
    password : '',
    email : ''
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
    axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, member)
      .then(response=>{
        alert(response.data);

        goTo('/');
      }).catch(error=>{
        console.log('Axios Error',error);
        alert('회원가입 실패')
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
    비밀번호 : 
    <input id="password" type="text" name="password" onChange={onChangeHandler} placeholder='비밀번호를 입력해주세요. ' required/> <br />
    </div>

    <div className="input-group">
    이메일 : 
    <input input="email" type="text" name="email" onChange={onChangeHandler} placeholder='이메일을 입력해 주세요 ' required /> <br />
    </div>

    <div className="button-signup">
    <button onClick={handleSignup}>회원 가입 </button>
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