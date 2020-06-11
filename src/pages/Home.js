import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Bg from '../images/index.png'
import { Link } from 'react-router-dom'
import './Home.scss'

class Home extends React.Component{
    componentDidMount(){
        localStorage.setItem("checkedstudent", "")
    }
    render(){
        return(
            <Layout>
                <Header/>
                <div className="home-content-container">
                    <Link to="/inf" className="home-content">[ 대외비 <span>&nbsp;1급 정보&nbsp;</span> 자료 제공 ] 프로그램</Link>
                    <Link to="/gm" className="home-content">[ 대외비 <span>&nbsp;성적 등급&nbsp;</span> 관리 ] 프로그램</Link>
                    <Link to="" onClick={() => alert("오픈 준비중인 기능입니다.")} className="home-content">[ 대외비 <span>&nbsp;교재 출력&nbsp;</span> 관리 ] 프로그램</Link>
                </div>
                <div className="background-container">
                    <img src={Bg} alt={Bg} className="home-background"/>    
                </div>
            </Layout>
        )
    }
}

export default Home