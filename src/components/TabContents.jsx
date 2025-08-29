import axios from "axios";

const TabContents = ({tabNumber}) => {
  return(
    <>
    {
      [
        <div>
          <h2>나의 선호 장르</h2>
          <p>
            {axios.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
            .then(response =>{
              console.log(response.data)
            }).catch(error =>{
              console.error(error);
            })
            }
          </p>
        </div>,
        <div>
          <h2>나의 찜 목록</h2>
        </div>
      ][tabNumber]
    }
    </>
  )
}

export default TabContents;