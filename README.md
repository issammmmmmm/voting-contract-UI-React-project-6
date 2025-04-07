# 🗳️ Voting dApp – Smart Contract + Frontend (React)

This project is a simple decentralized voting application built on Ethereum using Solidity and React.  
Users can vote for one of three candidates, and results are updated in real time.

---

## 📽️ Demo (Video)

All steps are shown in this screen-recorded demo:
- Compilation and deployment of the smart contract in Remix
- Etherscan transaction proof
- React interface running locally
- MetaMask connection + vote submission
- Real-time vote count update
- Vote confirmation in MetaMask and Etherscan

🖥️ [Demo video included in repo under `/video/demo-vote.mp4`]

---

## 🚀 Technologies Used

- **Solidity** (Smart contract)
- **Remix IDE** (for deployment)
- **React + Vite**
- **ethers.js**
- **MetaMask**
- **Sepolia Testnet**

---

## 🧠 Smart Contract

- Candidates are passed during deployment (`["Pizza", "Burger", "Sushi"]`)
- Functions:
  - `vote(string candidate)`
  - `totalVotesFor(string candidate)`
  - `getCandidates()`

Contract address:  
