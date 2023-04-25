import React, { useState, useEffect } from 'react';
import './App.css';

function Invoice() {
    const invoice = {
        invoiceTo: "Juan Dela Cruz",
        date: "2023-04-15",
        address1: "810 Oroquieta Street Sta Cruz 1000",
        address2: "Manila, Metro Manila, Philippines",
        invoiceNumber: "6845",
        paymentMode: "COD"
    };

    const [invoiceItems, setInvoiceItems] = useState([
        { description: "Mouse", Qty: 3, unitPrice: 200 },
        { description: "Keyboard", Qty: 3, unitPrice: 400 },
        { description: "Monitor", Qty: 6, unitPrice: 5400 },
        { description: "CPU Tower Case", Qty: 3, unitPrice: 1200 },
        { description: "Headset", Qty: 3, unitPrice: 500 },
        { description: "UPS", Qty: 1, unitPrice: 4000 },
    ]);

    //10 invoice number
    const paddedInvoiceNumber = invoice.invoiceNumber.padStart(10, "0");

    //Combine address1 and address2
    const address = `${invoice.address1}, ${invoice.address2}`;

    //Format date
    const date = new Date(invoice.date);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const displayInvoiceDetails = () => {
        return (
            <div id='invoice-details'>
                <strong>
                    <p>Invoice To:</p>
                </strong>
                <p>{invoice.invoiceTo}</p>
                <strong>
                    <p>Invoice Number:</p>
                </strong>
                <p>{paddedInvoiceNumber}</p>
                <strong>
                    <p>Date:</p>
                </strong>
                <p>{formattedDate}</p>
                <strong>
                    <p>Address:</p>
                </strong>
                <p>{address}</p>
                <strong>
                    <p>Payment Mode:</p>
                </strong>
                <p>{invoice.paymentMode}</p>
            </div>
        );
    };

    const addInvoiceItem = () => {
        setInvoiceItems([
          ...invoiceItems, 
          { 
            description: "", 
            Qty: 0, 
            unitPrice: 0 
          }
        ]);
        const itemIndex = invoiceItems.length; 
        const itemDescriptionInput = document.getElementById(`description${itemIndex}`); 
        if (itemDescriptionInput) {
          itemDescriptionInput.focus();
        }
      };

    const removeInvoiceItem = (index) => {
        const newInvoiceItems = [...invoiceItems];
        newInvoiceItems.splice(index, 1);
        setInvoiceItems(newInvoiceItems);
    };

    const updateInvoiceItem = (index, field, value) => {
        const newInvoiceItems = [...invoiceItems];
        newInvoiceItems[index][field] = value;
        setInvoiceItems(newInvoiceItems);
    };

    const displayInvoiceTable = () => {
        let tableHTML = `
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
        `;
    
        let totalAmount = 0;
        invoiceItems.forEach((item, index) => {
          const amount = item.Qty * item.unitPrice;
          totalAmount += amount;
          tableHTML += `
              <tr>
                <td>
                  <input type='text'
                         id='description${index}' 
                         name='description${index}' 
                         value='${item.description}' 
                         onChange={updateInvoiceItem}/>
                </td>
                <td>
                  <input type='number'
                         id='qty${index}' 
                         name='qty${index}' 
                         value='${item.Qty}' 
                         onChange={updateInvoiceItem}/>
                </td>
                <td>
                  <input type='number'
                         id='unitPrice${index}' 
                         name='unitPrice${index}' 
                         value='${item.unitPrice}' 
                         onChange={updateInvoiceItem}/>
                </td>
                <td>${amount}</td>
                
            `;
        });
    
        tableHTML += `
              <tr>
                <td colspan='3' class='text-right'>Total:</td>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
        `;
        return <div id='invoice-table' dangerouslySetInnerHTML={{ __html: tableHTML }}></div>;
      };

    useEffect(() => {
        displayInvoiceDetails();
        displayInvoiceTable();
    }, []);

    return (
        <div className='invoice-container'>
            <div className='header'>
                <h1>Invoice</h1>
            </div>
            <div id='add-invoice-item'>
                {displayInvoiceDetails()}
                {displayInvoiceTable()}
                <button onClick={() => addInvoiceItem()}>Add Item</button>
                <button onClick={() => removeInvoiceItem()}>Remove</button>
            </div>
        </div>
    );
};

export default Invoice;