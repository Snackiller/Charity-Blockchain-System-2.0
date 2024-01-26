import Web3 from 'web3';

let web3;
// let selectedAccount;

const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fundIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "donor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "DonationReceived",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fundIndex",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "goalAmount",
            "type": "uint256"
          }
        ],
        "name": "FundCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fundIndex",
            "type": "uint256"
          }
        ],
        "name": "GoalAchieved",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "fundDonors",
        "outputs": [
          {
            "internalType": "address",
            "name": "donorAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "funds",
        "outputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "manager",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goalAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalDonated",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isGoalAchieved",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_goalAmount",
            "type": "uint256"
          }
        ],
        "name": "createFund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "fundIndex",
            "type": "uint256"
          }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [],
        "name": "getFunds",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "address payable",
                "name": "manager",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "goalAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalDonated",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "donorCount",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isGoalAchieved",
                "type": "bool"
              }
            ],
            "internalType": "struct CharityFund.Fund[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
]; // abi from CharityFund.json file
const contractAddress = '0x8C553DC5157D74800985F88541Ff1Da65630e987'; // address from deployed contract in Ganache

// Initialization and setup
const initWeb3 = async () => {
  // Check for Ethereum provider
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("User denied account access", error);
    }
  } 
  // Legacy dapp browsers...
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } 
  // If no injected web3 instance is detected, fall back to Infura
  else {
    console.error("No web3 provider detected, falling back to Infura");
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY'));
  }
};

// Create a new fund
const createNewFund = async (charityName, description, fundsRequired) => {
  try {
    if (!web3) {
      throw new Error("Web3 is not initialized");
    }

    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error("No account is available");
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.createFund(charityName, description, fundsRequired).send({
      from: accounts[0],
    });

    console.log('Fund created successfully');
  } catch (error) {
    console.error('Error creating fund:', error);
  }
};

const donateToFund = async (fundIndex, donationAmount) => {
  try {
    if (!web3) {
      throw new Error("Web3 is not initialized");
    }

    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error("No account is available");
    }
    
    const amountInWei = web3.utils.toWei(donationAmount, 'ether');
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const transactionReceipt = await contract.methods.donate(fundIndex).send({
      from: accounts[0],
      value: amountInWei
    });

    if (transactionReceipt && transactionReceipt.status) {
      console.log('Donation successful');
      return { success: true, account: accounts[0], amount: donationAmount };
    } else {
      console.log('Donation transaction failed');
      return { success: false };
    }
  } catch (error) {
    console.error('Error making donation:', error);
  }
};


export { initWeb3, createNewFund, donateToFund, contractABI, contractAddress };