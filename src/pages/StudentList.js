import React from 'react'
import './Student.scss'
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import StudentContent from '../components/StudentContent'

@inject('store')
@observer 
class StudentList extends React.Component{

    @observable schoolyear = ""
    @observable group = ""
    @observable name = ""
    @observable students = []
    @observable checkall = false
    @observable check = false
    @observable isClearable = false
    @observable isSearchable = true

    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action handleToggle = (e) => {
        const { store } = this.props
        var student = store.students.find(student => student.id===e.target.id)
        student.isChecked = !student.isChecked
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleAllCheckboxChange = (e) => {
        const { name, checked } = e.target
        this[name] = checked
        const { store } = this.props
        var students = store.students
        students.forEach(student => student.isChecked = e.target.checked)
        this.students = students
    }
    @action studentModify = (id) => {
        this.props.history.push(`/ac/student/${id}/update`)
    }
    @action gradeRegister = () => {
        const { store } = this.props
        if(localStorage.getItem("test_id")!==null){
            var students = store.students
            const checkedStudents = students.filter(student => student.isChecked===true)
            localStorage.setItem("checkedstudent", JSON.stringify(checkedStudents))
            this.props.history.push("/ac/student/inputscore")
        } else {
            alert("테스트를 선택 해 주시기 바랍니다.")
        }
    }
    @action choiceTest = () => {
        this.props.history.push("/ac/test")
    }
    @action nameClick = (id, name) => {
        this.props.history.push(`/ac/student/${id}`)
        localStorage.setItem("std_id", id)
        localStorage.setItem("std_name", name)
    }

    componentDidMount(){
        localStorage.setItem("std_name", "")
        const { store } = this.props
        store.getStd(localStorage.getItem("test_id"))
    }

    render(){
        const { store } = this.props;
        const test_id = localStorage.getItem("test_id")
        const studentlist = store.students.map(student => (
            <StudentContent
                name={student.name}
                grade={student.grade}
                group={student.group}
                id={student.id}
                key={student.id}
                studentModify={() => this.studentModify(student.id)}
                studentRemove={() => store.studentRemove(student.id)}
                checked={student.isChecked}
                onChange={this.handleToggle}
                onNameClick={() => this.nameClick(student.id, student.name)}
            />
        )) 
        return(
            <div className="student-container">
                <Header/>
                <div className="student-content-container">
                    <div className="student-content-header-container">
                        <div className="student-content-header-left">
                            <div className="student-content-title">학생 목록</div>
                            <span className="mobile-separator">
                                <DropDown placeholder="학년" option={store.schoolyear} className="student-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <DropDown placeholder="그룹" option={store.group} className="student-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <input value={this.name} onChange={this.handleChange} name="name" className="student-content-search-input" placeholder="이름"/>
                                <div className="student-content-search-btn" onClick={() => store.findstd(this.schoolyear, this.group, this.name)}>검색</div>
                                <Link className="student-content-search-btn group-btn" to="/groups">그룹 관리</Link>
                            </span>
                        </div>
                        <div className="student-content-header-right">
                            <Link to="/ac/student/new" className="student-register">학생 등록</Link>
                        </div>
                    </div>
                    <div className="student-content-body-container">
                        <div className="student-content-body-header">
                            <input value={this.checkall} name="checkall" onChange={this.handleAllCheckboxChange} type="checkbox" className="student-content-body-header-btn" id="btn"/>
                            <label htmlFor="btn">{this.checkall===true ? "✓" : null}</label>
                            <div className="student-content-body-header-text">이름</div>
                            <div className="student-content-body-header-text">학년</div>
                            <div className="student-content-body-header-text">그룹</div>
                        </div>
                        <div className="student-content-body">
                            {studentlist}
                            <div  className="student-content-footer">
                                {test_id===null ? <div className="student-content-body-footer" onClick={() => this.choiceTest()}>TEST 선택하기</div> : null}
                                <div className="student-content-body-footer" onClick={() => this.gradeRegister()}>선택 학생 성적 등록</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentList