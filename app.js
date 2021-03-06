"use strict";

/**
 * Invoice Updater module.
 * @module InvoiceUpdater
 */
/**
 * This code requires the fs module
 * @requires module:fs
 */
const fs = require('fs');

/**
 * Reading a directory using module fs
 * @callback readdir - Handles the files in directory
 * @param {path} path - Location of directory.
 * @param {error} err - for detection of error  
 * @param {string} files - files in the directory
 */
fs.readdir("./data/", (err, files) => {
    for (const file of files) {
        /**
         * This is a callback 
         * @callback readFile - Handles the processing in each files
         * @param {string} file - File in the directory
         * @param {string} encoding - Encoding type 
         * @param {error} error - Error Exception
         * @param {string} invoiceData - contents of the file
         */

         /**
          *async can be used in nodeJS V7.5+
          * @since 7.5.0
          */
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
            const items = invoiceData.split("\r\n");
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