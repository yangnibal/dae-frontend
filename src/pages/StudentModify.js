import React from 'react'
import './NewStudent.scss'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'

@inject('store')
@observer
class StudentModify extends React.Component{

    @observable path = ""
    @observable name = ""
    @observable grade = ""
    @observable group = ""

    @action schoolyearChange = (e) => {
        this.grade = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action init_data = () => {
        const { store } = this.props;
        this.name = ""
        this.grade = ""
        this.group = ""
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
        const { store } = this.props
        if(name!=="" && grade!==""){
            if(group===""){
                axios.patch("https://api.daeoebi.com/students/" + this.path + "/", ({
                    name: name,
                    grade: grade
                }), {
                    headers: {
                        Authorization: "Token " + store.getToken()
                    }
                })
                .then(res => {
                    this.init_data()
                    this.props.history.push("/ac/student")
                })
                .catch(err => {
                    
                })
            } else {
                axios.patch("https://api.daeoebi.com/students/" + this.path + "/", ({
                    name: name,
                    grade: grade,
                    group: group
                }), {
                    headers: {
                        Authorization: "Token " + store.getToken()
                    }
                })
                .then(res => {
                    this.init_data()
                    this.props.history.goBack()
                })
                .catch(err => {
                    
                })
            }
        } else {
            alert("이름이나 학년을 입력해 주시기 바랍니다.")
        }
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.path = path.split("/")[5]
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/students/" + this.path + "/", {
                headers: {
                    Authorization: "Token " + store.getToken()  
                }
            })
            .then(res => {
                this.name = res.data['name']
                this.grade = res.data['grade']
                this.group = res.data['group']
            })
            .catch(err => {
            })
        }
        store.caniuse(2, doSomething)
    }

    render(){
        const { store } = this.props
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">학생 기본 정보 입력</div>
                    <input name="name" value={this.name} onChange={this.handleChange} className="newstudent-content-input" placeholder="학생 이름"/>
                    <DropDown placeholder="학년 선택" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="그룹 선택" option={store.group} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
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