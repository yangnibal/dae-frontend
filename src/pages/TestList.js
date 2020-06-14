import React from 'react'
import Header from '../components/Header'
import './Test.scss'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import DropDown from '../components/DropDown'
import { observable, action } from 'mobx'
import axios from 'axios'
import TestContent from '../components/TestContent'

@inject('store')
@observer
class TestList extends React.Component{

    @observable isClearable = false
    @observable isSearchable = true
    @observable schoolyear = ""
    @observable semester = ""
    @observable subject = ""
    @observable tests = [] 

    @action schoolyearValueChange = (e) => {
        this.schoolyear = e.value
    }
    @action semesterChange = (e) => {
        this.semester = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action testModify = (schoolyear, test_type, subject, additional_info, average, std_dev, cand_num, id) => {
        const { store } = this.props;
        store.testinfo = {schoolyear: schoolyear, test_type: test_type, subject: subject, additional_info: additional_info, average: average, std_dev: std_dev, cand_num: cand_num, id: id }
        this.props.history.push(`/ac/test/${id}/update`) 
    }
    @action testRemove = (id) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.delete("https://api.daeoebi.com/tests/" + id + "/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            
        })
    }
    @action addTestStudent = (id, test_type) => {
        localStorage.setItem("test_id", id)
        this.props.history.push("/ac/student")
    }
    @action findTest = (grade, semester, subject) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("https://api.daeoebi.com/tests/findtest/", ({
            grade: grade,
            test_type: semester,
            subject: subject
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.tests = res.data
        })
        .catch(err => {
            
        })
    }
    @action nameClick = (test_id) => {
        this.props.history.push(`/ac/grade/${test_id}`)
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
                axios.get("https://api.daeoebi.com/tests/getmytest/", {
                    headers: {
                        Authorization: "Token "+token
                    }
                })
                .then(res => {
                    this.tests = res.data
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
        const testlist = this.tests.map(test => (
            <TestContent
                grade={test.grade}
                test_type={test.test_type}
                subject={test.subject}
                additional_info={test.additional_info}
                average={test.average}
                std_dev={test.std_dev}
                cand_num={test.cand_num}
                student={test.student.length}
                key={test.id}
                id={test.id}
                testModify={() => this.testModify(test.grade, test.test_type, test.subject, test.additional_info, test.average, test.std_dev, test.cand_num, test.id)}
                testRemove={() => this.testRemove(test.id)}
                addTestStudent={() => this.addTestStudent(test.id, test.test_type)}
                nameClick={() => this.nameClick(test.id)}
            />
        ))
        return(
            <div className="test-container">
                <Header/>
                <div className="test-content-container">
                    <div className="test-content-header-container">
                        <div className="test-content-header-left">
                            <div className="test-content-title">TEST 목록</div>
                            <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearValueChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학기" option={store.semester} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.semesterChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="test-content-search-btn" onClick={() => this.findTest(this.schoolyear, this.semester, this.subject)}>검색</div>
                        </div>
                        <div className="test-content-header-right">
                            <Link to="/ac/test/new" className="test-register">TEST 등록</Link>
                        </div>
                    </div>
                    <div className="test-content-body-container">
                        <div className="test-content-body-header">
                            <div className="test-content-body-header-text">TEST 구분</div>
                            <div className="test-content-body-header-text">평균</div>
                            <div className="test-content-body-header-text">표준 편차</div>
                            <div className="test-content-body-header-text">응시자 수</div>
                            <div className="test-content-body-header-text">성적 등록 학생수</div>
                        </div>
                        <div className="test-content-body">
                            {testlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestList