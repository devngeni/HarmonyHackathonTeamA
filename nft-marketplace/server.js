const express = require("express");
var bodyParser = require('body-parser')
require('dotenv').config();
const cors = require("cors");
const app = express();
var axios = require("axios");
const path = require('path');
const pinata = process.env.PINATA_JWT;
var fs = require('fs');
var FormData = require('form-data');

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connectPinata = async () => {
var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/testAuthentication',
  headers: { 
    'Authorization': `Bearer ${pinata}`
  }
};
const res = await axios(config)
console.log(res.data);
};

connectPinata();


app.post("/api/uploadNFT", async function (req, res){
  let file = req.body;
    res.json(file);

      // var info = JSON.stringify({
      //   "pinataOptions": {
      //     "cidVersion": 1
      //   }
      // });


  

  // await axios({
  //   method: "post",
  //   url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${pinata}`
  //   },
  //   data,
  //   info
  // }).then((res) => {
  //   const pinataUrl = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
  //   console.log(pinataUrl)
  // })
  //   .catch((err) => {
  //     console.log("Error ", err.message)
  //   })
  
 });

 app.listen(process.env.PORT || 8080);

