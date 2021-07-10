import React from 'react'
import Transfer from "../Transfer/Transfer";

export default function TransfersList({transfers}) {
    // const transfers = props.props
    console.log('transfers: ', transfers)
    return (
        <div>
            {transfers.map(transfer => <Transfer key={transfer.id} transfer={transfer}/>)}
        </div>
    )
}