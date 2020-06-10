import React from 'react'

const TestContent = ({grade, test_type, subject, additional_info, average, std_dev, cand_num, student, testModify, testRemove, addTestStudent, nameClick}) => {
    return(
        <div className="testcontent-container">
            <div className="testcontent-test-sort" onClick={nameClick}>{grade}/{test_type}/{subject}/{additional_info}</div>
            <div className="testcontent-average">{average}</div>
            <div className="testcontent-std-dev">{std_dev}</div>
            <div className="testcontent-cand-num">{cand_num}</div>
            <div className="testcontent-student" onClick={addTestStudent}>{student}</div>
            <div className="testcontent-modify-remove">
                <span className="testcontent-modify" onClick={testModify}>수정</span>/
                <span className="testcontent-remove" onClick={testRemove}>삭제</span>
            </div>
        </div>
    )
}

export default TestContent