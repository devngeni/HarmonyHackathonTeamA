import { Link } from "react-router-dom";
import React from "react";
import Web3Modal from "web3modal";
import { providers, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const BN = require('bn.js');

const Navbar = () => {
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


const [account, setAccount] = useState('');
const [authorised, setAuthorised] = useState(false);

const handleAccountsChanged = (accounts) => {
  if (accounts.length === 0) {
    console.error('Not found accounts');
  } else {
    setAccount(String(accounts[0]).substring(0, 5) + "..." + String(accounts[0].substring(38)));

    console.log('Your address: ', accounts[0]);
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

// const sendTransaction = async () => {
//   // @ts-ignore
//   const web3 = new Web3(window.ethereum);

//   console.log('Your address is: ', account);

//   const receiverAddress = '0x430506383F1Ac31F5FdF5b49ADb77faC604657B2';

//   const gas = 6721900;
//   const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));

//   const result = await web3.eth
//     .sendTransaction({
//       from: account,
//       to: receiverAddress,
//       value: 1 * 1e18, // 1ONE
//       gasPrice,
//       gas,
//     })
//     .on('error', console.error)
//     .on('transactionHash', transactionHash => {
//       alert(`Transaction is sending: ${transactionHash}`);
//     });

//   console.log(`Send tx: ${result.transactionHash} result: `, result.status);

//   alert(`Send tx: ${result.transactionHash} result: ${result.status}`);

// }

return (
    <nav className="navbar">
        <div className="navHeader">
            <Link to="/">Ngeni NFT Market</Link>
        </div>
        <div className="navLinks">
            <Link to="/explore">Explore</Link>
            <Link to="/create">Create NFT</Link>
        </div>
        <div className="navLinks2">
            <a href="/" className="Button">Sign Up</a>
            {account ? <button className='connect'>{account}</button>: <button className='connect' onClick={signInMetamask}>Connect Wallet</button>}
        </div>
    </nav>
);


}

export default Navbar;
