import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../components/Header'
import FileContent from '../components/FileContent'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import DropDown from '../components/DropDown'
import axios from 'axios'
import './File.scss'

@inject('store')
@observer
class FileList extends React.Component{

    @observable grade = ""
    @observable subject = ""
    @observable group = ""

    @action schoolyearChange = (e) => {
        this.grade = e.value
    }
    @action subjectChange = (e) => {
        this.subject = e.value
    }
    @action groupChange = (e) => {
        this.group = e.value
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    
    @action seeFiles = (id) => {
        this.props.history.push(`/inf/file/${id}`)
    }

    componentDidMount(){
        const { store } = this.props
        store.getFiles()
        store.getInfGroup()
    }

    render(){
        const { store } = this.props
        const filelist = store.files.map(file => (
            <FileContent
                name={file.name}
                subject={file.subject}
                grade={file.grade}
                group={file.group}
                key={file.id}
                link={file.file.slice(55)}
                remove={() => this.remove(file.id)}
                update={() => this.update(file.id)}
                seeFiles={() => this.seeFiles(file.id)}
            />
        ))
        return(
            <div className="file-container">
                <Header/>
                <div className="file-sticky">
                    <div className="file-header">
                        <div className="file-header-left">
                            <div className="file-header-title">파일 출력 가능 자료 LIST</div>
                            <DropDown placeholder="과목" option={store.subject} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.subjectChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="학년" option={store.schoolyear} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.schoolyearChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <DropDown placeholder="그룹" option={store.infgroup} className="file-header-dropdown" classNamePrefix="react-select" onChange={this.groupChange} isClearable={this.isClearable} isSearchable={this.isSearchable}/>
                            <div className="file-header-search-btn" onClick={() => store.findfile(this.subject, this.grade, this.group)}>검색</div>
                        </div>
                    </div>
                    <div className="file-body">
                        <div className="file-body-header">
                            <div className="file-body-header-text">자료 이름</div>
                            <div className="file-body-header-text">과목</div>
                            <div className="file-body-header-text">추천 학년</div>
                            <div className="file-body-header-text">그룹</div>
                        </div>
                        <div className="file-body-content">
                            {filelist}
                        </div>
                        <div className="file-footer">
                            <Link to="/inf/vid" className="file-footer-content">[동영상 자료]이동</Link>
                            <Link to="/inf/mat" className="file-footer-content">[인터넷 검색 자료]이동</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileList