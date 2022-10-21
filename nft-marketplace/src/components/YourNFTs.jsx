import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";

const YourNFTs = () => {
    const [data, setData] = useState([]);
    const [datafetched, setDatafetched] = useState(false);
    let nfts = [];
    const getMyNFTs = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, provider);
            let allData = await contract.getMyNFTs();
            // console.log("heee",allData);
            allData.map(async (index) => {
        
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
              console.log(data);

            } catch (e) {
              console.log(e.message);
            }
          };

    // getMyNFTs();
    const tokenId = useParams().tokenId;
  if (!datafetched) getMyNFTs(tokenId);

    return(
        <>
        <div className="yourPg">
        <h1 style={{textAlign: 'center'}}>Your NFTs</h1>
        {datafetched && !data.length ? (<p style={{textAlign: 'center', fontSize: '20px', marginTop: '20px', color: '#ef640e'}}>Buy NFTs on the Explore Page. 
        It is lonely in here <span style={{textAlign: 'center', fontSize: '30px', marginTop: '100px', color: 'red', fontWeight: 'bold'}}>!</span ></p>): ( <div className="explore">
        {data.map((nft, index) => {
          return (
            <div key={index} className="cardsData">
              <img src={nft.image} alt="nfts"></img>
              <p className="exploreData">{nft.name} sags asjs</p>
              {/* <p className='exploreDes'>{nft.description} jhdasdhw ncsdhcs xcgsd dscjsa</p> */}
              <p className="exploreprice">
                Price
                <span style={{ float: "right", paddingRight: "10px" }}>
                  {" "}
                  {nft.price} ONE
                </span>
              </p>
             
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                 <Link style={{textDecoration: 'none',  backgroundColor: '#ef640e', color: 'white'}} 
                 to={`/resell?tokenId=${nft.tokenId}&&tokenuri=${nft.image}&&price=${nft.price}&&description=${nft.description}&&name=${nft.name}`} > <button className="link2Button">
                  Resell
                </button></Link>          
                
                {/* <button onclick={() => this.props.history.push({pathname: '/resell', state: { tokenId: 'nft.tokenId' }})}>push</button>      */}
                {/* <button onclick={() => this.props.history.push("/resell")}>push</button>      */}
              
              </div>
            </div>
          );
        })}
      </div>)}

     
    </div>
    </>

    );
}
export default YourNFTs