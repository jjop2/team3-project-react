import Question from "../../components/Question";
import './Survey.css'
const Survey = ({setTopTwoGenres, setSurveyResultInfo}) =>{

  return(
    <div className="Survey-container">
      <Question setTopTwoGenres={setTopTwoGenres} setSurveyResultInfo={setSurveyResultInfo}/>
    </div>
  )
}

export default Survey;