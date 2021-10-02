import React from 'react';
import Transfer from "../Transfer/Transfer";

function TransferPage(props) {
    // console.log(props)
    const transfer = props.location.transfer;
    return (
        // used a Transfer component as a PLACEHOLDER
        <Transfer transfer={transfer} />
    );
}



export default TransferPage;