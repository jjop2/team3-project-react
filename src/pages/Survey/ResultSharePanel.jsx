import resultImages, { localImages } from "./resultImages";
import kakaoIcon from "../../images/kakao.png";
import linkIcon from "../../images/link.png";
import downloadIcon from "../../images/download.png";
import './ResultSharePanel.css';

const ResultSharePanel = ({ title, description, imageUrl, startUrl, resultImages}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  // 브라우저 아닌 환경에서 실행될 때 오류가 안 나도록 안전장치

    const handleSave = async () => {
      try {
        const imgUrl = localImages[title];  
        if (!imgUrl) {
          console.error("이미지 URL을 찾을 수 없습니다:", title);
          return;
        }
        // 1. fetch + blob 으로 파일을 객체화 
        const response = await fetch(imgUrl);
        const blob = await response.blob();

        // 2. 브라우저에서 다운로드 가능한 임시 주소 생성
        const url = window.URL.createObjectURL(blob);
         
        // 3. 다운로드 링크 생성 
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.png`;  // 저장될 파일명
        
        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        // 임시주소 정리
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url)

      } catch (error) {
        console.error("이미지 저장 실패", error);
        alert("이미지를 저장할 수 없습니다. 다시 시도해주세요.")
      }
  };


  const shareKakao = () => {
    const { Kakao } = window;
    
    // 윈도우에서 카카오꺼냄 

    if (!Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다."); 
      return;
    }

    if (!Kakao.isInitialized()) {
      Kakao.init("bc31d5ade5815eebe178ac47e3068b29"); // 카카오 키 넣기 // 
    }
    console.log("title :" , title);
    console.log("description:", description);
    console.log("imgUrl", imageUrl);

    Kakao.Share.sendDefault({  // 카카오 공유하기 기본 틀 (feed도 기본 카드 틀)
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트 해보기",
          link: {
            mobileWebUrl: startUrl,
            webUrl: startUrl,
          },
        },
      ],
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl); //최신 : 브라우저에서 활용할 수 있는 기능 => 자체가 함수
      alert("링크가 클립보드에 복사되었습니다!")
    } catch {
      const input = document.createElement("input");  // 옛날 방식 : 강제로 input 만들어서 복사함 (몰래)
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");  // 복사하고
      input.remove();                // 지움
      alert("링크가 클립보드에 복사되었습니다!")
    }
  }

   return (
    <div className="share-buttons-group">
      <button className="share-btn kakao" onClick={shareKakao}>
        <img src={kakaoIcon} alt="kakao" className="btn-icon"/> 카카오톡 공유 </button>
      <button className="share-btn link" onClick={copyLink}>
        <img src={linkIcon} alt="링크 복사"className="btn-icon" />링크 복사 </button>
      <button className="share-btn download" onClick={handleSave}>
        <img src={downloadIcon} alt="이미지 저장" className="btn-icon"/>이미지 저장하기 </button>
    </div>
  );
};

export default ResultSharePanel;