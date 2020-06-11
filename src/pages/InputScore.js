import React from 'react'
import Header from '../components/Header'
import InputScoreContent from '../components/InputScoreContent'
import './InputScore.scss'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import axios from 'axios'

@observer
class InputScore extends React.Component{

    @observable students = []

    @action handleChange = (e) => {
        var checkedStudents = this.students
        checkedStudents.forEach(student => {
            if(student.name===e.target.name){
                student.score = e.target.value
            }
        })
    }
    @action addScore = () => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const test_id = localStorage.getItem("test_id")
        var student = toJS(this.students)
        var data = []
        for(var i in student){
            data.push({student: student[i].name, score: student[i].score, test: student[i].test_id})
        }
        axios.post("http://api.daeoebi.com/scores/getlist/", ({
            data
        }), {
            headers: {
                Authorization: "Token " + token  
            }
        })
        .then(res => {
            this.props.history.push(`/ac/grade/${test_id}`)
            localStorage.removeItem("test_id")
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        const { store } = this.props;
        axios.post("http://api.daeoebi.com/users/caniuse/", ({
            type: 2
        }), {
            headers: {
                Authorization: "Token "+store.getToken()
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                const id = localStorage.getItem("test_id")
                var checkedstudents = localStorage.getItem("checkedstudent")
                checkedstudents = JSON.parse(checkedstudents)
                for(var i in checkedstudents){
                    checkedstudents[i].score = ""
                    checkedstudents[i].test_id = id
                }
                this.students = checkedstudents
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
        
    }

    render(){
        const checkedstudentlist = this.students.map(checkedstudent => (
            <InputScoreContent
                grade={checkedstudent.grade}
                name={checkedstudent.name}
                group={checkedstudent.group}
                key={checkedstudent.id}
                serial_no={this.students.findIndex(student => student.name===checkedstudent.name)+1}
                onChange={this.handleChange}
                value={checkedstudent.score}
            />
        ))
        return(
            <div className="is-container">
                <Header/>
                <div className="is-content-container">
                    <div className="is-content-header">
                        <div className="is-content-header-text">NO.</div>
                        <div className="is-content-header-text">학생 구분</div>
                        <div className="is-content-header-text">내 점수</div>
                    </div>
                    <div className="is-content-body">   
                        {checkedstudentlist}
                    </div>
                    <div className="is-content-footer" onClick={() => this.addScore()}>성적 등록</div>
                </div>
            </div>
        )
    }
}

export default InputScore