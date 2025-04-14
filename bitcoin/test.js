const Block = require("./block.js");
const Blockchain = require("./blockchain.js");

let myCoin = new Blockchain();

myCoin.mine(new Block());