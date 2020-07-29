import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'

@inject('store')
class MobileModal extends React.Component{
    render(){
        const { store } = this.props
        return(
            <div style={{zIndex: "99999999", position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                <div style={{overflow: "visible", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "#080808"}}>
                    <div onClick={() => this.props.history.goBack()} style={{textDecoration: "none", width: "30vw", display: "flex", color: "#a6a6a6", alignItems: "center", height: "1.5rem", marginTop: "1rem"}}>
                        <i className="fas fa-times" style={{color: "#a6a6a6", fontSize: "1.5rem", marginLeft: "20px"}}></i>
                    </div>
                    <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 1.8rem", marginTop: "2rem", width: "calc(100% - 3.6rem)", borderTop: "1px solid #a6a6a6", paddingTop: "2rem"}} to="/inf">1급 정보</Link>
                    <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "calc(100% - 3.6rem)"}} to="/ac">성적 등급</Link>
                    <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "calc(100% - 3.6rem)"}} to="/printfile">교재 출력</Link>
                    <a style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "calc(100% - 3.6rem)"}} target="blank" href="https://blog.naver.com/dreamlearnforu">대외비 블로그</a>
                    <a style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "calc(100% - 3.6rem)"}} target="blank" href="http://dreamrun.itforone.co.kr/bbs/login.php">[대외비 APP 학습 관리]</a>
                    {store.getToken()===null? <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "calc(100% - 3.6rem)"}} to="/account/login">로그인</Link> :
                    <div style={{display: "flex", flexDirection: "column", width: "calc(100% - 3.6rem)"}}>
                        <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "100%"}} to="/account/login">로그아웃</Link>
                        <Link style={{textDecoration: "none", color: "#a6a6a6", fontSize: "1.2rem", fontWeight: "500", padding: "1rem 0", borderTop: "1px solid #a6a6a6", margin: "0 1.8rem", width: "100%"}} to="/account/edit">내정보 수정</Link>
                    </div> }
                </div>
            </div>
        )
    }
}

export default MobileModal