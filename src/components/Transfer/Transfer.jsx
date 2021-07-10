import React from 'react'
import './Transfer.css'

export default function Transfer({transfer}) {
    return (
        <div>
            <span>{transfer.from}</span>
            <span>{transfer.to}</span>
            <span>{transfer.date}</span>
            <span>{transfer.email}</span>
            <span>{transfer.places}</span>
        </div>
    )
}