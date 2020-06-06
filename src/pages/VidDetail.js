import React from 'react'
import Header from '../components/Header'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class VidDetail extends React.Component{

    @observable iframe = ""

    componentDidMount(){
        this.iframe = localStorage.getItem("iframe")   
    }

    render(){
        console.log(this.iframe)
        return(
            <div style={{width: "100vw", height: "calc(100vh - 8rem)", }}>
                <Header/>
                <div dangerouslySetInnerHTML={{__html: this.iframe}}></div>
            </div>
        )
    }
}

export default VidDetail