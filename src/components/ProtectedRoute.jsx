import { Navigate } from "react-router-dom";


function ProtectedRoute({auth, children}){
    if(!auth){
        alert('로그인 후 이용 해 주세요!');
        return<Navigate to="/login" replace/>; //사용자가 인증되지 않은 경우('/login')
    }
    return children;
}

export default ProtectedRoute;