import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'

@inject('store')
@observer
class SavedVidDetail extends React.Component{

    @observable savedvids = {
        ot: "https://api.daeoebi.com/media/videos/ot.mp4",
        first: "https://api.daeoebi.com/media/videos/1.mp4",
        second: "https://api.daeoebi.com/media/videos/2.mp4",
        third: "https://api.daeoebi.com/media/videos/3.mp4",
        fourth: "https://api.daeoebi.com/media/videos/4.mp4",
        fifth: "https://api.daeoebi.com/media/videos/5.mp4"
    }

    @observable url = ""

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.post("https://api.daeoebi.com/users/caniuse/", ({
            type: 1
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
        .catch(err => {
            alert("로그인을 해주시기 바랍니다.")
            this.props.history.push("/account/login")
        })
        if(path==="ot"){
            this.url = this.savedvids['ot']
        } else if(path==="1"){
            this.url = this.savedvids['first']
        } else if(path==="2"){
            this.url = this.savedvids['second']
        } else if(path==="3"){
            this.url = this.savedvids['third']
        } else if(path==="4"){
            this.url = this.savedvids['fourth']
        } else if(path==="5"){
            this.url = this.savedvids['fifth']
        } else {
            alert("존재하지 않는 영상입니다.")
            this.props.history.goBack()
        }
    }

    render(){
        return(
            <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <Header/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw"}}>
                    <video controlsList="nodownload" controls height="720" width="1280" style={{outline: "none"}}>
                        <source src={this.url} type="video/mp4"/>
                    </video>
                </div>
            </div>
        )
    }
}

export default SavedVidDetail