import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'
import './StudentTestModify.scss'
import Header from '../components/Header'

@inject('store')
@observer
class StudentTestModify extends React.Component{

    @observable score = ""
    @observable test = ""
    @observable student = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action cancle = () => {
        this.props.history.goBack()
    }
    @action modify = () => {
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.put("http://api.daeoebi.com/scores/" + path + "/", ({
            score: this.score,
            test: this.test,
            student: this.student
        }), {
            headers: "Token " + store.getToken() 
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.post("http://api.daeoebi.com/users/caniuse/", ({
            type: 2
        }), {
            headers: {
                Authorization: "Token "+store.getToken()
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                axios.get("http://api.daeoebi.com/scores/" + path + "/", {
                    headers: {
                        Authorization: "Token " + store.getToken()
                    }
                })
                .then(res => {
                    this.score = res.data['score']
                    this.test = res.data['test']
                    this.student = res.data['student']
                })
                .catch(err => {
                    alert("존재하지 않는 테스트입니다")
                    this.props.history.goBack()
                })
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        return(
            <div className="scoreupdate-container">
                <Header/>
                <div className="scoreupdate-sticky">
                    <div className="scoreupdate-title">학생 점수 수정</div>
                    <div className="scoreupdate-inputs">
                        <input value={this.score} onChange={this.handleChange} name="score" className="scoreupdate-input" placeholder="점수"/>
                    </div>
                    <div className="scoreupdate-btns">
                        <div className="scoreupdate-btn" onClick={() => this.modify()}>수정</div>
                        <div className="scoreupdate-btn" onClick={() => this.cancle()}>취소</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentTestModify