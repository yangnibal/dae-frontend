import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import './Grademanage.scss'
import axios from 'axios'

class Inf extends React.Component{

    componentDidMount(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/users/caniuse/", ({
            type: 1
        }), {
            headers: {
                Authorization: "Token "+token
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        return(
            <div className="grademanage-container">
                <Header/>
                <div className="grademanage-content-container">
                    <Link className="inf-content" to="/inf/vid">동영상 자료</Link>
                    <Link className="inf-content" to="/inf/mat">인터넷 검색 자료</Link>
                    <Link className="inf-content" to="/">파일 출력 가능 자료</Link>
                </div>
            </div>
        )
    }
}

export default Inf