import React, { useEffect,useState } from 'react';
import axios from "axios";
import { ethers } from "ethers";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import { useParams } from 'react-router-dom';

const Explore = () => {
  const [data, setData] = useState([]);
  const [datafetched, setDatafetched] = useState(false);

  const allNFTS = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      let contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        abi,
        provider
      );
       const info = await contract.getAllNFTs();       
      let nfts = [];
      info.map(async (index) => {
        const tokenuri= await contract.tokenURI(index.tokenId)
        const tokenURI = tokenuri.substring(tokenuri.lastIndexOf('/') + 1);
        //  console.log(`https://gateway.ipfscdn.io/ipfs/${tokenURI}`);

         const headers = {
          'Access-Control-Allow-Origin': '*'
      };

        const metadata = await axios({url: `https://gateway.ipfscdn.io/ipfs/${tokenURI}`, headers, method:"GET"}) 
        .then(response => {
          return response;
        })
        .catch(error => {
          // handle error
          console.log("this is" + error.message);
      }) 
      nfts.push(metadata.data)

     })
       
     console.log(nfts);
     setData(nfts);
      // console.log("11111111111", data);
      setDatafetched(true)

    } catch (e) {
      console.log(e.message);
    }
  }

  

  const tokenId = useParams().tokenId;
   if(!datafetched) allNFTS(tokenId)


useEffect(() => {

},[])

  return (
    <div className="explorePg">
      <div className='explore'>
        {
        data.map((nft, index) =>{
          return(
           
              <div key={index} className="cardsData">
                <img src={nft.image}></img>
                <h3>name: <span className='exploreData'>{nft.name}</span></h3> 
                <h3>description: <span className='exploreData'>{nft.description}</span></h3>
                <h3>price: <span className='exploreData'>{nft.price}</span></h3>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                <button className='createNftBtn2'>Buy</button>
                </div>
              </div>
           
          )
        })    
        }
      </div>
    </div>
  )
}
export default Explore;
