import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json"; // <<<<<<<<
import getWeb3 from "./getWeb3"; // Comes with Truffle Box
import ipfs from "./ipfs";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      buffer: null,
      account: null, // 2
      ipfsHash: "", //simpleStorageInstance: null,
    };

    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount = async () => {
    this.state.web3 = await getWeb3(); // Get network provider and web3 instance.
    //const accounts = await web3.eth.getAccounts();// Use web3 to get the user's accounts.
    this.instantiateContract(); // Instantiate contract once web3 provided.
  };

  instantiateContract() {
    const contract = require("truffle-contract");
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts((error, accounts) => {
      // Get accounts.
      simpleStorage
        .deployed() //{from: state.accounts[0],gasPrice: 1000,gas: 100000}
        .then((instance) => {
          this.simpleStorageInstance = instance;
          this.setState({ account: accounts[0] }); //Look web3 metamask func ! Use always index 0!
          // Get the value from the contract to prove it worked.
          return this.simpleStorageInstance.get.call({ from: accounts[0] });
        })
        .then((ipfsHash) => {
          return this.setState({ ipfsHash }); // Update state with the result.
        });
    });
  }

  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("This State Account value:", this.state.account);

    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        error.log(error);
        return;
      }

      // Really record on the blockchain
      this.simpleStorageInstance
        .set(result[0].hash, {
          from: this.state.account,
          gasPrice: 1000,
          gas: 100000,
        })
        .then((r) => {
          this.setState({ ipfsHash: result[0].hash });
          console.log("ipfsHash:", this.state.ipfsHash);
          console.log("This State Account value:", this.state.account);
        });
    });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Your IPFS Image!</h1>
        {/* IPFS File Upload DApp. */}
        <p>This image is stored on IPFS and Ethereum Blockchain. </p>
        {/* String interpolation */}
        <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt="" />
        <h2>Upload Image</h2>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <input type="submit" />
        </form>
        <br />
        <div>The stored hash value is: {this.state.ipfsHash}</div>
      </div>
    );
  }
}

export default App;
