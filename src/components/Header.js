import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from '../images/logo2.png'

const Header = () => {
    const ltoken = localStorage.getItem('token')
    const stoken = sessionStorage.getItem('token')
    var token = ""
    if(ltoken===null){
        token = stoken
    } else {
        token = ltoken
    }
    return (
        <div className="header-container">
            <Link to="/">
                <img src={Logo} alt={Logo} width="190px" height="40px" className="header-logo"/>
            </Link>
            <div className="link-dae-home">대외비 홈페이지 바로가기</div>
            <a href="http://dreamrun.itforone.co.kr/bbs/login.php" className="link-dae-app">[대외비 APP 학습 관리] 프로그램 바로가기</a>
            {token===null? <Link className="link-login" to="/account/login">로그인</Link> :
            <span className="span"><Link className="link-login" to="/account/login">로그아웃</Link>&nbsp;/&nbsp;<Link className="link-login" to="/account/edit">내정보 수정</Link></span> }
        </div>
    )
}
//logo 비율=23:5
export default Header