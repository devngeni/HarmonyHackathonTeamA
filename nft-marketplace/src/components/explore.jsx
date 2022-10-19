import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { useParams } from "react-router-dom";
import { TransactionDescription } from "ethers/lib/utils";

const Explore = () => {
  const [data, setData] = useState([]);
  const [datafetched, setDatafetched] = useState(false);

  let nfts = [];
  const allNFTS = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const info = await contract.getAllNFTs();
      info.map(async (index) => {
        
        const tokenuri = await contract.tokenURI(index.tokenId);
        const tokenURI = await tokenuri.substring(
          tokenuri.lastIndexOf("/") + 1
        );

        const headers = {
          "Access-Control-Allow-Origin": "*",
        };

        const metadata = await axios({
          url: `https://gateway.ipfscdn.io/ipfs/${tokenURI}`,
          headers,
          method: "GET",
        })
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.log("this is" + error.message);
          });
        nfts.push({
          ...metadata.data,
          tokenId: index.tokenId.toNumber(),
        });
      });

      console.log(nfts);
      setData(nfts);
      setDatafetched(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const tokenId = useParams().tokenId;
  if (!datafetched) allNFTS(tokenId);

  const handleClick = async (tokenId, price) => {
    // await window.ethereum.request({
    //   method: "wallet_switchEthereumChain",
    //   params:[{chainId: '1666700000'}]
    // });
     try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
  
      console.log("hello", price)
      const sellingPrice = ethers.utils.parseUnits(price, "ether");
      // console.log("sellingPrice", sellingPrice);

      let buyNFT = await contract.executeSale(tokenId, {
        value: sellingPrice,
      });

      await buyNFT.wait();
      alert("You successfully bought the NFT!");
      window.location.reload();

    } catch (e) {
      console.log("error##", e.message);
    }
  };
  return (
    <div className="explorePg">
      <div className="explore">
        {data.map((nft, index) => {
          return (
            <div key={index} className="cardsData">
              <img src={nft.image} alt="nfts"></img>
              <p className="exploreData">{nft.name} sags asjs</p>
              <p className="exploreprice">
                Price
                <span style={{ float: "right", paddingRight: "10px" }}>
                  {" "}
                  {nft.price} ONE
                </span>
              </p>
              {/* <p className='exploreDes'>{nft.description} jhdasdhw ncsdhcs xcgsd dscjsa</p> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <button
                  className="createNftBtn2"
                  onClick={() => handleClick(nft.tokenId, nft.price)}
                >
                  Buy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Explore;
