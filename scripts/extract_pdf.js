/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2] || 'raw-data/Data visualization.pdf';
let dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('extracted_text.txt', data.text);
    console.log('Text extracted to extracted_text.txt');
}).catch(error => {
    console.error(error);
});
