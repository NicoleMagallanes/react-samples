import React from 'react';
import './App.css';

function Invoice() {
    const invoice = {
        invoiceTo: 'Juan Dela Cruz',
        date: '2023-04-15',
        address1: '810 Oroquieta Street Sta Cruz 1000',
        address2: 'Manila, Metro Manila, Philippines',
        invoiceNumber: '6845',
        paymentMode: 'COD',
    };

    const invoiceItems = [
        { description: 'Mouse', Qty: 3, unitPrice: 200 },
        { description: 'Keyboard', Qty: 3, unitPrice: 400 },
        { description: 'Monitor', Qty: 6, unitPrice: 5400 },
        { description: 'CPU Tower Case', Qty: 3, unitPrice: 1200 },
        { description: 'Headset', Qty: 3, unitPrice: 500 },
        { description: 'UPS', Qty: 1, unitPrice: 4000 },
    ];

    // Machine Problem 1

    // 10 invoice number
    const paddedInvoiceNumber = invoice.invoiceNumber.padStart(10, '0');

    // Combine address1 and address2
    const address = `${invoice.address1}, ${invoice.address2}`;

    // Format date
    const date = new Date(invoice.date);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // Display invoice details
    function displayInvoiceDetails() {
        const paddedInvoiceNumber = invoice.invoiceNumber.toString().padStart(10, '0');
        const formattedDate = new Date(invoice.date).toLocaleDateString('en-GB');
        const address = `${invoice.address1}, ${invoice.address2}`;

        return (
            <div className="invoice-container">
                <div className="header">
                    <h1>Invoice</h1>
                </div>
                <div id="invoice-details">
                    <strong>
                        <p>Invoice To: {invoice.invoiceTo}</p>
                        <strong>
                            <p>Invoice Number: {paddedInvoiceNumber}</p>
                        </strong>
                        <strong>
                            <p>Date: {formattedDate}</p>
                        </strong>
                        <strong>
                            <p>Address: {address}</p>
                        </strong>
                        <strong>
                            <p>Payment Mode: {invoice.paymentMode}</p>
                        </strong>
                    </strong>
                </div>
                <div id="invoice-table"></div>
            </div>
        );
    }

    // Machine Problem 2

    //Calculate total amount
    let totalAmount = 0;
    let table = "";
    for (let i = 0; i < invoiceItems.length; i++) {
        let item = invoiceItems[i];
        let amount = item.Qty * item.unitPrice;
        totalAmount += amount;
        table += `${item.description} | ${item.Qty} | ${item.unitPrice} | ${amount}\n`;
    }

    //Add total row to the table
    table += `Total | | | ${totalAmount}`;

    //Display the table
    function displayInvoiceTable() {
        const invoiceTable = document.getElementById("invoice-table");
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
        invoiceItems.forEach((item) => {
            const amount = item.Qty * item.unitPrice;
            totalAmount += amount;
            tableHTML += `
      <tr>
        <td>${item.description}</td>
        <td>${item.Qty}</td>
        <td>${item.unitPrice}</td>
        <td>${amount}</td>
      </tr>
    `;
        });
        tableHTML += `
      <tr>
        <td colspan="3" class="text-right">Total:</td>
        <td>${totalAmount}</td>
      </tr>
    </tbody>
  </table>
  `;

        invoiceTable.innerHTML = tableHTML;
    }

    return (
        <div>
            <div>{displayInvoiceDetails()}</div>
            <div>{displayInvoiceTable()}</div>
        </div>
    );

}
export default Invoice;