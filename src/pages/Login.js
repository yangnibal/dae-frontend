import React from 'react'
import './Login.scss'
import Logo from '../images/logo2.png'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import axios from 'axios'

@observer
class Login extends React.Component{

    @observable username = ""
    @observable password = ""
    @observable saveId = false

    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        this[name] = checked
    }
    @action handleLogin = () => {
        if(this.username===""){
            alert("아이디를 입력해주시기 바랍니다.")
        } else {
            if(this.password===""){
                alert("비밀번호를 입력해주시기 바랍니다.")
            } else {
                axios.post("http://api.daeoebi.com/users/login/", ({
                    username: this.username,
                    password: this.password
                }))
                .then(res => {
                    if(this.saveId===true){
                        localStorage.setItem("token", res.data['token'])
                    } else {
                        sessionStorage.setItem("token", res.data['token'])
                    }
                    this.props.history.push("/")
                    window.location.reload()
                })
                .catch(err => {
                    alert("비밀번호나 아이디가 일치하지 않습니다.")
                })
            }
        }
    }

    componentDidMount(){
        localStorage.clear()
        sessionStorage.clear()
    }
    render(){
        return(
            <div className="login-container">
                <img src={Logo} alt={Logo} className="login-logo"/>
                <div className="input-container">
                    <span className="selecter">ID</span>
                    <input value={this.username} onChange={this.handleChange} name="username" type="text" className="login-input-username"/>
                </div>
                <div className="input-container">
                    <span className="selecter">비밀번호</span>
                    <input value={this.password} onChange={this.handleChange} name="password" type="password" className="login-input-password"/>
                </div>
                <div className="checkbox-container">
                    <input checked={this.saveId} onChange={this.handleCheckboxChange} name="saveId" id="checkbox" type="checkbox" className="login-input-checkbox"/>
                    <label htmlFor="checkbox"/>
                    <span className="checkbox-text">아이디 저장</span>
                </div>
                <div className="login-btn" onClick={() => this.handleLogin()}>로그인</div>
                <div className="login-others-container">
                    <Link to="/account/findid" className="login-find-username">아이디 찾기</Link>
                    <Link to="/account/findpw" className="login-find-password">비밀번호 찾기</Link>
                    <Link className="login-signup-link" to="/account/signup">회원 가입</Link>
                </div>
            </div>
        )
    }
}

export default Login