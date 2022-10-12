import React from "react";

const CreateNFT = () => {
    return (
        <div className="createNft">
            <h1>Create Your NFT</h1>
                <form action="/uploadNFT" method="post">
                    <div className='inputname'>Name
                        <input type="text" className="inputSpace" name="nftName" size="70" placeholder="Item Name"></input>
                    </div>
                    <div className='inputname'>Price
                        <input type="text" className="inputSpace" name="nftPrice" placeholder="amount(in ETH)"></input>
                    </div>
                    <div className='inputname'>Description
                        <textarea rows="4" className="inputSpace" name="nftDescription"></textarea>
                    </div>
                    <div className='inputname'>Upload
                    <div style={{border:'2px dotted grey', height: '100px', width: '100%'}}>
                    <input type="file" className="inputSpace" name="nftfile"></input>
                    </div>
                    </div>
                    <button className='createNftBtn'>Create</button>
                </form>
            </div>
    );
}
export default CreateNFT;