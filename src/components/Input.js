import React from "react"
import { IoMdAdd } from 'react-icons/io';

const container = {
    display: 'flex',
    alignItems: 'center',
    border: "1px solid #696969",
    borderRadius: 5,
    marginBottom: 10,
    padding: 5
}

const input = {
    fontSize: 20,
    borderWidth: 0,
    maxWidth: 200,
    background: 'white',
    outline: 'none'
}

const Input = (props) => {
    const options = []

    for (let i = props.selectMin; i <= props.selectMax; i += props.selectIncrement) {
        options.push(<option key={i} value={i}>{i}g</option>)
    }

    return (
        <div style={container}>
            <input
                style={input}
                type="search"
                placeholder={props.inputPlaceholder}
                value={props.inputValue}
                onChange={e => { props.onInputChange(e.target.value) }}
                disabled={props.disabled}
            >
            </input>
            <select
                style={input}
                value={props.selectValue}
                disabled={props.disabled}
                onChange={e => { props.onSelectChange(e.target.value) }}
            >
                {options}
            </select>
            <button
                disabled={props.disabled}
                onClick={() => props.onClick()}
                style={input}
            >
                <IoMdAdd
                    style={{ height: '100%', width: 20 }}
                />
            </button>
        </div>
    )
}
export default Input;