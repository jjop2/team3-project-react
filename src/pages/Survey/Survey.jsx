import Question from "../../components/Question";
import './Survey.css'
const Survey = ({setTopTwoGenres}) =>{

  return(
    <div className="Survey-container">
      <Question setTopTwoGenres={setTopTwoGenres}/>
    </div>
  )
}

export default Survey;