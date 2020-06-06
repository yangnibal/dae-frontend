import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import './Academy.scss'

class Academy extends React.Component{
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