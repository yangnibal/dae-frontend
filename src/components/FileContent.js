import React from 'react'

const FileContent = ({name, subject, grade, group, link, update, remove, seeFiles}) => {
    return(
        <div className="filecontent-container">
            <div className="filecontent-text">{name}</div>
            <div className="filecontent-text">{subject}</div>
            <div className="filecontent-text">{grade}</div>
            <div className="filecontent-text">{group}</div>
            <a target="blank" className="filecontent-text" href={`https://docs.google.com/viewer?url=${link}`}>자료 보기</a>
        </div>
    )
}

export default FileContent