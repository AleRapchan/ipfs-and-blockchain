# IPFS with Blockchain

Storing data in IPFS and the file's hash in the Ethereum blockchain.

![Logo](http://alexandrebarros.com/global/ipfs-blockchain.png)

## Goals for IPFS Blockchain Project

A blockchain smart contract system that integrates to IPFS.

- [X] Upload a file to IPFS from webpage and get the hash
- [X] Store hash on blockchain in smart contract
- [X] Read back hash from the smart contract
- [X] Retrieve file from IPFS using hash
- [X] Display on webpage

## Problem

- Storing data on Ethereum is expensive
- Storing data in a central database is not distributed

## Solution

- IPFS is distributed
- IPFS uses the cryptographic hash as the storage and lookup index
- IPFS breaks the file into blocks and the blocks are stored all over the network
- IPFS maintains an index to find the closest copies of all of the blocks to retrieve the file
- Store the hash in the blockchain

## Screenshot

![Logo](http://alexandrebarros.com/global/ipfs-preview.png)

## Tech Stack

**Client:** IPFS, React

## Local IPFS

- Get a copy of the IPFS from https://dist.ipfs.io/#go-ipfs
- Extract the tar.gz file tar -xvf and run the install.sh

```bash
ipfs init
```

- Check out the quick-start
- In a new terminal window run

```bash
ipfs daemon
```

- Check out your local interface on http://localhost:3000/ipfs/

## React interface to IPFS

- Create your react app

```bash
npm install -g create-react-app
npx create-react-app ipfs
cd ipfs
npm install fs-extra
npm install ipfs
```

- Connect to your local IPFS
- Make an ipfs.js file

```js
const ipfsApi = require(‘ipfs-api’);
const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});
export default ipfs;
```

- Upload file

  - Open file
  - Save to buffer
  - Call ipfs add
  - Save the hash that is returned

- Retrieve file

  - Need the hash
  - Buffer to read to
  - Call ipfs get
  - Write buffer out to a file

## Author

- [@Alexandre Rapchan B. Barros](https://www.github.com/AleRapchan)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/alerapchan)

## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Appendix

- Web3.js: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events
- Bootstrap 5: https://getbootstrap.com/docs/5.0/getting-started/introduction/
- Metamask: https://docs.metamask.io/guide/
- Remix: https://remix-ide.readthedocs.io/en/latest/
- React: https://reactjs.org/docs/getting-started.html
- Solidity: https://docs.soliditylang.org/en/v0.4.24/
- Ganache: https://www.trufflesuite.com/docs/ganache/overview

## Further Links

- Solidity Documentation: https://solidity.readthedocs.io/en/develop/index.html#
- Truffle Documentation: http://truffleframework.com/docs/
