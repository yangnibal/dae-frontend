import React from 'react'
import { observer } from 'mobx-react'
import './Find.scss'
import { observable, action } from 'mobx'
import axios from 'axios'

@observer
class FindPw extends React.Component{

    @observable username = ""
    @observable email = ""
    @observable phone_number = ""
    @observable name = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action FindPw = (username, email, phone_number, name) => {
        axios.post("https://api.daeoebi.com/users/findpw/", ({
            username: username,
            email: email,
            phone_number: phone_number,
            name: name
        }))
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className="find-container">
                <input value={this.username} name="username" onChange={this.handleChange} placeholder="아이디"/>
                <input value={this.name} name="name" onChange={this.handleChange} placeholder="이름"/>
                <input value={this.phone_number} name="phone_number" onChange={this.handleChange} placeholder="전화번호"/>
                <input value={this.email} name="email" onChange={this.handleChange} placeholder="이메일"/>
                <div className="find-btn" onClick={() => this.FindPw(this.username, this.email, this.phone_number, this.name)}>비밀번호 찾기</div>
            </div>
        )
    }
}

export default FindPw