import { Link } from "react-router-dom";

const HomePg = () => {
    return (
        <div className="homePg">
            <div className="imageHome" style={{float:'right'}}>
              <img src={process.env.PUBLIC_URL + '/webLandingpage.png'} />
              </div>
            <h1 className="bigHeader">Explore, create and Buy</h1>
            <h1 className="biggerHeader">NFT Art</h1>

            <Link to="/explore" className="homeLink">Explore</Link>
            <p></p>
        </div>
    );
}
export default HomePg;
