import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Bg from '../images/index.png'
import { Link } from 'react-router-dom'
import './Home.scss'
import axios from 'axios'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx' 

@inject('store')
@observer
class Home extends React.Component{

    @action goAdmin = () => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
	localStorage.removeItem("test_id")
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.get("https://api.daeoebi.com/users/issuperuser/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            if(res.data==="superuser"){
                window.location.href = "https://admin.daeoebi.com"
            } else {
                alert("권한이 없습니다.")
            }
        })
        .err(res => {
            alert("권한이 없습니다.")
        })
    }

    componentDidMount(){
        localStorage.setItem("checkedstudent", "")
    }
    render(){
        return(
            <Layout>
                <Header/>
                <div className="home-content-container">
                    <Link to="/inf" className="home-content">[ 대외비 <span>&nbsp;1급 정보&nbsp;</span> 자료 제공 ] 프로그램</Link>
                    <Link to="/ac" className="home-content">[ 대외비 <span>&nbsp;성적 등급&nbsp;</span> 관리 ] 프로그램</Link>
                    <Link to="/inf/file" className="home-content">[ 대외비 <span>&nbsp;교재 출력&nbsp;</span> 관리 ] 프로그램</Link>
                </div>
                <div className="background-container">
                    <img src={Bg} alt={Bg} className="home-background"/>    
                </div>
                <div onClick={() => this.goAdmin()} className="admin-btn">admin</div>
            </Layout>
        )
    }
}

export default Home
