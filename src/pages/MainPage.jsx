import {useEffect, useRef, useState} from "react";
import "./MainPage.css";
import main_img from "../images/main_img.png";
import Brains from "../images/Brains.png";
import main_icon01 from "../images/main_icon01.png";
import main_icon02 from "../images/main_icon02.png";
import main_icon03 from "../images/main_icon03.png";
import type01bg from "../images/type01bg.png";
import useNavi from "../hooks/useNavi";

function MainPage() {
    const sectionRefs = useRef([]);
    const [visibleSections, setVisibleSections] = useState([]);

    // ✅ 텍스트 애니메이션을 위한 새로운 ref와 상태를 추가합니다.
    const textRef = useRef(null);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const {goHome, goTo} = useNavi();

    useEffect(() => {
      // 텍스트 ref의 가시성만 확인하는 로직
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
        setIsTextVisible(isVisible);
      }

      // 나머지 섹션들의 스크롤 애니메이션 로직은 그대로 유지
      const newVisibleSections = [];
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
          if (isVisible) {
            newVisibleSections.push(index);
          }
        }
      });
      setVisibleSections(newVisibleSections);

      const handleScroll = () => {
        // 텍스트 ref의 가시성만 확인하는 로직
        if (textRef.current) {
          const rect = textRef.current.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
          setIsTextVisible(isVisible);
        }

        // 나머지 섹션들의 스크롤 애니메이션 로직은 그대로 유지
        const newVisibleSections = [];
        sectionRefs.current.forEach((section, index) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
            if (isVisible) {
              newVisibleSections.push(index);
            }
          }
        });
        setVisibleSections(newVisibleSections);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <>
      <div id="main_wrap">
        <main>
          <section className="main_contents" style={{backgroundImage: `url(${main_img})`}}>
            <h1 ref={textRef} className={isTextVisible ? "visible" : ""}>
              당신의 게임을 찾아보세요
            </h1>
            <p className={`subtitle ${isTextVisible ? "visible" : ""}`}>
              간단한 '성향 테스트' 를 통해 당신에게 <br /> 완벽하게 맞는 게임을 추천해드립니다
            </p>
            <div className="main_box_content">
              <div className="main_box">
                <h2>12</h2> <p>개의질문</p>
              </div>
              <div className="main_box">
                <h2>5</h2> <p>가지의 게이머 유형</p>
              </div>
            </div>
            <button className="test_start" onClick={()=>{
              goTo('/survey')
            }}>
              <img src="../src/images/Brains.png"/>
              <p>게임성향 테스트시작</p>
            </button>
          </section>
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            className={`main_text ${visibleSections.includes(0) ? "visible" : ""}`}
          >
            <div className="main_text_box">
              <div className="text_box_img">
                <img src="../src/images/main_icon01.png"/>
                <h3>정확한 분석</h3>
                <p>7개의 과학적으로 설계된 질문으로 당신의 게임 성향을 정확하게 분석합니다.</p>
              </div>
            </div>
            <div className="main_text_box">
              <div className="text_box_img">
                <img src="../src/images/main_icon02.png"/>
                <h3>맞춤 추천</h3>
                <p>6가지 게이머 유형 중 당신에게 맞는 유형을 찾아 최적의 게임을 추천합니다.</p>
              </div>
            </div>
            <div className="main_text_box">
              <div className="text_box_img">
                <img src="../src/images/main_icon03.png"/>
                <h3>결과 공유</h3>
                <p>친구들과 테스트 결과를 공유하고 함께 게임을 즐겨보세요.</p>
              </div>
            </div>
          </section>
          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            className={`main_type ${visibleSections.includes(1) ? "visible" : ""}`}
          >
            <div  className="type_title_box">
              <h2>어떤 게이머 유형이 있을까요?</h2>
              <p>다양한 게이머 유형을 미리 확인해 보세요.</p>
            </div>
            <div className="type_box_list">
              <ul>
                <li className="type_box box01">
                  <h3>RPG 마니아</h3>
                  <p>깊이 있는 스토리와 캐릭터 성장을 즐김</p>
                </li>
                <li className="type_box box02">
                  <h3>RPG 마니아</h3>
                  <p>깊이 있는 스토리와 캐릭터 성장을 즐김</p>
                </li>
                <li className="type_box box03">
                  <h3>RPG 마니아</h3>
                  <p>깊이 있는 스토리와 캐릭터 성장을 즐김</p>
                </li>
                <li className="type_box box04">
                  <h3>RPG 마니아</h3>
                  <p>깊이 있는 스토리와 캐릭터 성장을 즐김</p>
                </li>
                <li className="type_box box05">
                  <h3>RPG 마니아</h3>
                  <p>깊이 있는 스토리와 캐릭터 성장을 즐김</p>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default MainPage;
