# Invoice Updater

Invoice updater is a code snippet to calculate cost for multiple products in bulk quantity.

### Tech

> InvoiceUpdater code makes use of Node native Promises that is an Aynchronous flow managenent pattern.

> The core component of a promise object is its then method. The then method is how we get the return value 
(known as the fulfillment value) or the exception thrown (known as the rejection reason) from an asynchronous operation.

>Here in this project instead of using native promises I have made use of async and await. 


### Installation

Invoice Updater requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies.

```sh
$ cd InvoiceUpdater
$ npm install -d
```	

### Development

Initially make sure that the .csv files in the data folder are unprocessed data files.

Run the command:

```sh
 $ node app.js
 ```

Check the data folder for the processed .csv files.
