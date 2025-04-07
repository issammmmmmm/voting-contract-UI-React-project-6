// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    string[] public candidates;
    mapping(string => uint256) public votesReceived;

    constructor(string[] memory candidateNames) {
        candidates = candidateNames;
    }

    function vote(string memory candidate) public {
        bool validCandidate = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Candidate not found");
        votesReceived[candidate]++;
    }

    function totalVotesFor(string memory candidate) public view returns (uint256) {
        return votesReceived[candidate];
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
