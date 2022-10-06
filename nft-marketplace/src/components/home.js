import { Link } from "react-router-dom";

const HomePg = () => {
    return (
        <div className="homePg">
            <div className="imageHome" style={{float:'right'}}>
              <img src={process.env.PUBLIC_URL + '/webLandingpage.png'} />
              </div>
              <div className="homeContent">
            {/* <h1 className="bigHeader">Explore, Create and Buy</h1> */}
            <h1 className="bigHeader">Get To Explore, Create and Buy</h1>
            <h1 className="biggerHeader">NFT ArtWork</h1>
            <h2 className="nextHeader">Using <span style={{color:'#96baee', fontSize:'40px', fontStyle:'italic'}}>ONE</span> Coins</h2>

            <Link to="/explore" className="homeLink"><span>Explore</span></Link>
            <p className="homeText">Just have a wallet extension on Your Browser and some <span style={{color:'#96baee', fontSize:'30px', fontStyle:'italic'}}>ONE</span> coins.</p>
            </div>
        </div>
    );
}
export default HomePg;
