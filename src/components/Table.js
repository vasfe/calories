import React from "react"
import { FiTrash2 } from 'react-icons/fi';

const container = {
    padding: 10,
    minWidth: 300,
    minHeight: 50,
    textAlign: 'center',
    border: '1.5px dashed #696969',
    borderRadius: 10
}

const Table = (props) => {
    return (
        <table style={container}>
            <thead>
                {props.headers.map(header => <th style={{ fontWeight: 'normal' }}>{header}</th>)}
            </thead>
            <tbody>
                {props.entries.map((entry, index) =>
                    <tr key={index}>
                        <td>
                            <div style={{ fontSize: 15 }}>{entry.grams}g</div>
                        </td>
                        <td>
                            {entry.text}
                        </td>
                        <td>
                            {entry.calories}
                        </td>
                        <td>
                            <FiTrash2
                                onClick={() => { props.onDelete(entry) }}
                            />
                        </td>
                    </tr>
                )}
                <tr>
                    {props.footers.map(footer => <td>{footer}</td>)}
                </tr>
            </tbody>
        </table>
    )
}
export default Table;