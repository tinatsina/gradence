const pdfmake = require('pdfmake');

const docDefinition = {
  content: [
    'First paragraph',
    'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
  ],
};

const pdf = pdfmake.createPdf(docDefinition);
pdf.write('pdfs/basics.pdf').then(() => {
}, (err) => {
  throw new Error(err);
});
