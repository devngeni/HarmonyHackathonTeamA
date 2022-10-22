import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

const Navbar = () => {

const [account, setAccount] = useState('');
const [balanceY, setBalance] = useState('');
const [authorised, setAuthorised] = useState(false);



const hmy = new Harmony(
    'https://api.s0.b.hmny.io/',
    {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
    },
);

const handleAccountsChanged = (accounts) => {
  let unitBalance;
  if (accounts.length === 0) {
    console.error('Not found accounts');
  } else {
    setAccount(String(accounts[0]).substring(0, 5) + "..." + String(accounts[0].substring(38)));

     hmy.blockchain
  .getBalance({ address: accounts[0] })
  .then((response) => {
    console.log('balance in ONEsss: ' + fromWei(hexToNumber(response.result), Units.one));
    // unitBalance.push(fromWei(hexToNumber(response.result), Units.one))
    setBalance(parseFloat(fromWei(hexToNumber(response.result), Units.one)).toFixed(4));
  })
  
    console.log('Your address: ', accounts[0]);
    return unitBalance;
  }
};



const signInMetamask = async () => {
  const provider = await detectEthereumProvider();

  // @ts-ignore
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }

  if (!provider) {
    console.error('Metamask not found');
    return;
  }

  // MetaMask events
  provider.on('accountsChanged', handleAccountsChanged);

  provider.on('disconnect', () => {
    console.log('disconnect');
    setAuthorised(false);
    setAccount('');
  });

  provider.on('chainIdChanged', chainId =>
    console.log('chainIdChanged', chainId),
  );

  provider
    .request({ method: 'eth_requestAccounts' })
    .then(async params => {
      handleAccountsChanged(params);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params:[{
          chainId: '0x6357D2E0'
      }]
      });

      setAuthorised(true);
    })
    .catch(err => {
      setAuthorised(false);

      if (err.code === 4001) {
        console.error('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
};
signInMetamask()
// const navigate = useNavigate()
// const handleClick=() => {
//   navigate("/explore")
// }

return (
  <>
    <div className="navLarge">
    <nav className="navbar">
        <div className="navHeader">
            <Link to="/">Ngeni NFT Market</Link>
        </div>
        <div className="navLinks">
            {/* <div onClick={() => handleClick()}>explore</div> */}
            <Link to="/explore">Explore</Link>
            <Link to="/create">Create NFT</Link>
            {authorised ? <Link to="/yourNFTs">Your NFTs</Link> : ""}
        </div>
        <div className="navLinks2">
            {/* <a href="/" className="Button">Sign Up</a> */}
            {account ? <button className='connect'>{account}<br/> <span style={{color: 'black'}}>Balance : {balanceY} ONE</span> </button>: <button className='connect' onClick={signInMetamask}>Connect Wallet</button>}
          
        </div>
    </nav>
    </div>

    <div className="navMobile">
    <nav className="navbar2">
      <div className="mainLink">
      <Link to="/">Ngeni NFT Market</Link>
      </div>
        <div className="navLinks">
            <Link to="/explore">Explore</Link>
            <Link to="/create">Create NFT</Link>
            {authorised ? <Link to="/yourNFTs">Your NFTs</Link> : ""}
            {/* <a href="/" className="Button">Sign Up</a> */}
        </div>
        <div>
        {account? <button className='connect'>{account}</button>: <button className='connect' onClick={signInMetamask}>Connect Wallet</button>}
      
        </div>
    </nav>
    </div>
    </>
);


}

export default Navbar;

//     const [walletConnected, setWalletConnected] = useState(false);
//     const[address, setAddress]=useState('')
//     const web3ModalRef = useRef();
    
//     const getProviderOrSigner = async (needSigner = false) => {
//     // Connect to Metamask
//     // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
//     const provider = await web3ModalRef.current.connect();
//     const web3Provider = new providers.Web3Provider(provider);

//     // If user is not connected to the Goerli network, let them know and throw an error
//     const { chainId } = await web3Provider.getNetwork();
//     if (chainId !== 5) {
//         window.alert("Change the network to Goerli");
//         throw new Error("Change network to Goerli");
//     }

//     if (needSigner) {
//         const signer = web3Provider.getSigner();
//         return signer;
//     }
//     return web3Provider;
// };

// const connectWallet = async() => {
//     try {
//         await getProviderOrSigner();
//         setWalletConnected(true);
//         const provider = await web3ModalRef.current.connect();
//         setAddress(String(provider.selectedAddress).substring(0, 5) + "..." + String(provider.selectedAddress).substring(38));
//     } catch(err) {
//         console.error(err);
//     }
// };

 
//   useEffect(() => {
//     if (!walletConnected) {
//         web3ModalRef.current = new Web3Modal({
//         network: "goerli",
//         providerOptions: {},
//         disableInjectedProvider: false,
//       });
//       connectWallet();
//     }
//   }, [walletConnected]);
