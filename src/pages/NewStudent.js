import React from 'react'
import './NewStudent.scss'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'
import * as XLSX from 'xlsx'

@inject('store')
@observer
class NewStudent extends React.Component{

    @observable name = localStorage.getItem("std_name")
    @observable grade = ""
    @observable group = ""
    @observable isSearchable = true
    @observable isClearable = false
    @observable file = []

    @action schoolyearChange = (e) => {
        this.grade = e.value
        localStorage.setItem("grade", e.value)
    }

    @action groupChange = (e) => {
        this.group = e.value
    }

    @action init_data = (flag) => {
        if(flag){
            this.grade = ""
            this.group = ""
        }
        this.name = ""
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action addStudent = (name, grade, group, add_new) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        if(name!=="" && grade!==""){
            if(group===""){
                axios.post("https://api.daeoebi.com/students/", ({
                    name: name,
                    grade: grade
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    if(add_new===false){
                        this.init_data()
                        this.props.history.push("/ac/student")
                    } else {
                        this.init_data()
                    }
                })
                .catch(err => {
                    
                })
            } else {
                axios.post("https://api.daeoebi.com/students/", ({
                    name: name,
                    grade: grade,
                    group: group
                }), {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    if(add_new===false){
                        this.init_data(true)
                        this.props.history.push("/ac/student")
                    } else {
                        this.init_data(false)
                    }
                })
                .catch(err => {
                    
                })
            }
        } else {
            alert("이름이나 학년을 입력해 주시기 바랍니다.")
        }
    }
    @action saveInfo = () => {
        sessionStorage.setItem("name", this.name)
    }
    @action parseXl = (e) => {
        const { store } = this.props
        var data = []
        var file = e.target
        var reader = new FileReader()
        reader.onload = () => {
            var fileData = reader.result
            var workBook = XLSX.read(fileData, {type: 'binary'})
            workBook.SheetNames.forEach(function(sheetName){
                var rowObj = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                data = rowObj
                axios.post("https://api.daeoebi.com/students/getlist/", ({
                    data
                }), {
                    headers: {
                        Authorization: "Token " + store.getToken()
                    }
                })
                .then(res => {
                    this.props.history.goBack()
                })
                .catch(err => {
                })
            })
        }
        reader.readAsBinaryString(file.files[0])
    }

    componentDidMount(){
        const { store } = this.props
        axios.post("https://api.daeoebi.com/users/caniuse/", ({
            type: 2
        }), {
            headers: {
                Authorization: "Token "+store.getToken()
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                if(sessionStorage.getItem("name")!==null) this.name = sessionStorage.getItem("name")
                store.getGroup()
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
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
                        <Link to="/ac/group/new" onClick={() => this.saveInfo()} className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newstudent-content-btn" onClick={() => this.addStudent(this.name, this.grade, this.group, false)}>등록</div>
                        <div className="newstudent-content-btn" onClick={() => this.addStudent(this.name, this.grade, this.group, true)}>학생 추가 등록</div>
                    </div>
                    <input type="file" value={this.file} onChange={this.parseXl} id="xl" style={{display: "none"}}/>
                    <label htmlFor="xl" className="xl-upload">엑셀 일괄 업로드</label>
                </div>
                <a download href="http://localhost:3000/daeoebi.xlsx" className="xl-download">엑셀 양식 다운로드</a>
            </div>
        )
    }
}

export default NewStudent