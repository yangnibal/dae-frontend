import React from 'react'

const FileContent = ({name, subject, grade, group, link, update, remove, seeFiles}) => {
    return(
        <div className="filecontent-container">
            <a target="blank" href={link.charAt(link.length - 1)==="f" ? `/web/viewer.html?file=${encodeURIComponent(link)}` : link.charAt(link.length - 1)==="p" ? link : "https://docs.google.com/viewer?url=" + link} className="filecontent-text">{name}</a>
            <div className="filecontent-text">{subject}</div>
            <div className="filecontent-text">{grade}</div>
            <div className="filecontent-text">{group}</div>
            <a download target="blank" className="filecontent-text" href={link.charAt(link.length - 1)==="f" ? `/web/viewer.html?file=${encodeURIComponent(link)}` : link.charAt(link.length - 1)==="p" ? link : "https://docs.google.com/viewer?url=" + link}>자료 보기</a>
        </div>
    )
}

export default FileContent