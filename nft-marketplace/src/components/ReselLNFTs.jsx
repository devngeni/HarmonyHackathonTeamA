import { ethers } from "ethers";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import Loader from "./Loader";

const ReselLNFTs = () => {

    const search = useLocation().search;
  const image = new URLSearchParams(search).get("tokenuri");
  const tokenId = new URLSearchParams(search).get("tokenId");
  const price = new URLSearchParams(search).get("price");
  const description = new URLSearchParams(search).get("description");
  const name = new URLSearchParams(search).get("name");

  const [message, updateMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formParams, updateFormParams] = useState({
    price: "",
  });



  const handleSubmission = async (e) => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    e.preventDefault();
    //Upload data to IPFS
    try {
      setLoading(true)
      //  const provider
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();
      //actually create the NFT
      let transaction = await contract.resellToken(tokenId, price, {
        value: listingPrice,
      });
      await transaction.wait();
      updateMessage("Please wait.. uploading (upto 5 mins)");
      alert("Successfully listed your NFT!");
      updateMessage("");
      setLoading(false)
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/explore");
    } catch (e) {
      updateMessage("failed, please fill all fields...");
      alert(e);
    }
  };

    return(
        <>


{/* <h1 style={{textAlign: 'center', paddingTop: '20px'}}>Resell the NFTs</h1> */}
        <div className="resellPg">
        <img src={image} alt="newimage"></img>

        <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Initial Price: </p>
        <h1 style={{fontWeight: 'bold', fontSize: '18px'}}>{price} ONE</h1>

        <div className="inputPageResell">
        <input
          type="text"
          className="inputResell"
          name="nftPrice"
          placeholder="amount(in ONE)"
          id="price"
          value={formParams.price}
          onChange={(e) =>
            updateFormParams({ ...formParams, price: e.target.value })
          }
        ></input>
         <button className="createNftBtnResell" onClick={handleSubmission}>
        {isLoading ? <Loader /> : "Resell NFT"}
      </button>
      </div>
        </div>
        </div>
        </>
    )
}

export default ReselLNFTs