import React from 'react'
import Select from 'react-select'
import './DropDown.scss'

const DropDown = ({option, className, isClearable, isSearchable, onChange, classNamePrefix, placeholder, onClick}) => {
    return (
        <Select
            onChange={onChange}
            options={option}
            className={className}
            classNamePrefix={classNamePrefix}
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={placeholder}
            onClick={onClick}
            styles={{
                placeholder: base => ({
                    ...base,
                    fontSize: '1rem',
                    color: 'white'
                })
            }}
        />
    )
}

export default DropDown