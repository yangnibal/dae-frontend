import React from 'react'
import Header from '../components/Header'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
import axios from 'axios'
import './PrintPage.scss'
import Print from '../components/Print'
import printJS from 'print-js'

@inject('store')
@observer
class PrintPage extends React.Component{

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
        const img = localStorage.getItem("img")
        setTimeout(() => {
            printJS({
                printable: img,
                type: "image"
            })
        }, 1000)
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        localStorage.removeItem("img")
    }

    render(){
        const img = localStorage.getItem("img")
        return(
            <div className="printpage-container">
                <Header/>
                <div className="printpage-sticky">
                    <div className="printpage-btns">
                        <div className="printpage-btn" onClick={this.goPrint}>인쇄</div>
                        <div className="printpage-btn">로고 삽입</div>
                    </div>
                    <div className="printpage-preview">
                        <div className="printpage-text">성적표 미리보기</div>
                        <div className="preview">
                            <img src={img} alt={img} width="300px" height="424.2px"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrintPage