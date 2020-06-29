import React from 'react'
import { observer, inject } from 'mobx-react'
import Header from '../components/Header'
import axios from 'axios'
import { observable, action } from 'mobx'

@inject('store')
@observer
class FileDetail extends React.Component{

    @observable file = ""

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.get("https://api.daeoebi.com/files/" + path + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.file = res.data['file']
            console.log(this.file)
        })
        .catch(err => {
                    
        })
    }

    render(){
        return(
            <div>
                <Header/>
                <div style={{width:"100vw", height: "calc(100vh - 8rem)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    
                </div>
                
            </div>
        )
    }
}

export default FileDetail