import React from 'react'

const GradeContent = ({name, grade, group, score, percent, rank, rating, gradeModify, gradeRemove, movePrintPage}) => {
    return(
        <div className="gradecontent-container">
            <div className="gradecontent-name">{name} / {grade} / {group}</div>
            <div className="gradecontent-score">{score}</div>
            <div className="gradecontent-percent">{percent}</div>
            <div className="gradecontent-rank">{rank}</div>
            <div className="gradecontent-rating">{rating}</div>
            <div className="gradecontent-table">
                <div className="table" onClick={movePrintPage}>성적표</div>
            </div>
            <div className="gradecontent-modify-remove">
                <span className="gradecontent-modify" onClick={gradeModify}>수정&nbsp;</span>/
                <span className="gradecontent-remove" onClick={gradeRemove}>&nbsp;삭제</span>
            </div>
        </div>
    )
}

export default GradeContent