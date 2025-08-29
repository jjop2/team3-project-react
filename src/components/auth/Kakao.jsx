import KakaoLogin from "react-kakao-login";
import useNavi from "../../hooks/useNavi";
import axiosInstance from "../../axiosInstance";

function Kakao( {setAuth} ) {
  const {goHome} = useNavi();

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
      />
    </>
  )
}

export default Kakao;