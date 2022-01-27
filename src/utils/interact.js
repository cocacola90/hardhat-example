

import TokenArtifact from "../artifacts/contracts/Token.sol/Token.json"
const tokenAddress = "0x4aC8223a09B0795513bC1EFcD69EA1007519039f"  //address smart contract token
import Web3 from 'web3';
var myAddress;
const provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
const web3 = new Web3(provider);
//const web3 = new Web3("http://127.0.0.1:8545/");
console.log(web3);
export const _intializeContract = async () => {
    // We first initialize ethers by creating a provider using window.ethereum

    //   // When, we initialize the contract using that provider and the token's
    //   // artifact. You can do this same thing with your contracts.
    const contract = await new web3.eth.Contract(TokenArtifact.abi, tokenAddress);
    return contract;
};




export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(addressArray);
            const obj = {
                status: "👆🏽 Write a message in the text-field above.",
                address: addressArray[0]
            };
            myAddress = addressArray[0];
            console.log(addressArray);
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};


export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                myAddress = addressArray[0];
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getTokenData = async () => {
    var mycontract = await new web3.eth.Contract(TokenArtifact.abi, tokenAddress);
    console.log(mycontract);
    const name = await mycontract.methods.name().call();
    const symbol = await mycontract.methods.symbol().call();
    const tokenData = { name, symbol }
    return { tokenData: tokenData };
};

export const sendMDToken = async (toAddress, amount) => {
    if (window.ethereum) {
        if (toAddress == "" || amount == "") {
            return {
                success: false,
                status: "❗Please make sure all fields are completed before minting.",
            }
        }
        console.log(toAddress, amount);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const mycontract = await new web3.eth.Contract(TokenArtifact.abi, tokenAddress);

       
        // const nonce = await web3.eth.getTransactionCount(toAddress, 'latest'); //get latest nonce
        // //the transaction
        // const tx = {
        //     'from': toAddress,
        //     'to': tokenAddress,
        //     'nonce': nonce,
        //     'gas': 500000,
        //     'data': mycontract.methods.transfer(toAddress, amount).send({ from: toAddress }).encodeABI() //     nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
        // };


        // const signPromise = web3.eth.accounts.signTransaction(tx, "48d9e5a5363bbe329bddab5e8260cf2d67ef8d7bfd16c2fe5f1ba95fdf14a9ac")
        // signPromise
        //     .then((signedTx) => {
        //         web3.eth.sendSignedTransaction(
        //             signedTx.rawTransaction,
        //             function (err, hash) {
        //                 if (!err) {
        //                     console.log(
        //                         "The hash of your transaction is: ",
        //                         hash,
        //                         "\nCheck Alchemy's Mempool to view the status of your transaction!"
        //                     )
        //                 } else {
        //                     console.log(
        //                         "Something went wrong when submitting your transaction:",
        //                         err
        //                     )
        //                 }
        //             }
        //         )
        //     })
        //     .catch((err) => {
        //         console.log(" Promise failed:", err)
        //     })


        const account = await web3.eth.getAccounts();
        console.log(account[0]);
        try {
            await mycontract.methods.transfer(toAddress, amount).send({from: "0xb236897F8A8C5a6A314EDb6466F5FdF2248a2daC"})
        } catch (err) {
            console.log(err.message)
        }
        // const transaction = await mycontract.methods.transfer(toAddress, amount).send({from: "0xb236897F8A8C5a6A314EDb6466F5FdF2248a2daC"}, function (err, res) {
        //     if (err) {
        //       console.log("An error occured", err)
        //       return
        //     }
        //     console.log("Hash of the transaction: " + res)
        //   });
       // await transaction.wait();
        console.log(`${amount} MDToken has been sent to ${toAddress}`);
        return {
            success: true,
            status: "Transfer success!"
        }
    } else {
        return {
            success: false,
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            )
        }
    }



    //   if (typeof window.ethereum !== 'undefined') {
    //     await requestAccount()
    //     const contract = await _intializeContract(signer)
    //     if(userAccountId ){
    //       setStatus("👆🏽 Write a message in the text-field above.");
    //       return ;
    //     }else{
    //       const transaction = await contract.transfer(userAccountId, amount);
    //       await transaction.wait();
    //       console.log(`${amount} MDToken has been sent to ${userAccountId}`);
    //     }

    //   }
};

export const getBalance = async () => {
    const contract = await _intializeContract();
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const balance = await contract.methods.balanceOf(account).call();
    //const balance = await contract.methods.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266").call();
    console.log(balance);
    return balance;
};
// export const mintNFT = async (url, name, description) => {
//     //error handling
//     if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
//         return {
//             success: false,
//             status: "❗Please make sure all fields are completed before minting.",
//         }
//     }
//     //make metadata
//     const metadata = new Object();
//     metadata.name = name;
//     metadata.image = url;
//     metadata.description = description;

//     //make pinata call
//     const pinataResponse = await pinJSONToIPFS(metadata);
//     if (!pinataResponse.success) {
//         return {
//             success: false,
//             status: "😢 Something went wrong while uploading your tokenURI.",
//         }
//     }
//     const tokenURI = pinataResponse.pinataUrl;
//     window.contract = await new web3.eth.Contract(contractABI, contractAddress);
//     //set up your Ethereum transaction
//     const transactionParameters = {
//         to: contractAddress, // Required except during contract publications.
//         from: window.ethereum.selectedAddress, // must match user's active address.
//         'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()//make call to NFT smart contract 
//     };

//     //sign the transaction via Metamask
//     try {
//         const txHash = await window.ethereum
//             .request({
//                 method: 'eth_sendTransaction',
//                 params: [transactionParameters],
//             });
//         return {
//             success: true,
//             status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
//         }
//     } catch (error) {
//         return {
//             success: false,
//             status: "😥 Something went wrong: " + error.message
//         }

//     }
// };


// export const getTokenAllowance =  async (contract, owner, spender) => {
//     if(contract == "" || owner == ""|| spender ==""){
//         return {
//             success: false,
//             status: "something went wrong",
//         }
//     }
//     var mycontract = await new web3.eth.Contract(contractABI, contractAddress);
//     console.log(mycontract);
//     console.log("myaddress: " + myAddress);
//     web3.eth.getBalance(myAddress).then(console.log);
// };