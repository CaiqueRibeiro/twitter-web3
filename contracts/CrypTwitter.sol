// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

struct Tweet {
  address author;
  string text;
  uint timestamp;
  string username;  
}

contract CrypTwitter {

    uint public nextId = 0;
    uint public constant PAGE_SIZE = 10;
    mapping(uint => Tweet) public tweets;
    mapping(address => string) public users;

    function addTweet(string calldata text) public {
        // 'calldata' only allows reading while 'memory' allows reading and writing
        Tweet memory newTweet;
        newTweet.text = text;
        newTweet.author = msg.sender; // global object associated with user wallet
        newTweet.timestamp = block.timestamp; // global object that tracks where in blockchain it is being registered
        nextId++;
        tweets[nextId] = newTweet;
    }

    function changeUsername(string calldata newName) public {
        users[msg.sender] = newName;
    }

    function getLastTweets(uint page) public view returns (Tweet[] memory) {
        if(page < 1) page = 1;
        uint startIndex = PAGE_SIZE * (page - 1) + 1;

        Tweet[] memory lastTweets = new Tweet[](PAGE_SIZE);
        for(uint i = 0; i < PAGE_SIZE; i++) {
            lastTweets[i] = tweets[startIndex + 1];
            lastTweets[i].username = users[lastTweets[i].author];
        }

        return lastTweets;
    }
}