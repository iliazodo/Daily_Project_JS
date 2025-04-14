const crypto = require("crypto");

class Block {
  constructor( data = "", previousHash = "") {
    this.index = 0;
    this.timestamp = Date.now().toString();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.number = 0;
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          this.data +
          this.previousHash +
          this.number
      )
      .digest("hex");
  }

  mineBlock(difficalty) {
    console.time("mine");
    while (
      this.hash.substring(0, difficalty) !== Array(difficalty + 1).join("0")
    ) {
      this.number++;
      console.log(this.hash);
      this.hash = this.calculateHash();
    }
    console.timeEnd("mine");
    console.log("Mining Completed Block: " + this.hash);
    console.log("Number: " + this.number);
    console.log("index: " + this.index);
  }
}

module.exports = Block;


