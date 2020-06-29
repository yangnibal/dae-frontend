import React from 'react'

const FileContent = ({name, subject, grade, group, update, remove, seeFiles}) => {
    return(
        <div className="filecontent-container">
            <div className="filecontent-text">{name}</div>
            <div className="filecontent-text">{subject}</div>
            <div className="filecontent-text">{grade}</div>
            <div className="filecontent-text">{group}</div>
            <div className="filecontent-text" onClick={seeFiles}>자료 보기</div>
        </div>
    )
}

export default FileContent