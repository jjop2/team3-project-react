import { useState } from 'react';
import './login.css'
import './Buttongroup.css';

import useNavi from '../../hooks/useNavi';
import axiosInstance from '../../axiosInstance';
import Kakao from '../../components/auth/KaKao';
import Google from '../../components/auth/Google';

const Login = ( {setAuth} ) => {
  const { goHome, goTo} = useNavi();
  
  const [user, setUser] = useState({
   'username' : '',
   'password' : ''
  });

  const [errorMsg, setErrorMsg] = useState();

  const onChangeHanlder = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    if (!user.username || !user.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.')
      return;
    }
    
    axiosInstance.post('/login', user)
      .then(response => {
        const jwt = response.headers.authorization;

        if(jwt != null) {
          sessionStorage.setItem('jwt', jwt);
          setAuth(true);
          alert('로그인 되었습니다');
          goHome();
        }
      }).catch(error => {
        /* 
          로그인 인증 실패 시 401이 status에 담겨서 반환됨
          로그인 인증이 필요한 경우 아래 참고
          
          기본 멘트 : "인증이 필요합니다" (.response.data.message)
          (.response.data : json 형식 반환시켰으므로 확인 바람)
          스프링 security패키지 - AuthEntryPoint 참고
        */
        if(error.response && error.response.status == 401) {
          setErrorMsg("아이디가 존재하지 않거나 비밀번호가 틀렸습니다");
        } else {
          console.error(error);
        }

      })

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
  {errorMsg && <p className='loginError'>{errorMsg}</p>}
  <button onClick={handleLogin}>로그인</button>
</div>

 <section className="social-login-group">
    <div>
      <Kakao setAuth={setAuth} />
    </div>
    
    <div>
      <Google setAuth={setAuth} />
    </div>
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
