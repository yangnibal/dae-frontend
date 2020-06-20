import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import DropDown from '../components/DropDown'
import Header from '../components/Header'
import axios from 'axios'
import './VidList.scss'
import VidContent from '../components/VidContent';

@inject('store')
@observer
class VidList extends React.Component{

    @observable vids = []
    @observable schoolyear = ""
    @observable subject = ""
    @observable group = ""
    
    @action watchVid = (id) => {
        this.props.history.push(`/inf/vid/${id}`)
    }
    @action watchSavedVid = (id) => {
        this.props.history.push(`/inf/savedvid/${id}`)
    }
    @action schoolyearChange = (e) => {
        this.schoolyear = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action getGroup = () => {
        const { store } = this.props
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        const group = []
        axios.get("https://api.daeoebi.com/infgroups/", {
            headers: {
                Authorization: "Token " + token
            }
        })
        .then(res => {
            var data = res.data['results']
            for(var i in data){
                group.push({value: data[i]['name'], label: data[i]['name']})
            }
            store.infgroup = group
        })
        .catch(err => {
            
        })
    }
    @action findVid = (subject, grade, group) => {
        const { store } = this.props
        axios.post("https://api.daeoebi.com/videos/findvid/", ({
            grade: grade,
            subject: subject,
            group: group
        }), {
            headers: {
                Authorization: "Token " + store.getToken()
            }
        })
        .then(res => {
            this.vids = res.data
        })
        .catch(err => {
            
        })
    }

    componentDidMount(){
        const ltoken = localStorage.getItem('token')
        const stoken = sessionStorage.getItem('token')
        var token = ""
        if(stoken===null){
            token = ltoken
        } else {
            token = stoken
        }
        axios.post("https://api.daeoebi.com/users/caniuse/", ({
            type: 1
        }), {
            headers: {
                Authorization: "Token "+token
            }
        })
        .then(res => {
            if(res.data==="canuseit"){
                axios.get("https://api.daeoebi.com/videos", {
                    headers: {
                        Authorization: "Token " + token
                    }
                })
                .then(res => {
                    this.vids = res.data['results']
                    this.getGroup()
                })
                .catch(err => {
                    
                })
            } else {
                alert("접근 권한이 없습니다")
                this.props.history.goBack()
            }
        })
    }

    render(){
        const { store } = this.props
        const vidlist = this.vids.map(vid => (
            <VidContent
                name={vid.name}
                grade={vid.grade}
                group={vid.group}
                subject={vid.subject}
                key={vid.id}
                watchVid={() => {this.watchVid(vid.id)}}
            />
        ))
        return(
            <div className="vid-container">
                <Header/>
                <div className="vid-sticky">
                    <div className="vid-header">
                        <div className="vid-header-left">    
                            <div className="vid-header-title">동영상 LIST</div>
                            <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.infgroup} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="vid-header-search-btn" onClick={() => this.findVid(this.subject, this.schoolyear, this.group)}>검색</div>
                        </div>
                    </div>
                    <div className="vid-body">
                        <div className="vid-body-header">
                            <div className="vid-body-header-text">동영상 이름</div>
                            <div className="vid-body-header-text">과목</div>
                            <div className="vid-body-header-text">추천 학년</div>
                            <div className="vid-body-header-text">그룹</div>
                        </div>
                        <div className="vid-content-body">
                            <VidContent name="대외비원패스오티" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("ot")}/>
                            <VidContent name="1강 평가의 본질" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("1")}/>
                            <VidContent name="2강 성적표 속의 비밀" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("2")}/>
                            <VidContent name="3강 슬기로운 학교생활 초안" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("3")}/>
                            <VidContent name="4강 학원 시간표 전략" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("4")}/>
                            <VidContent name="5강 수학학습전략" grade="전체" group="비교과" subject="대외비1PASS" watchVid={() => this.watchSavedVid("5")}/>
                            {vidlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VidList