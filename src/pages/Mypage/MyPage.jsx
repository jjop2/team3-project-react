import "./MyPage.css";

function MyPage(){
    return(
        <>
        <section className="login-form-container">
<h1 className="form-title"> 👨‍👦 마이페이지 </h1>

<div className="input-group">
<label htmlFor='username'>아이디 : </label>
<input id='username' type='text' name='username'placeholder='' required/> <br />
</div>

<div className="input-group">
<label htmlFor='password'>비밀번호 : </label>
<input id="password" type='text' name='password' placeholder='' required/> <br />
</div>

<div className="input-group">
<label htmlFor='password'>email : </label>
<input id="password" type='text' name='password' placeholder='' required/> <br />
</div>

<div className='group-button'>
<button>수정</button>

<button>탈퇴</button>
</div>



<div className='to-Signup-page'>
  <button>HOME 이동하기</button>
</div>

</section>
        </>
    )
}

export default MyPage;