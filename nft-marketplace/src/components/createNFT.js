const CreateNFT = () => {
    return (
        <div className="createNft">
                <form action="/" method="post">
                    <div className='inputname'>Name
                        <input type="text" className="inputSpace" placeHolder="Item Name"></input>
                    </div>
                    <div className='inputname'>Price
                        <input type="text" className="inputSpace" placeHolder="amount(in ETH)"></input>
                    </div>
                    <div className='inputname'>Description
                        <textarea rows="4" className="inputSpace"></textarea>
                    </div>
                    <div className='inputname'>Upload
                    <input type="file" className="inputSpace" placeHolder="amount(in ETH)"></input>
                    </div>
                    <button className='createNftBtn'>Create</button>
                </form>
            </div>
    );
}
export default CreateNFT;