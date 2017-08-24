"use strict";

const fs = require('fs');

fs.readFile('Ambi.csv', 'utf8', async(error, invoiceData) => {
    if (error) throw error;
    const updatedData = await processItem(invoiceData);
    fs.writeFileSync('Ambi.csv', updatedData);
    console.log("done");
});


const processItem = (invoiceData) => {

    return new Promise((resolve, reject) => {
        try {
            let invoiceFile = invoiceData;
            const items = invoiceData.split("\n");
            for (const item of items) {
                const [itemName, itemQty, itemPrice] = item.split(",");
                const itemTotal = itemQty * itemPrice;
                const updatedItem = `${itemName},${itemQty},${itemPrice},${itemTotal}`;
                invoiceFile = invoiceFile.replace(item, updatedItem);
            }
            resolve(invoiceFile);
        } catch (err) {
            reject();
        }
    });
}