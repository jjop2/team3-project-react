import "./MyPage.css";

function MyPage() {
  return (
    <>
      <section className="mypage-profile-container">
        <h1 className="mypage-profile-title">👨‍👦 마이페이지</h1>

        <div className="mypage-profile-input-group">
          <label htmlFor="mypage-username">아이디 :</label>
          <input id="mypage-username" type="text" name="username" placeholder="" required /> <br />
        </div>

        <div className="mypage-profile-input-group">
          <label htmlFor="mypage-password">비밀번호 :</label>
          <input id="mypage-password" type="text" name="password" placeholder="" required /> <br />
        </div>

        <div className="mypage-profile-input-group">
          <label htmlFor="mypage-email">email :</label>
          <input id="mypage-email" type="text" name="email" placeholder="" required /> <br />
        </div>

        <div className="mypage-action-group-button">
          <button>수정</button>
          <button>탈퇴</button>
        </div>

        <div className="mypage-action-to-home-page">
          <button>HOME 이동하기</button>
        </div>
      </section>
    </>
  );
}

export default MyPage;