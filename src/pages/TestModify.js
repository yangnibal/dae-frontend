import React from 'react'
import './NewTest.scss'
import Header from '../components/Header';
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios'
import DropDown from '../components/DropDown'

@inject('store')
@observer
class NewTest extends React.Component{
    @observable schoolyear = ""
    @observable test_type = ""
    @observable subject = ""
    @observable average = ""
    @observable std_dev = ""
    @observable cand_num = ""
    @observable additional_info = ""
    @observable path = ""


    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action testTypeChange = (e) => {
        this.test_type = e.value
    }
    @action init_data = () => {
        const { store } = this.props
        this.schoolyear = ""
        this.test_type = ""
        this.subject = ""
        this.average = ""
        this.std_dev = ""
        this.cand_num = ""
        this.additional_info = ""
        store.testinfo = {}
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action cancleModify = () => {
        this.init_data()
        this.props.history.goBack()
    }
    @action addTest = (schoolyear, test_type, subject, average, std_dev, cand_num, additional_info) => {
        const { store } = this.props
        if(schoolyear!=="" && test_type!=="" && subject!=="" && average!=="" && std_dev!=="" && cand_num!=="" && additional_info!==""){
            axios.patch("https://api.daeoebi.com/tests/" + this.path + "/", ({
                grade: schoolyear,
                test_type: test_type,
                subject: subject,
                average: average,
                std_dev: std_dev,
                cand_num: cand_num,
                additional_info: additional_info,
            }), {
                headers: {
                    Authorization: "Token " + store.getToken()
                }
            })
            .then(res => {
                this.init_data()
                this.props.history.goBack()
            })
            .catch(err => {
                
            })
        } else {
            alert("입력창을 확인해 주시기 바랍니다.")
        }
    }

    componentDidMount(){
        const { store } = this.props;
        var path = window.location.href
        this.path = path.split("/")[5]
        const doSomething = () => {
            axios.get("https://api.daeoebi.com/tests/" + this.path + "/", {
                headers: {
                    Authorization: "Token " + store.getToken()
                }
            })
            .then(res => {
                this.schoolyear = res.data['grade']
                this.test_type = res.data['test_type']
                this.subject = res.data['subject']
                this.std_dev = res.data['std_dev']
                this.cand_num = res.data['cand_num']
                this.subject = res.data['subject']
                this.average = res.data['average']
                this.additional_info = res.data['additional_info']
            })
            .catch(err => {
                console.log(err)
            })
        }
        store.caniuse(2, doSomething)
    }

    render(){
        const { store } = this.props;
        return(
            <div className="newtest-container">
                <Header/>
                <div className="newtest-content-container">
                    <div className="newtest-content-title">TEST 기본 정보 입력</div>
                    <DropDown placeholder="학년 선택" option={store.schoolyear} className="newtest-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <input name="test_type" value={this.test_type} onChange={this.handleChange} className="newtest-content-input" placeholder="test 종류 입력"/>
                    <input name="subject" value={this.subject} onChange={this.handleChange} className="newtest-content-input" placeholder="과목 선택"/>
                    <input name="additional_info" value={this.additional_info} onChange={this.handleChange} className="newtest-content-input" placeholder="TEST 추가 정보 입력(학교 등)"/>
                    <input name="average" value={this.average} onChange={this.handleChange} className="newtest-content-input" placeholder="평균 입력"/>
                    <input name="std_dev" value={this.std_dev} onChange={this.handleChange} className="newtest-content-input" placeholder="표준편차 입력"/>
                    <input name="cand_num" value={this.cand_num} onChange={this.handleChange} className="newtest-content-input" placeholder="응시자 수 입력"/>
                    <div className="newtest-content-btn-container">
                        <div className="newtest-content-btn" onClick={() => this.addTest(this.schoolyear, this.test_type, this.subject, this.average, this.std_dev, this.cand_num, this.additional_info)}>수정</div>
                        <div className="newtest-content-btn" onClick={() => this.cancleModify()}>취소</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewTest