import useNavi from '../hooks/useNavi';
import './Footer.css'

const Footer = () => {
  const { goTo } = useNavi();

  return (
    <div className="footer">
      <div className="footerMenu">
        <p onClick={() => goTo('/privacy')}>개인정보처리방침</p>
        <p onClick={() => goTo('/term')}>이용약관</p>
      </div>
      <div className="copyright">
        <p>© 2025 GameHub. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;