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
    @observable path = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action cancle = () => {
        this.props.history.goBack()
    }
    @action modify = () => {
        const { store } = this.props
        axios.put("https://api.daeoebi.com/scores/" + this.path + "/", ({
            score: this.score,
            test: this.test,
            student: this.student
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
    }

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        this.path = path.split("/")[5]
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/scores/" + this.path + "/", {
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
        }
        store.caniuse(2, doSomething)
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