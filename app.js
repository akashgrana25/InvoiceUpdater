"use strict";

const fs = require('fs');

fs.readdir("./data/", (err, files) => {
    for (const file of files) {
        fs.readFile(`./data/${file}`, 'utf8', async(error, invoiceData) => {
            if (error) throw error;
            const updatedData = await processItem(invoiceData);
            fs.writeFileSync(`./data/${file}`, updatedData);
        });
    }
});

/**
 * Process Invoice Item
 *
 * @param {string} invoiceData contents of invoice file.
 * @returns {string} updated contents of the invoice file.
 */
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
            reject(err);
        }
    });
}