import React, { useState} from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { ethers, Contract, providers, utils } from "ethers";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";

const CreateNFT = () => {
    const [formParams, updateFormParams] = useState({
        name: "",
        description: "",
        price: "",
      });

const [fileURL, setFileURL] = useState(null);
const [message, updateMessage] = useState("");

 async function handleChange(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;
    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };
    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

 const handleSubmission = async (e) => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  e.preventDefault();
      //Upload data to IPFS
      try {
        const metadataURL = await uploadMetadataToIPFS();
        //  const provider
        //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        abi,
        signer
      );
        //massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(formParams.price, "ether");
        let listingPrice = await contract.getListPrice();
        listingPrice = listingPrice.toString();
        //actually create the NFT
        let transaction = await contract.createToken(metadataURL, price, {
          value: listingPrice,
        });
        await transaction.wait();
        updateMessage("Please wait.. uploading (upto 5 mins)");
        alert("Successfully listed your NFT!");
        updateMessage("");
        updateFormParams({ name: "", description: "", price: "" });
        window.location.replace("/explore");
      } catch (e) {
        updateMessage("failed, please fill all fields...");
        alert(e);
      }

 }
 
    return (
        <div className="createNft">
            <h1>Create Your NFT</h1>
                
                    <div className='inputname'>Name
                        <input type="text" className="inputSpace" name="nftName" size="70" placeholder="Item Name" id="name" value={formParams.name} onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }></input>
                    </div>
                    <div className='inputname'>Price
                        <input type="text" className="inputSpace" name="nftPrice" placeholder="amount(in ETH)"id="price" value={formParams.price} onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }></input>
                    </div>
                    <div className='inputname'>Description
                        <textarea rows="4" className="inputSpace" name="nftDescription" id="description" value={formParams.description} onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })} ></textarea>
                    </div>
                    <div className='inputname'>Upload
                    <div style={{border:'2px dotted grey', height: '100px', width: '100%'}}>
                    <input type="file" className="inputSpace" name="nftfile" value={formParams.file} onChange={handleChange}></input>
                    </div>
                    </div>
                    <button className='createNftBtn' onClick={handleSubmission}>Create</button>
                
            </div>
    );
}
export default CreateNFT;