import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'
import axios from 'axios'

@inject('store')
@observer
class VidDetail extends React.Component{

    @observable iframe = ""

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.post("http://api.daeoebi.com/users/caniuse/", ({
            type: 1
        }), {
            headers: {
                Authorization: "Token "+store.getToken()
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                axios.get("http://api.daeoebi.com/videos/" + path + "/", {
                    headers: {
                        Authorization: "Token " + store.getToken()
                    }
                })
                .then(res => {
                    this.iframe = res.data['iframe']
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        return(
            <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <Header/>
                <div style={{width: "100vw", height: "calc(100vh - 8rem)", display: "flex", justifyContent: "center", alignItems: "center"}} dangerouslySetInnerHTML={{__html: this.iframe}}></div>
                <Link to="/inf/vid" style={{position: "fixed", bottom: "30px", left: "30px", color: "white", border: "1px solid white", textDecoration: "none", width: "150px", height: "50px", fontSize: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center"}}>뒤로가기</Link>
            </div>
        )
    }
}

export default VidDetail