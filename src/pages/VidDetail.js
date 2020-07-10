import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import './Detail.scss'

@inject('store')
@observer
class VidDetail extends React.Component{

    @observable url = ""
    @observable link = ""

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        axios.get("https://api.daeoebi.com/videos/" + path + "/", {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.url = res.data['video']
            this.link = res.data['link']
        })
        .catch(err => {
                    
        })
    }

    render(){
        return(
            <div className="viddetail-container">
                <Header/>
                <div className="viddetail-sticky">
                    {this.iframe==="" ? 
                    <video autoPlay controlsList="nodownload" controls className="viddetail">
                        <source src={this.url} type="video/mp4"/>
                    </video> :
                    <iframe src={`${this.link}?autoplay=1`} title={this.link} className="viddetail" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    }
                </div>
            </div>
        )
    }
}

export default VidDetail