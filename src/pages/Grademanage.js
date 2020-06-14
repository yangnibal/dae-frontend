import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './Grademanage.scss'
import axios from 'axios'

class Grademanage extends React.Component{

    componentDidMount(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
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
            <div className="grademanage-container">
                <Header/>
                <div className="grademanage-content-container">
                    <Link className="grademanage-content-academy" to="/ac">학원 회원</Link>
                    <Link className="grademanage-content-individual" to="/ac">개인 회원</Link>
                </div>
            </div>
        )
    }
}

export default Grademanage