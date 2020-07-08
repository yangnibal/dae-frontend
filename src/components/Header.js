import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import Logo from '../images/logo2.png'
import MobileModal from '../pages/MobileModal'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Header extends React.Component{
    render(){
        const { store } = this.props
        return (
            <div className="header-container">
                {store.isModalOn===false ? null : <MobileModal token={store.getToken()} disableModal={() => store.handleModal()}/>}
                <div onClick={() => store.handleModal()} className="mobile-btn-container">
                    <i className="fas fa-bars mobile-btn"></i>
                </div>
                <Link to="/" className="logo-container">
                    <img src={Logo} alt={Logo} width="190px" height="40px" className="header-logo"/>
                </Link>
                <div className="header-data">
                    <Link to="/inf" className="header-data-content">1급 정보</Link>
                    <Link to="/ac" className="header-data-content">성적 등급</Link>
                    <Link to="/inf/file" className="header-data-content">교재 출력</Link>
                </div>
                <a target="blank" href="https://blog.naver.com/dreamlearnforu" className="link-dae-home">대외비 블로그<br/>바로가기</a>
                <a target="blank" href="http://dreamrun.itforone.co.kr/bbs/login.php" className="link-dae-app">[대외비 APP 학습 관리]<br/>프로그램 바로가기</a>
                {store.getToken()===null? <Link className="link-login" to="/account/login">로그인</Link> :
                <span className="span"><Link className="link-login" to="/account/login">로그아웃</Link>&nbsp;/&nbsp;<Link className="link-login" to="/account/edit">내정보 수정</Link></span> }
                <div className="goBack" onClick={() => window.history.back()}>뒤로가기</div>
            </div>
        )
    }
    
}
//logo 비율=23:5
export default Header