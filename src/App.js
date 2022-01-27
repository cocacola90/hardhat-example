import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected, getTokenData, sendMDToken, getBalance } from "./utils/interact";

// import TokenArtifact from "./artifacts/contracts/Token.sol/Token.json"
// const tokenAddress = "0x4aC8223a09B0795513bC1EFcD69EA1007519039f"  //address smart contract token
// import Web3 from 'web3';

function App() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenData, setTokenData] = useState();
  const [balance, setBalance] = useState();
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("----- on Here ! -----");
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const _getTokenData = async () => {
    const {tokenData} = await getTokenData();
    setTokenData(tokenData);
  };

  const _getBalance = async () => {
    const blc= await getBalance();
    setBalance(blc);
  };

  const _sendMDToken = async () => {
      const {status} = await sendMDToken(toAddress, amount);
      setStatus(status);
  }

  useEffect(async () => { //TODO: implement
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    addWalletListener();
  }, []);



  return (
    <div className="App">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>

      <form>
        <h2>🤔 To Address: </h2>
        <input
          type="text"
          placeholder="e.g. 0x000....!"
          onChange={(event) => setToAddress(event.target.value)}
        />
        <h2>✍️ Amount: </h2>
        <input
          type="text"
          placeholder=""
          onChange={(event) => setAmount(event.target.value)}
        />
      </form>
      <br></br>
      <button id="mintButton" onClick={_sendMDToken}>
        Send MD Token
      </button>
      <br></br>
      <br></br>
      <button onClick={_getTokenData}>get token data</button>
       <h2>{tokenData ? "name: " + String(tokenData.name) + " symbol: " + String(tokenData.symbol) : ""}</ h2> 
       <br></br>
       <button onClick={_getBalance}>Balance</button>
       <p>Balance: {balance}</p> 
      <p id="status">
        {status}
      </p>

      {/* <header className="App-header">
    <button onClick={_getTokenData}>get token data</button>
    <h2>{tokenData ? "name: " + String(tokenData.name) + " symbol: " + String(tokenData.symbol) : ""}</ h2> 
    <button onClick={getBalance}>Get Balance</button>  
    <button onClick={sendMDToken}>Send MDToken</button>
    <input onChange={e => setUserAccountId(e.target.value)} placeholder="Account ID" />
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
    </header>
    <p id="status">
        {status}
      </p> */}
    </div>
  );
}

export default App;
