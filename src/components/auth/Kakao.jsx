import KakaoLogin from "react-kakao-login";
import useNavi from "../../hooks/useNavi";
import axiosInstance from "../../axiosInstance";

function Kakao( {setAuth} ) {
  const {goHome} = useNavi();

  /*
    카카오 로그인 실행 코드 (라이브러리 사용)
    카카오에서 보내는 유저 식별 id, nickname, email 사용

    == 요청 바디 ==
    username : 'kakao_카카오유저id' 형식으로 지정함
    nickname : 기존 카카오 닉네임
    email : 카카오 계정 이메일

    백엔드에서 User 객체로 받게 됩니다
    *OauthLoginController, OauthLoginService 참고
  */

  const responseKakao = (response) => {
    
    axiosInstance.post('/login/kakao', {
      username : "kakao_" + response.profile.id,
      nickname : response.profile.properties.nickname,
      email : response.profile.kakao_account.email
    }).then(response => {
      const jwt = response.headers.authorization;

      if(jwt != null) {
        sessionStorage.setItem('jwt', jwt);
        setAuth(true);
        alert('로그인 되었습니다');
        goHome();
      }
    }).catch(error => console.error(error))
  }
  

  return (
    <>
      <KakaoLogin
        token={import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}
        onSuccess={responseKakao}
        onFail={() => console.log("카카오 로그인 실패")}
        style={{
          width: '280px',
          height: '40px',
          border: 'none'
        }}
      >
        <div className="social-button kakao-button">
          <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
              alt="Kakao icon"
              className="social-icon"
            />
          <span>카카오 계정으로 로그인</span>
        </div>
      </KakaoLogin>
    </>
  )
}

export default Kakao;