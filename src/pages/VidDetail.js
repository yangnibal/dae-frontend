import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class VidDetail extends React.Component{

    componentDidMount(){
        const { store } = this.props
        var path = window.location.href
        path = path.split("/")[5]
        store.getIframe(path)
    }

    render(){
        const { store } = this.props
        return(
            <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                <Header/>
                <div style={{width: "100vw", height: "calc(100vh - 8rem)", display: "flex", justifyContent: "center", alignItems: "center"}} dangerouslySetInnerHTML={{__html: store.iframe}}></div>
                <Link to="/inf/vid" style={{position: "fixed", bottom: "30px", left: "30px", color: "white", border: "1px solid white", textDecoration: "none", width: "150px", height: "50px", fontSize: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center"}}>뒤로가기</Link>
            </div>
        )
    }
}

export default VidDetail