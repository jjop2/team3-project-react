import { useState } from 'react';
import './login.css'
import './Buttongroup.css';

import useNavi from '../../hooks/useNavi';



const Login = () => {
  const { goHome, goTo} = useNavi();
  
  const [member, setMember] = useState({
   'username' : '',
   'password' : ''
  });

  const onChangeHanlder = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    if (!member.username || !member.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.')
      return;
    }
    
    console.log('로그인 시도', member)
    // 백엔드 연동 
  }

return (

<>
<section className="login-form-container">
<h1 className="form-title"> 👨‍👦 로그인 페이지 </h1>

<div className="input-group">
<label htmlFor='username'>아이디 : </label>
<input id='username' type='text' name='username' onChange={onChangeHanlder} placeholder='아이디를 입력하세요.' required/> <br />
</div>

<div className="input-group">
<label htmlFor='password'>비밀번호 : </label>
<input id="password" type='text' name='password'  onChange={onChangeHanlder} placeholder='비밀번호를 입력하세요' required/> <br />
</div>

<div className='group-button'>
<button onClick={handleLogin}>로그인</button>
</div>

 <section className="social-login-group">
    <button className="social-button kakao-button">
       <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
          alt="Kakao icon"
          className="social-icon"
        />
      <span>카카오 로그인</span>
    </button>
    
    <button className="social-button google-button">
        <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google icon"
            className="social-icon"
        />
      <span>Google 로그인</span>
    </button>
    </section>

<div className='to-Signup-page'>
  <button onClick={() => {
    goTo('/signup')
  }}>회원가입 창으로 이동하기</button>
</div>

</section>
</>
)


} 

export default Login;
