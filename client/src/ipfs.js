const IPFS = require("ipfs-api"); ////const ipfsApi

// Connect IPFS on Localhost
// const ipfs = new ipfsApi('localhost', '5001', {protocol:'http'}); // 127.0.0.1

// Connect IPFS on Infura
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default ipfs;
