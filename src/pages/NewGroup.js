import React from 'react'
import './NewGroup.scss'
import Header from '../components/Header';
import axios from 'axios'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class NewGroup extends React.Component{

    @observable name = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action init_data = () => {
        this.name = ""
    }
    @action addGroup = (name, add_more) => {
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("https://api.daeoebi.com/groups/", ({
            name: name
        }), {
            headers: {
                Authorization: "Token "+token
            }
        })
        .then(res => {
            if(add_more===false){
                this.init_data()
                this.props.history.goBack()
            } else {
                this.init_data()
            }
        })
        .catch(err => {
            
        })
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
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        return(
            <div className="newgroup-container">
                <Header/>
                <div className="newgroup-content-container">
                    <div className="newgroup-content-title">그룹 생성</div>
                    <input name="name" value={this.name} onChange={this.handleChange} className="newgroup-content-input" placeholder="그룹 이름"/>
                    <div className="newgroup-content-btn-container">
                        <div className="newgroup-content-btn" onClick={() => this.addGroup(this.name, false)}>등록</div>
                        <div className="newgroup-content-btn" onClick={() => this.addGroup(this.name, true)}>그룹 추가 등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewGroup