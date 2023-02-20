

let fileInput1 = document.querySelector(".default-file-input");

const idData = [];
const vencodeData = [];
const prodcatData = [];
const proddescData = [];
const countData = [];
const costData = [];
const currencyData = [];
const expdateData = [];

const uploadconfirm = document
  .getElementById("uploadconfirm")
  .addEventListener("click", () => {
    Papa.parse(fileInput1.files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        for (i = 0; i < results.data.length; i++) {
          idData.push(results.data[i].ID);
          vencodeData.push(results.data[i].VendorCode);
          prodcatData.push(results.data[i].ProductCategory);
          proddescData.push(results.data[i].ProductDescription);
          countData.push(results.data[i].Count);
          costData.push(results.data[i].Cost);
          currencyData.push(results.data[i].Currency);
          expdateData.push(results.data[i].ProductExpDate);
        }
        
        console.log(idData);
        console.log(vencodeData);
        console.log(prodcatData);
        console.log(proddescData);
        console.log(countData);
        console.log(costData);
        console.log(currencyData);
        console.log(expdateData);
      },
    });
  });
