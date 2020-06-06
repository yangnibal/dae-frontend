import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import './Grademanage.scss'

class Grademanage extends React.Component{
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