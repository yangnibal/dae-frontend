import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import OT from '../videos/ot.mp4'
import Video2 from '../videos/2.mp4'
import Video3 from '../videos/3.mp4'
import Video4 from '../videos/4.mp4'
import Video5 from '../videos/5.mp4'

@inject('store')
@observer
class SavedVidDetail extends React.Component{

    @observable savedvids = {
        ot: OT,
        //first: Video1,
        second: Video2,
        third: Video3,
        fourth: Video4,
        fifth: Video5
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
            this.url = OT
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