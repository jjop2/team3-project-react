import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../axiosInstance";
import useNavi from "../../hooks/useNavi";

function Google( {setAuth} ) {
  const {goHome} = useNavi();

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
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default Google;