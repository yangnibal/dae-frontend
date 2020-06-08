import React from 'react'
import './Student.scss'
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'
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
        var student = this.students.find(student => student.id===e.target.id)
        student.isChecked = !student.isChecked
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleAllCheckboxChange = (e) => {
        const { name, checked } = e.target
        this[name] = checked
        var students = this.students
        students.forEach(student => student.isChecked = e.target.checked)
        this.students = students
    }
    @action studentModify = (name, grade, group, id) => {
        const { store } = this.props
        store.studentinfo = { name: name, grade: grade, group: group, id: id }
        this.props.history.push(`/ac/student/${id}/update`)
    }
    @action studentRemove = (id) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.delete("http://localhost:8000/students/" + id + "/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    @action gradeRegister = () => {
        var students = this.students
        const checkedStudents = students.filter(student => student.isChecked===true)
        localStorage.setItem("checkedstudent", JSON.stringify(checkedStudents))
        this.props.history.push("/ac/student/inputscore")
    }
    @action choiceTest = () => {
        this.props.history.push("/ac/test")
    }
    @action getGroup = () => {
        const { store } = this.props
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const group = []
        axios.get("http://localhost:8000/groups/getmygroup/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            for(var i in res.data){
                group.push({value: res.data[i]['name'], label: res.data[i]['name']})
            }
            store.group = group
        })
        .catch(err => {
            console.log(err)
        })
    }
    @action findstd = (grade, group, name) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://localhost:8000/students/findstd/", ({
            grade: grade,
            group: group,
            name: name
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            for(var i in res.data){
                res.data[i].isChecked=false
            }
            this.students = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }
    @action nameClick = (id, name) => {
        this.props.history.push(`/ac/student/${id}`)
        localStorage.setItem("std_id", id)
        localStorage.setItem("std_name", name)
    }

    componentDidMount(){
        localStorage.setItem("std_name", "")
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        this.getGroup()
        axios.get("http://localhost:8000/students/getmystd/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            for(var i in res.data){
                res.data[i].isChecked=false
            }
            this.students = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { store } = this.props;
        const studentlist = this.students.map(student => {return(
            <StudentContent
                name={student.name}
                grade={student.grade}
                group={student.group}
                id={student.id}
                key={student.id}
                studentModify={() => this.studentModify(student.name, student.grade, student.group, student.id)}
                studentRemove={() => this.studentRemove(student.id)}
                checked={student.isChecked}
                onChange={this.handleToggle}
                onNameClick={() => this.nameClick(student.id, student.name)}
            />
        )})
        const test_id = localStorage.getItem("test_id")
        return(
            <div className="student-container">
                <Header/>
                <div className="student-content-container">
                    <div className="student-content-header-container">
                        <div className="student-content-header-left">
                            <div className="student-content-title">학생 목록</div>
                            <DropDown placeholder="학년" option={store.schoolyear} className="student-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.group} className="student-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <input value={this.name} onChange={this.handleChange} name="name" className="student-content-search-input" placeholder="이름"/>
                            <div className="student-content-search-btn" onClick={() => this.findstd(this.schoolyear, this.group, this.name)}>검색</div>
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
                        </div>
                        <div  className="student-content-footer">
                            {test_id===null ? <div className="student-content-body-footer" onClick={() => this.choiceTest()}>TEST 선택하기</div> : null}
                            <div className="student-content-body-footer" onClick={() => this.gradeRegister()}>선택 학생 성적 등록</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentList