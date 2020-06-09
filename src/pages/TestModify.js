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
        this.props.history.push("/ac/test")
    }
    @action addTest = (schoolyear, test_type, subject, average, std_dev, cand_num, additional_info) => {
        const { store } = this.props
        const testinfo = store.testinfo
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        if(schoolyear!=="" && test_type!=="" && subject!=="" && average!=="" && std_dev!=="" && cand_num!=="" && additional_info!==""){
            axios.patch("http://api.daeoebi.com/tests/" + testinfo.id + "/", ({
                grade: schoolyear,
                test_type: test_type,
                subject: subject,
                average: average,
                std_dev: std_dev,
                cand_num: cand_num,
                additional_info: additional_info,
            }), {
                headers: {
                    Authorization: "Token " + token
                }
            })
            .then(res => {
                this.init_data()
                this.props.history.push("/ac/test/")
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            alert("입력창을 확인해 주시기 바랍니다.")
        }
    }

    componentDidMount(){
        const { store } = this.props;
        const testinfo = store.testinfo
        this.schoolyear = testinfo.schoolyear
        this.test_type = testinfo.test_type
        this.subject = testinfo.subject
        this.additional_info = testinfo.additional_info
        this.average = testinfo.average
        this.std_dev = testinfo.std_dev
        this.cand_num = testinfo.cand_num
    }

    render(){
        const { store } = this.props;
        return(
            <div className="newtest-container">
                <Header/>
                <div className="newtest-content-container">
                    <div className="newtest-content-title">TEST 기본 정보 입력</div>
                    <DropDown placeholder="학년 선택" option={store.schoolyear} className="newtest-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="TEST 종류 선택" option={store.semester} className="newtest-content-dropdown" classNamePrefix="react-select" onChange={this.testTypeChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
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