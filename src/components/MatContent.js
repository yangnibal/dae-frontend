import React from 'react'
import './Content.scss'

const MatContent = ({name, subject, grade, group, link}) => {
    return(
        <div className="matcontent-container">
            <a target="blank" href={link} className="matcontent-text">{name}</a>
            <div className="matcontent-text">{subject}</div>
            <div className="matcontent-text">{grade==="" ? "전체" : grade}</div>
            <div className="matcontent-text">{group}</div>
            <a href={link} target="blank" className="matcontent-text">해당 자료 보러가기</a>
        </div>
    )
}

export default MatContent