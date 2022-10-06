import { Link } from "react-router-dom";
// import Web3Modal from "web3modal";
// import {providerOptions} from "./providerWallet";
// import { ethers } from 'ethers';

const Navbar = () => {
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
                <a href="/" className="Button"><i class="fa-solid fa-wallet"></i>Sign Up</a>
                <button className='connect'>Connect wallet</button>
            </div>
        </nav>
    );
}

export default Navbar;
