import { useEffect, useState } from "react";
import '../Login/Login.css';
import '../Login/Buttongroup.css';
import useNavi from "../../hooks/useNavi";
import axios from "axios";
import Kakao from "../../components/auth/Kakao";
import Google from "../../components/auth/Google";

const Signup = ({ setAuth, userInfo }) => {
  const { goHome, goTo } = useNavi();
  const [member, setMember] = useState({
    username: '',
    nickname: '',
    password: '',
    email: '',
  });

  // 소셜 로그인 시 userInfo로 초기화
  useEffect(() => {
   
    if (userInfo && userInfo.oauth) {
      setMember({
        username: userInfo.username || '',
        nickname: userInfo.nickname || '',
        password: '',
        email: userInfo.email || '',
      });
    }
  }, [userInfo]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    // 소셜 로그인 시 닉네임만 수정 가능
    if (userInfo?.oauth && name !== 'nickname') {
      return;
    }
    setMember({
      ...member,
      [name]: value,
    });
  };

   const validateForm = () => {
    const usernameRegex = /^[A-Za-z0-9]{4,20}$/;
    const nicknameRegex =/^[가-힣a-zA-Z0-9]{2,20}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{10,20}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    if (!member.username || !usernameRegex.test(member.username)) {
      alert("아이디는 4~20자 이내의 영대문자와 숫자만 가능합니다");
      return false;
    }
    if (!member.nickname || !nicknameRegex.test(member.nickname)) {
      alert("닉네임은 2~20자 이내의 한글, 영대문자, 숫자만 가능합니다");
      return false;
    }
    // 소셜 로그인 시 비밀번호 검사 제외
    if (!userInfo?.oauth && (!member.password || !passwordRegex.test(member.password))) {
      alert("비밀번호는 10~20자 이내여야 하며, 특수문자를 포함해야 합니다");
      return false;
    }
    if (!member.email || !emailRegex.test(member.email)) {
      alert("유효하지 않은 이메일 주소입니다");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
   
    if (!validateForm()) return;
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
        ...member,
        password: userInfo?.oauth ? null : member.password, // 소셜 로그인 시 password null로 전송
      })
      .then((response) => {
        alert(response.data);
        setAuth(true); // 회원가입 성공 시 auth 상태 업데이트
        goTo('/');
      })
      .catch((error) => {
        console.error('Axios Error:', error.response?.data || error.message);
        alert('회원가입 실패: ' + (error.response?.data || '오류 발생'));
      });
  };

  return (
    <>
      <section className="signup-form-container">
        <h1 className="form-title"> 👨‍👨‍👧 회원 가입 페이지</h1>

        <div className="input-group">
          아이디 :
          <input
            id="username"
            type="text"
            name="username"
            onChange={onChangeHandler}
            placeholder="아이디를 입력해주세요."
            value={member.username} // 상태와 동기화
            readOnly={!!userInfo?.oauth} // 소셜 로그인 시 읽기 전용
            required
          />{' '}
          <br />
        </div>

        <div className="input-group">
          닉네임 :
          <input
            id="nickname"
            type="text"
            name="nickname"
            onChange={onChangeHandler}
            placeholder="닉네임을 입력해주세요."
            value={member.nickname} // 상태와 동기화
            required
          />{' '}
          <br />
        </div>

        <div className="input-group">
          비밀번호 :
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChangeHandler}
            placeholder="비밀번호를 입력해주세요."
            value={member.password} // 상태와 동기화
            readOnly={!!userInfo?.oauth} // 소셜 로그인 시 읽기 전용
            required={!userInfo?.oauth} // 일반 로그인 시 필수
          />{' '}
          <br />
        </div>

        <div className="input-group">
          이메일 :
          <input
            id="email"
            type="email"
            name="email"
            onChange={onChangeHandler}
            placeholder="이메일을 입력해 주세요"
            value={member.email} // 상태와 동기화
            readOnly={!!userInfo?.oauth} // 소셜 로그인 시 읽기 전용
            required
          />{' '}
          <br />
        </div>

        <div className="button-signup">
          <button onClick={handleSignup}>회원 가입</button>
        </div>

        <div className="social-box">
          <div>
            <Kakao setAuth={setAuth} />
          </div>
          <div>
            <Google setAuth={setAuth} />
          </div>
        </div>

        <div className="to-login-page">
          <button
            onClick={() => {
              goTo('/login');
            }}
          >
            로그인 창으로 이동하기
          </button>
        </div>
      </section>
    </>
  );
};

export default Signup;