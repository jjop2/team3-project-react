import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosInstance";
import useNavi from "../../hooks/useNavi";

function Google( {setAuth} ) {
  const {goHome} = useNavi();

  /*
    구글 로그인 실행 코드 (라이브러리 사용)
    구글에서 보내는 유저 식별 id, nickname, email 사용

    == 요청 바디 ==
    username : 'google_구글유저id' 형식으로 지정함
    nickname : 기존 구글 닉네임
    email : 구글 계정 이메일

    백엔드에서 User 객체로 받게 됩니다
    *OauthLoginController, OauthLoginService 참고
  */

  const responseGoogle = (response) => {
    const decode = jwtDecode(response.credential)

    axiosInstance.post('login/google', {
      username : "google_" + decode.sub,
      nickname : decode.name,
      email : decode.email
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
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_KEY}>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => console.error('구글 로그인 실패')}
          text="signin_with"
          width={'280px'}
          logo_alignment="center"
        >
        </GoogleLogin>
      </GoogleOAuthProvider>
    </>
  )
}

export default Google;