import Question from "../../components/Question";
import './Survey.css'
const Survey = ({setTopTwoGenres, selectGenre}) =>{

  return(
    <div className="Survey-container">
      <Question setTopTwoGenres={setTopTwoGenres} selectGenre={selectGenre}/>
    </div>
  )
}

export default Survey;