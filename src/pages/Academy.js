import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import './Academy.scss'
import axios from 'axios'

class Academy extends React.Component{

    componentDidMount(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
	localStorage.removeItem("test_id")
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("https://api.daeoebi.com/users/caniuse/", ({
            type: 2
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
            <div className="academy-container">
                <Header/>
                <div className="academy-content-container">
                    <Link className="academy-content-test" to="/ac/test">TEST 기준<br/>목록 보기</Link>
                    <Link className="academy-content-student" to="/ac/student">학생 기준<br/>목록 보기</Link>
                </div>
            </div>
        )
    }
}

export default Academy
