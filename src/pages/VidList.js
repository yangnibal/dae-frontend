import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import DropDown from '../components/DropDown'
import Header from '../components/Header'
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

    componentDidMount(){
        const { store } = this.props
        store.getVids()
    }

    render(){
        const { store } = this.props
        const vidlist = store.vids.map(vid => (
            <VidContent
                name={vid.name}
                grade={vid.grade}
                group={vid.group}
                subject={vid.subject}
                time={vid.time}
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
                            <span className="mobile-separator">
                                <DropDown placeholder="과목" option={store.subject} className="test-content-dropdown-third" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <DropDown placeholder="학년" option={store.schoolyear} className="test-content-dropdown-first" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <DropDown placeholder="그룹" option={store.infgroup} className="test-content-dropdown-second" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                                <div className="vid-header-search-btn" onClick={() => store.findVid(this.subject, this.schoolyear, this.group)}>검색</div>
                            </span>
                        </div>
                    </div>
                    <div className="vid-body">
                        <div className="vid-body-header">
                            <div className="vid-body-header-text">동영상 이름</div>
                            <div className="vid-body-header-text">과목</div>
                            <div className="vid-body-header-text">추천 학년</div>
                            <div className="vid-body-header-text">그룹</div>
                            <div className="vid-body-header-text">재생 시간</div>
                        </div>
                        <div className="vid-content-body">
                            <VidContent name="대외비원패스오티" grade="전체" group="비교과" subject="대외비1PASS" time="05:43" watchVid={() => this.watchSavedVid("ot")}/>
                            <VidContent name="1강 평가의 본질" grade="전체" group="비교과" subject="대외비1PASS" time="46:51" watchVid={() => this.watchSavedVid("1")}/>
                            <VidContent name="2강 성적표 속의 비밀" grade="전체" group="비교과" subject="대외비1PASS" time="42:32" watchVid={() => this.watchSavedVid("2")}/>
                            <VidContent name="3강 슬기로운 학교생활 초안" grade="전체" group="비교과" subject="대외비1PASS" time="33:22" watchVid={() => this.watchSavedVid("3")}/>
                            <VidContent name="4강 학원 시간표 전략" grade="전체" group="비교과" subject="대외비1PASS" time="36:39" watchVid={() => this.watchSavedVid("4")}/>
                            <VidContent name="5강 수학학습전략" grade="전체" group="비교과" subject="대외비1PASS" time="37:47" watchVid={() => this.watchSavedVid("5")}/>
                            {vidlist}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VidList