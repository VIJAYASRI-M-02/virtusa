const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const fs = require("fs");
const utf8 = require("utf8");
const Papa = require("papaparse");
const fileUpload = require("express-fileupload");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM("uploadFile.html").window.document;
global.document = new JSDOM("displayDetails.html").window.document;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
const path = require("path");
const connection = require("../public/database");
const { log } = require("console");
const { isBuffer } = require("util");

const statpath = path.join(__dirname, "../public");

app.use("/", express.static(statpath));

connection.connect((err) => {
  if (err) throw err;
  console.log("db connected");
});
app.use(fileUpload());
app.post("/extract-data", (req, res) => {
  const c = utf8.encode(String(req.files.csvFile.data));

  let j = c.split(/\r?\n/);
  for (let i = 1; i < j.length; i++) {
    arr = j[i].split(",");
    let id = arr[0];
    let vendorCode = arr[1];
    let productCat = arr[2];
    let productDesc = arr[3];
    let count = arr[4];
    let cost = arr[5];
    let curr = arr[6];
    let prodExp = arr[7];
    console.log(
      id,
      vendorCode,
      productCat,
      productDesc,
      count,
      cost,
      curr,
      prodExp
    );
    /*var query1="INSERT into body (vendor_code,prod_cat,prod_desc,count_of_prod,cost_of_prod,currency,prod_exp) values(?,?,?,?,?,?,?)";
      var values=[vendorCode,productCat,productDesc,count,cost,curr,prodExp];
      connection.query(query1,values,(err,res)=>{
        if(err) throw err;
        console.log("successfully inserted one record");
      });*/
  }

  /*
    Papa.parse(req.files.csvFile, {
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
      }).then(result=>{
        console.log(result);
      });*/
});

//set views file

app.set('views',path.join(__dirname,'../public'));

//view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname, "../public"),
  };
  var fileName = "uploadFile.html";
  res.sendFile(fileName, options, (err) => {
    if (err) throw err;
    console.log("sent:", fileName);
  });
});

app.get("/displayDetails", (req, res) => {
  /*var options = {
    root: path.join(__dirname, "../public"),
  };
  var fileName = "displayDetails.html";
  res.sendFile(fileName, options, (err) => {
    if (err) throw err;*/


    let query2 = "select * from body";
    connection.query(query2, (err, rows) => {
      if (err) throw err;
      res.render('displayDetails',{
        title:'displaydetails',
        user: rows
      });
    })
  //});
});

app.listen(3000, () => {
  console.log("App is listening...");
  console.log(__dirname);
});
