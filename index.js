const generateButton = document.getElementById("generate-btn");
const nameInput = document.getElementById("name");
const{rgb} = PDFLib;
const generatePdf = async (nameText) => {
   const template = await fetch("./certificate-template.pdf").then((res) => {return res.arrayBuffer()}
  );
  console.log(template);
  const fontBytes = await fetch("/Sanchez-Regular.ttf").then((res) => res.arrayBuffer());
  const pdf = await PDFLib.PDFDocument.load(template)
  pdf.registerFontkit(fontkit)
  const myFont = await pdf.embedFont(fontBytes)
  const page = (pdf.getPages())[0]
  page.drawText(nameText ? nameText : "sample text",{
      x: (nameText.length > 5) ? (280) - ((nameText.length - 5) * 8) : 280,
      y: 350,
      size: 32,
      font: myFont,
      align: 'center',
      color: rgb(0.2, 0.84, 0.65)
  })
  const newPdfBytes = await pdf.save()
  console.log(newPdfBytes);
  saveByteArray(`${nameText}-certificate`, newPdfBytes)
}

const saveByteArray = (fileName, byte) => {
  const blob = new Blob([byte], {type: 'application/pdf'});
  const file = {}

  file.href = window.URL.createObjectURL(blob);
  file.filename = fileName;

  saveAs(file.href, file.filename);
}
async function onGenerateButtonClick(name) {
    console.log(name);

    await generatePdf(name);

};
