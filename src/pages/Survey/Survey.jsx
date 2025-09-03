import Question from "../../components/Question";
import useAuthCheck from "../../hooks/useAuthCheck";
import './Survey.css'
const Survey = ({userInfo, isLoading, setTopTwoGenres, setSurveyResultInfo}) =>{
  useAuthCheck(userInfo, isLoading);

  return(
    <div className="Survey-container">
      <Question setTopTwoGenres={setTopTwoGenres} setSurveyResultInfo={setSurveyResultInfo}/>
    </div>
  )
}

export default Survey;