import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'

@inject('store')
@observer
class NewMat extends React.Component{
    render(){
        const { store } = this.props
        return(
            <div className="newstudent-container">
                <Header/>
                <div className="newstudent-content-container">
                    <div className="newstudent-content-title">1급 정보 세부 항목 입력</div>
                    <input name="name" className="newstudent-content-input" placeholder="자료 이름"/>
                    <input name="link" className="newstudent-content-input" placeholder="자료 링크"/>
                    <input name="subject" className="newstudent-content-input" placeholder="자료 활용 과목"/>
                    <DropDown placeholder="자료 활용 학년" option={store.schoolyear} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <DropDown placeholder="자료 그룹 지정" option={store.semester} className="newstudent-content-dropdown" classNamePrefix="react-select" onChange={this.testTypeChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                    <div className="newstudent-content-group-add-container">
                        <Link to="/inf/group/new" className="newstudent-content-group-add">그룹 추가</Link>
                    </div>
                    <div className="newstudent-content-btn-container">
                        <div className="newvid-content-btn" onClick={() => this.addTest(this.schoolyear, this.test_type, this.subject, this.average, this.std_dev, this.cand_num, this.additional_info, false)}>등록</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewMat