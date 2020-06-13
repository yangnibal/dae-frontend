import React from 'react'
import './StudentTest.scss'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import axios from 'axios'
import DropDown from '../components/DropDown'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import StudentTestContent from '../components/StudentTestContent'

@inject('store')
@observer
class StudentTest extends React.Component{

    @observable name = ""
    @observable scores = []
    @observable semester = ""
    @observable subject = ""
    @observable schoolyear = ""
    @observable group = ""

    @action schoolyearValueChange = (e) => {
        this.schoolyear = e.value
    }
    @action semesterChange = (e) => {
        this.semester = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action Modify = (score_id) => {
        this.props.history.push(`/ac/score/${score_id}/update`)
    }
    @action Remove = (score_id, test_id) => {
        const { store } = this.props
        axios.delete("http://api.daeoebi.com/scores/" + score_id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            axios.post("http://api.daeoebi.com/tests/" + test_id + "/deletestd/", ({
                std_name: this.name
            }), {
                headers: {
                    Authorization: "Token " + store.getToken()
                }
            })
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                
            })
        })
        .catch(err => {
            
        })
    }
    @action findScore = (grade, test_type, subject) => {
        const id = localStorage.getItem("std_id")
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/scores/findscore/", ({
            grade: grade,
            test_type: test_type,
            subject: subject,
            id: id
        }), {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            const score = res.data['score']
            const test = res.data['test']
            for(var i in score){
                for(var j in test){
                    if(String(test[j]['id']) === score[i]['test']){
                        score[i].grade = test[j]['grade']
                        score[i].test_type = test[j]['test_type']
                        score[i].subject = test[j]['subject']
                        score[i].additional_info = test[j]['additional_info']
                    }
                }
            }
            this.scores = score
        })
        .catch(err => {
            
        })
    }
    @action movePrintPage = (name, grade, group, score, percent, rank, rating, school, schoolyear, test_type, cand_num, average, std_dev, subject, z, prob_dens, id) => {
        const { store } = this.props
        store.printProps = { 
            name: name, 
            grade: grade, 
            group: group, 
            test_type: test_type, 
            score: score, 
            rank: rank, 
            percent: percent, 
            rating: rating, 
            school: school, 
            subject: subject, 
            cand_num: cand_num, 
            average: average, 
            std_dev: std_dev, 
            schoolyear: schoolyear,
            z: z,
            prob_dens: prob_dens
        }
        var printProps = JSON.stringify(store.printProps)
        localStorage.setItem("printProps", printProps)
        this.props.history.push("/print")
    }

    componentDidMount(){
        this.name = localStorage.getItem("std_name")
        const id = localStorage.getItem("std_id")
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/users/caniuse/", ({
            type: 2
        }), {
            headers: {
                Authorization: "Token "+token
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                axios.get("http://api.daeoebi.com/students/" + id + "/", {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    this.schoolyear = res.data['grade']
                })
                .catch(err => {
                    
                })
                axios.post("http://api.daeoebi.com/groups/getstdgroup/", ({
                    name: this.name
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    this.group = res.data['name']
                })
                .catch(err => {
                    
                })
                axios.post("http://api.daeoebi.com/scores/getstdscore/", ({
                    id: id
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    const score = res.data['score']
                    const test = res.data['test']
                    for(var i in score){
                        for(var j in test){
                            if(String(test[j]['id']) === score[i]['test']){
                                score[i].grade = test[j]['grade']
                                score[i].test_type = test[j]['test_type']
                                score[i].subject = test[j]['subject']
                                score[i].additional_info = test[j]['additional_info']
                                score[i].grade = test[j]['grade']
                                score[i].cand_num = test[j]['cand_num']
                                score[i].average = test[j]['average']
                                score[i].std_dev = test[j]['std_dev']
                                score[i].test_id = test[j]['id']
                            }
                        }
                    }
                    this.scores = score
                })
                .catch(err => {
                    
                })
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        const { store } = this.props
        const scorelist = this.scores.map(score => (
            <StudentTestContent
                test_type={score.test_type}
                grade={score.grade}
                school={score.additional_info}
                subject={score.subject}
                score={score.score}
                percent={score.percent}
                rank={score.rank}
                rating={score.rating}
                gradeModify={() => this.Modify(score.id)}
                gradeRemove={() => this.Remove(score.id, score.test_id)}
                key={score.id}
                movePrintPage={() => this.movePrintPage(this.name, score.grade, this.group, score.score, score.percent, score.rank, score.rating, score.additional_info, this.schoolyear, score.test_type, score.cand_num, score.average, score.std_dev, score.subject, score.z, score.prob_dens, score.id)}
            />
        ))
        return(
            <div className="grade-container">
                <Header/>
                <div className="grade-content-container">
                    <div className="grade-content-header-container">
                        <div className="grade-content-header-left">
                            <div className="grade-content-title">{this.name} TEST 성적</div>
                            <DropDown placeholder="학년" option={store.schoolyear} className="grade-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearValueChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학기" option={store.semester} className="grade-content-dropdown-second" classNamePrefix="react-select" onChange={this.semesterChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="과목" option={store.subject} className="grade-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="grade-content-search-btn" onClick={() => this.findScore(this.schoolyear, this.semester, this.subject)}>검색</div>
                        </div>
                        <div className="grade-content-header-right">
                        </div>
                    </div>
                    <div className="grade-content-body-container">
                        <div className="grade-content-body-header">
                            <div className="grade-content-body-header-text">TEST 구분</div>
                            <div className="grade-content-body-header-text">내점수</div>
                            <div className="grade-content-body-header-text">백분율</div>
                            <div className="grade-content-body-header-text">예상 등수</div>
                            <div className="grade-content-body-header-text">등급</div>
                        </div>
                        <div className="grade-content-body">
                            {scorelist}
                            <div className="grade-content-footer">
                                <Link to="/ac/test" className="grade-footer">TEST 목록으로 이동</Link>
                                <Link to="/ac/student" className="grade-footer">학생 목록으로 이동</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentTest