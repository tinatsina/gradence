const pdfmake = require('pdfmake');

const docDefinition = {
  content: [
    'First paragraph',
    'Another paragraph, this  this line will be divided into at least two lines',
  ],
};

const now = new Date();

const pdf = pdfmake.createPdf(docDefinition);
pdf.write('pdfs/basics.pdf').then(() => {
  console.log(new Date() - now);
}, (err) => {
  console.error(err);
});
