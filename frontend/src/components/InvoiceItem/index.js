import { useState } from 'react'
import './index.css'
const InvoiceItem = (props) =>{
    const {invoiceDetails} = props
    const {sn_no,amount,dueDate,email,status} = invoiceDetails 
    return (
        <div className="each_invoice_bg_container">
            <p className='sn_no attribute'>{sn_no}</p>
            <p className='invoice_id attribute'>{}</p>
            <p className='email attribute'>{email}</p>
            <p className='amount attribute'>{amount}</p>
            <p className='status attribute'>{status}</p>
            <p className='due_date attribute'>{dueDate}</p>            
        </div>    
        )
}

export default InvoiceItem