// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0; //0.5.16

contract SimpleStorage { 
  // State variable . Way to write to the blockchain.
  string ipfsHash; // Represent the hash (encrypted location) of the file in IPFS


  //event SaveFile(address indexed _from, string indexed _ipfsHash); //, uint indexed _value


 // TypeError: Data location must be "memory" for parameter in function, but none was given.
  function set(string memory x) public {
    ipfsHash = x ;
    //emit SaveFile(msg.sender, ipfsHash ); //, msg.value
  }

  function get() public view returns (string memory) { // Solidity is changing a lot
    return ipfsHash;
  }
}
