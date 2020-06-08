import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { action, observable } from 'mobx'
import './PrintPage.scss'
import axios from 'axios'

@inject('store')
@observer
class PrintPage extends React.Component{

    @observable logo = null

    @action print = (name, grade, group, test_type, score, rank, percent, rating, school, subject, cand_num, average, std_dev, z) => {
        const { store } = this.props
        store.printProps = { 
            name: name, 
            grade: grade, 
            group: group, 
            test_type: test_type, 
            score: score, 
            rank: rank, 
            percent: percent, 
            rating: rating, 
            school: school, 
            subject: subject, 
            cand_num: cand_num, 
            average: average, 
            std_dev: std_dev, 
            z: z
        }
    }
    @action goPrint = () => {
        this.props.history.push("/printpage/print")
    }
    @action handleFileChange = (e) => {
        const { store } = this.props;
        const files = e.target.files[0]
        var formData = new FormData()
        formData.append("logo", files)
        axios.post("http://api.daeoebi.com/logos/", formData, {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        
    }

    render(){
        return(
            <div className="printpage-container">
                <Header/>
                <div className="printpage-sticky">
                    <div className="printpage-btns">
                        <div className="printpage-btn" onClick={this.goPrint}>인쇄</div>
                        <label htmlFor="image-input" className="printpage-btn">로고 삽입</label>
                        <input type="file" name="logo" onChange={this.handleFileChange} id="image-input"/>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default PrintPage