import React from 'react'
import './Grade.scss'
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import DropDown from '../components/DropDown'
import { observer, inject } from 'mobx-react'
import { observable, action, toJS } from 'mobx'
import axios from 'axios'
import GradeContent from '../components/GradeContent'

@inject('store')
@observer
class GradeList extends React.Component{

    @observable schoolyear = ""
    @observable group = ""
    @observable score = []
    @observable std = []
    @observable testinfo = {}
    @observable grades = []

    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action gettest = (token, test_id) => {
        var id = localStorage.getItem("test_id")
        if(id===null) id = test_id
        axios.get("https://api.daeoebi.com/tests/" + id + "/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.testinfo = res.data
        })
        .catch(err => {
            
        })
    }
    @action getscore = (token, id) => {
        var test_id = localStorage.getItem("test_id")
        if(test_id===null) test_id = id
        axios.post("https://api.daeoebi.com/scores/gettestscore/", ({
            test_id: test_id
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.score = res.data
            this.joinArr(token, id)
        })
        .catch(err => {
            
        })
    }
    @action joinArr = (token, id) => {
        var test_id = localStorage.getItem("test_id")
        if(test_id===null) test_id = id
        axios.post("https://api.daeoebi.com/students/getteststd/", ({
            test_id: test_id
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.std = res.data
            var score = toJS(this.score)
            var student = toJS(this.std)
            score.forEach(sc => {
                student.forEach(std => {
                    if(sc.student===std.name){
                        sc.name = std.name
                        sc.grade = std.grade
                        sc.group = std.group
                    }
                })  
            })
            this.grades = score
        })
        .catch(err => {
            
        })
    }
    @action gradeModify = (name, grade, group, score, id) => {
        const { store } = this.props;
        store.gradeinfo = {name: name, grade: grade, group: group, score: score, id: id}
        this.props.history.push(`/ac/score/${id}/update`) 
    }
    @action gradeRemove = (id, name) => {
        const { store } = this.props
        axios.delete("https://api.daeoebi.com/scores/" + id + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            axios.post("https://api.daeoebi.com/tests/deletestd/", ({
                name: name,
                id: this.testinfo.id
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
        var printProps = store.printProps
        printProps = JSON.stringify(printProps)
        localStorage.setItem("printProps", printProps)
        this.props.history.push("/print")
    }

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
                axios.get("https://api.daeoebi.com/materials", {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    const path = window.location.href
                    const test_id = path.split("/")[5]
                    this.getscore(token, test_id)
                    this.gettest(token, test_id)
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
        const gradelist = this.grades.map(grade => (
            <GradeContent
                name={grade.name}
                grade={grade.grade}
                group={grade.group}
                score={grade.score}
                percent={grade.percent}
                rank={grade.rank}
                rating={grade.rating}
                gradeModify={() => this.gradeModify(grade.name, grade.grade, grade.group, grade.score, grade.id)}
                gradeRemove={() => this.gradeRemove(grade.id, grade.name)}
                key={grade.id}
                movePrintPage={() => this.movePrintPage(grade.name, grade.grade, grade.group, grade.score, grade.percent, grade.rank, grade.rating, this.testinfo.additional_info, this.testinfo.schoolyear, this.testinfo.test_type, this.testinfo.cand_num, this.testinfo.average, this.testinfo.std_dev, this.testinfo.subject, grade.z, grade.prob_dens, grade.id)}
            />
        ))
        return(
            <div className="grade-container">
                <Header/>
                <div className="grade-content-container">
                    <div className="grade-content-header-container">
                        <div className="grade-content-header-left">
                            <div className="grade-content-title">학생 성적표 목록</div>
                            <DropDown placeholder="학년" option={store.schoolyear} className="grade-content-dropdown-first1" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.group} className="grade-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="grade-content-search-btn">검색</div>
                            <Link className="grade-content-search-btn" to="/groups">그룹 관리</Link>
                        </div>
                        <div className="grade-content-header-right">
                        </div>
                    </div>
                    <div className="grade-content-body-container">
                        <div className="grade-content-body-header">
                            <div className="grade-content-body-header-text">학생 구분</div>
                            <div className="grade-content-body-header-text">내점수</div>
                            <div className="grade-content-body-header-text">백분율</div>
                            <div className="grade-content-body-header-text">예상 등수</div>
                            <div className="grade-content-body-header-text">등급</div>
                        </div>
                        <div className="grade-content-body">
                            {gradelist}
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

export default GradeList