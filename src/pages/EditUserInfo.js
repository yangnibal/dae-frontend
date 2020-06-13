import React from 'react'
import { observer } from 'mobx-react'
import './Signup.scss'
import axios from 'axios'
import { action, observable } from 'mobx'

@observer
class EditUserInfo extends React.Component{

    @observable id = ""
    @observable username = ""
    @observable newpassword = ""
    @observable checkpassword = ""
    @observable name = ""
    @observable phone = ""
    @observable email = ""
    @observable duplicate = false
    @observable check_Pw = false
    @observable password = ""

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action duplicate_Username = () => {
        if(this.username.length>=6 && this.username.length<=11){
            axios.post("http://api.daeoebi.com/users/duplicate/", ({
                username: this.username
            }))
            .then(res => {
                if(res.data==="username already exist"){
                    alert("이미 사용중인 아이디 입니다.")
                } else {
                    alert("사용 가능한 아이디 입니다.")
                    this.duplicate = true
                }
            })
            .catch(err => {
                
            })
        } else {
            alert("아이디는 6자에서 11자 사이로 입력해주시기 바랍니다.")
        }
    }
    @action check_Password = () => {
        if(this.password.length>=6 && this.password.length<=11){
            if(this.password!==this.checkpassword){
                alert("비밀번호가 일치하지 않습니다.")
            } else {
                alert("비밀번호가 일치합니다.")
                this.check_Pw = true
            }
        } else {
            alert("비밀번호는 6자에서 11자 사이로 입력해주시기 바랍니다.")
        }  
    }
    @action modifyInfo = () => {
        var password = ""
        if(this.newpassword!=="") password = this.newpassword
        else password = this.password
        const id = localStorage.getItem("user_id")
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(ltoken===null){
            token = stoken
        } else {
            token = ltoken
        }
        const put = () => {
            axios.put("http://api.daeoebi.com/users/" + id + "/", ({
                username: this.username,
                password: password,
                name: this.name,
                phone_number: this.phone,
                email: this.email
            }), {
                headers: {
                    Authorization: "Token " + token
                }
            })
            .then(res => {
                alert("정보 수정이 완료되었습니다.")
                this.props.history.push("/")
            })
            .catch(err => {
                
            })
        }
        if(this.id===this.username){
            if(this.newpassword!=="" && this.check_Pw===false) {
                alert("비밀번호 확인을 해 주시기 바랍니다.")
            } else {
                if(this.name!=="" && this.phone!=="" && this.email!=="" && this.username!=="" && this.password!==""){
                    put()
                } else {
                    alert("입력창을 확인해주시기 바랍니다.")
                }
            }
        } else { 
            if(this.duplicate===false){
                alert("아이디 중복확인을 해 주시기 바랍니다.")
            } else {
                if(this.newpassword!=="" && this.check_Pw===false) {
                    alert("비밀번호 확인을 해 주시기 바랍니다.")
                } else {
                    if(this.name!=="" && this.phone!=="" && this.email!=="" && this.username!=="" && this.password!==""){
                        put()
                    } else {
                        alert("입력창을 확인해주시기 바랍니다.")
                    }
                }
            }
        }
        
    }
    @action cancle = () => {
        this.props.history.push("/")
    }

    componentDidMount(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(ltoken===null){
            token = stoken
        } else {
            token = ltoken
        }
        axios.get("http://api.daeoebi.com/users/me/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            this.id = res.data['username']
            this.username = res.data['username']
            this.name = res.data['name']
            this.phone = res.data['phone_number']
            this.email = res.data['email']
            localStorage.setItem("user_id", res.data['id'])
        })
        .catch(err => {
            
        })
    }

    render(){
        return(
            <div className="signup-container">
                <div className="signup-input-container">
                    <div className="signup-input-text">회원 정보 입력</div>
                    <div className="signup-input-username-container">
                        <input onChange={this.handleChange} value={this.username} name="username" placeholder="아이디" className="signup-input-username"/>
                        <div className="signup-username-duplicate-container">
                            <div className="signup-username-duplicate" onClick={() => this.duplicate_Username()}>아이디 중복확인</div>
                        </div>
                    </div>
                    <input onChange={this.handleChange} value={this.newpassword} name="newpassword" type="password" placeholder="새 비밀번호(없으시면 공백으로 남겨주세요)" className="signup-input-password"/>
                    <div className="signup-input-checkpassword-container">
                        <input onChange={this.handleChange} value={this.checkpassword} name="checkpassword" type="password" placeholder="비밀번호 확인" className="signup-input-checkpassword"/>
                        <div className="signup-checkpassword-btn-container">
                            <div className="signup-checkpassword-btn" onClick={() => this.check_Password()}>비밀번호 확인</div>
                        </div>
                    </div>
                    <input onChange={this.handleChange} value={this.name} name="name" placeholder="이름" className="signup-input-name"/>
                    <input onChange={this.handleChange} value={this.phone} name="phone" placeholder="휴대전화(숫자만 입력)" className="signup-input-phone"/>
                    <input onChange={this.handleChange} value={this.email} name="email" placeholder="E - mail" className="signup-input-email"/>
                    <input onChange={this.handleChange} value={this.password} name="password" placeholder="비밀번호" className="signup-input-email"/>
                    <div className="modify-btn-container">
                        <div className="modify-btn" onClick={() => this.modifyInfo()}>수정</div>
                        <div className="modify-btn" onClick={() => this.cancle()}>취소</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUserInfo