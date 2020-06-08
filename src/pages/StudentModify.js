import React from 'react'
import './NewStudent.scss'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'

@inject('store')
@observer
class StudentModify extends React.Component{

    @observable name = ""
    @observable grade = ""
    @observable group = ""

    @action init_data = () => {
        const { store } = this.props;
        this.name = ""
        this.grade = ""
        this.group = ""
        localStorage.removeItem("std_id")
        store.studentinfo = {}
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action cancleModify = () => {
        this.init_data()
        this.props.history.push("/ac/student")
    }
    @action addStudent = (name, grade, group) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const id = localStorage.getItem("std_id")
        if(name!=="" && grade!==""){
            if(group===""){
                axios.patch("http://api.daeoebi.com/students/" + id + "/", ({
                    name: name,
                    grade: grade
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    this.init_data()
                    this.props.history.push("/ac/student")
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                axios.patch("http://api.daeoebi.com/students/" + id + "/", ({
                    name: name,
                    grade: grade,
                    group: group
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    this.init_data()
                    this.props.history.push("/ac/student")
                })
                .catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert("이름이나 학년을 입력해 주시기 바랍니다.")
        }
    }

    componentDidMount(){
        const { store } = this.props
        const studentinfo = store.studentinfo
        this.name = studentinfo.name
        this.grade = studentinfo.grade
        this.group = studentinfo.group
        localStorage.setItem("std_id", studentinfo.id)
    }

    render(){
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">학생 기본 정보 입력</div>
                    <input name="name" value={this.name} onChange={this.handleChange} className="newstudent-content-input" placeholder="학생 이름"/>
                    <input name="grade" value={this.grade} onChange={this.handleChange} className="newstudent-content-input" placeholder="학년 선택"/>
                    <input name="group" value={this.group} onChange={this.handleChange} className="newstudent-content-input" placeholder="그룹 선택"/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/ac/group/new" className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newstudent-content-btn" onClick={() => this.addStudent(this.name, this.grade, this.group)}>수정</div>
                        <div className="newstudent-content-btn" onClick={() => this.cancleModify()}>취소</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentModify