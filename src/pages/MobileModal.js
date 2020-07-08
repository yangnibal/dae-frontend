import React from 'react'
import { Link } from 'react-router-dom'

const MobileModal = ({token, disableModal}) => {
    return(
        <div style={{zIndex: "99999999", position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
            <div style={{width: "80vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "#1f1f1f"}}>
                <div style={{width: "30vw", display: "flex", color: "#a6a6a6", alignItems: "center", height: "6rem"}}>
                    <i onClick={disableModal} className="fas fa-times" style={{color: "#a6a6a6", fontSize: "2.5rem", marginLeft: "20px"}}></i>
                </div>
                <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/inf">1급 정보</Link>
                <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/ac">성적 등급</Link>
                <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/inf/file">교재 출력</Link>
                <a onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} target="blank" href="https://blog.naver.com/dreamlearnforu">대외비 블로그</a>
                <a onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} target="blank" href="http://dreamrun.itforone.co.kr/bbs/login.php">[대외비 APP 학습 관리]</a>
                {token===null? <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/account/login">로그인</Link> :
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/account/login">로그아웃</Link>
                    <Link onClick={disableModal} style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.5rem", fontWeight: "600", margin: "1.5rem 1.5rem"}} to="/account/edit">내정보 수정</Link>
                </div> }
            </div>
            <div onClick={disableModal} style={{width: "20vw", height: "100vh", opacity: "0.6", backgroundColor: "#404040"}}></div>
        </div>
    )
}

export default MobileModal