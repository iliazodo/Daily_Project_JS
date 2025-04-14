const Block = require("./block.js");

class Blockchain {
    constructor(){
        this.index = 0;
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock(){
        return new Block(0 , "genesis block" , "0");
    }

    getLatestBlockHash(){
        return this.chain[this.chain.length - 1].hash;
    }

    mine(newBlock){
        this.index++;
        newBlock.index = this.index;
        newBlock.previousHash = this.getLatestBlockHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if(currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

module.exports = Blockchain;