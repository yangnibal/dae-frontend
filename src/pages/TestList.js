import React from 'react'
import Header from '../components/Header'
import './Test.scss'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import DropDown from '../components/DropDown'
import { observable, action } from 'mobx'
import TestContent from '../components/TestContent'

@inject('store')
@observer
class TestList extends React.Component{

    @observable isClearable = false
    @observable isSearchable = true
    @observable schoolyear = ""
    @observable semester = ""
    @observable subject = ""

    @action schoolyearValueChange = (e) => {
        this.schoolyear = e.value
    }
    @action semesterChange = (e) => {
        this.semester = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action testModify = (id) => {
        this.props.history.push(`/ac/test/${id}/update`) 
    }
    @action addTestStudent = (id) => {
        localStorage.setItem("test_id", id)
        this.props.history.push("/ac/student")
    }
    @action nameClick = (test_id) => {
        this.props.history.push(`/ac/grade/${test_id}`)
    }
    
    componentDidMount(){
        const { store } = this.props
        store.getMyTest()
    }

    render(){
        const { store } = this.props
        const testlist = store.tests.map(test => (
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
                testModify={() => this.testModify(test.id)}
                testRemove={() => store.testRemove(test.id)}
                addTestStudent={() => this.addTestStudent(test.id)}
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
                            <span className="mobile-separator">
                                <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearValueChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <DropDown placeholder="학기" option={store.semester} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.semesterChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <div className="test-content-search-btn" onClick={() => store.findTest(this.schoolyear, this.semester, this.subject)}>검색</div>
                            </span>
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