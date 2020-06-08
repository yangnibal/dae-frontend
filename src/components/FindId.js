import React from 'react'
import './Find.scss'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'

@observer
class FindId extends React.Component{

    @observable name = ""
    @observable phone_number = ""
    @observable email = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action findID = (name, phone_number, email) => {
        axios.post("http://api.daeoebi.com/users/findid/", ({
            name: name,
            phone_number: phone_number,
            email: email
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
                <input name="name" value={this.name} onChange={this.handleChange} placeholder="이름"/>
                <input name="phone_number" value={this.phone_number} onChange={this.handleChange} placeholder="전화번호"/>
                <input name="email" value={this.email} onChange={this.handleChange} placeholder="이메일"/>
                <div className="find-btn" onClick={() => this.findID(this.name, this.phone_number, this.email)}>아이디 찾기</div>
            </div>
        )
    }
}

export default FindId