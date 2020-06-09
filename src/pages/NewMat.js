import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import axios from 'axios'

@inject('store')
@observer
class NewMat extends React.Component{

    @observable isSearchable = true
    @observable isClearable = false
    @observable name = ""
    @observable link = ""
    @observable subject = ""
    @observable schoolyear = ""
    @observable group = ""
    
    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action addTest = (name, link, subject, grade, group) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("http://api.daeoebi.com/materials/", ({
            name: name,
            link: link,
            subject: subject,
            grade: grade,
            group: group
        }), {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.props.history.push("/inf/mat")
        })
        .catch(err => {
            console.log(err)
        })
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }

    componentDidMount(){
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
        axios.get("http://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            var data = res.data['results']
            for(var i in data){
                group.push({value: data[i]['name'], label: data[i]['name']})
            }
            store.infgroup = group
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const { store } = this.props
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">1급 정보 세부 항목 입력</div>
                    <input value={this.name} onChange={this.handleChange} name="name" className="newstudent-content-input" placeholder="자료 이름"/>
                    <input value={this.link} onChange={this.handleChange} name="link" className="newstudent-content-input" placeholder="자료 링크"/>
                    <input value={this.subject} onChange={this.handleChange} name="subject" className="newstudent-content-input" placeholder="자료 관련 과목"/>
                    <DropDown placeholder="자료 활용 학년" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="자료 그룹 지정" option={store.infgroup} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/inf/group/new" className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newvid-content-btn" onClick={() => this.addTest(this.name, this.link, this.subject, this.schoolyear, this.group)}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewMat