import React from 'react'

const InputScoreContent = ({name, grade, group, serial_no, onChange, value}) => {
    return(
        <div className="isc-container">
            <div className="isc-serial-num">{serial_no}</div>
            <div className="isc-studentinfo">{name} / {grade} / {group}</div>
            <input name={name} value={value} onChange={onChange} className="isc-scoreinput"/>
        </div>
    )
}

export default InputScoreContent