import React from 'react'

export default function Transfer(props) {
    return (
        <div>
            <span>{props.from}</span>
            <span>{props.to}</span>
            <span>{props.date}</span>
            <span>{props.email}</span>
            <span>{props.places}</span>
        </div>
    )
}