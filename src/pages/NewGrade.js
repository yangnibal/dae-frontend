import React from 'react'
import './NewGrade.scss'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

class NewGrade extends React.Component{
    render(){
        return(
            <div className="newgrade-container">
                <Header/>
                <div className="newgrade-content-container">
                    <div className="newgrade-content-title">성적 등록</div>
                    <input className="newgrade-content-input" placeholder="학생 선택"/>
                    <input className="newgrade-content-input" placeholder="학년 선택"/>
                    <input className="newgrade-content-input" placeholder="그룹 선택"/>
                    <div className="newgrade-content-group-add-container">
                        <Link to="/ac/group/new" className="newgrade-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newgrade-content-btn-container">
                        <div className="newgrade-content-btn">등록</div>
                        <div className="newgrade-content-btn">성적 추가 등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewGrade