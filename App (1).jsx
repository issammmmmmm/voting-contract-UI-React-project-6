
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./abi/voting";

const contractAddress = "0x378974478f486568C731Cef14a2f6C50751fB116";

function App() {
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const connectWallet = async () => {
    try {
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const voting = new ethers.Contract(contractAddress, contractABI, signer);
      setWallet(account);
      setContract(voting);
    } catch (err) {
      console.error("Failed to connect:", err);
    }
  };

  const loadVotes = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const names = await contract.getCandidates();
      const votesObj = {};
      for (const name of names) {
        const count = await contract.totalVotesFor(name);
        votesObj[name] = Number(count);
      }
      setCandidates(names);
      setVotes(votesObj);
    } catch (err) {
      console.error("Error loading votes:", err);
    }
    setLoading(false);
  };

  const vote = async () => {
    if (!selected || !contract) return;
    try {
      const tx = await contract.vote(selected);
      await tx.wait();
      await loadVotes();
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  useEffect(() => {
    if (contract) {
      loadVotes();
    }
  }, [contract]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🗳️ Voting dApp</h1>

      {!wallet ? (
        <button onClick={connectWallet}>🔌 Connect Wallet</button>
      ) : (
        <>
          <p>Connected as: {wallet}</p>

          <h3>Candidates:</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            candidates.map((name) => (
              <div key={name} style={{ marginBottom: "1rem" }}>
                <label>
                  <input
                    type="radio"
                    value={name}
                    checked={selected === name}
                    onChange={() => setSelected(name)}
                  />
                  <strong> {name}</strong> — 🧮 {votes[name] ?? 0} votes
                </label>
              </div>
            ))
          )}

          <button disabled={!selected} onClick={vote}>
            ✅ Vote
          </button>
        </>
      )}
    </div>
  );
}

export default App;
