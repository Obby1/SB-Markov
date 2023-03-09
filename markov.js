/** Textual markov chain generator */
const fs = require('fs');
const axios = require('axios');

class MarkovMachine {
  // build markov machine; read in text.
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  // set markov chains:
  makeChains() {
    const chains = {};
    // loop through the array of words to identify the current word and nextword
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      
      // look in chains object if that word is in there or not
      if (!chains[word]) {
        // if word is not in chains, create an emtpy array value for that key word
        chains[word] = [];
      }
      // push nextword to current word as a value
      chains[word].push(nextWord);
    }
    // if the current word being added to the object is empty (false), set to null
    if (!chains[this.words[this.words.length - 1]]) {
      chains[this.words[this.words.length - 1]] = [null];
    }
    this.chains = chains;
    return this.chains
  }
  // return random text from chains
  makeText(numWords = 100) {
    let output = [];
    // Look at the chains object keys, select 1 random key
    let currentWord = Object.keys(this.chains)[Math.floor(Math.random() * Object.keys(this.chains).length)];
    // continue pushing new words until numWords is reached or null is reached
    while (output.length < numWords && currentWord !== null) {
      output.push(currentWord);
      const nextWords = this.chains[currentWord];
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
    }
    return output.join(" ");
  }
}

module.exports = { MarkovMachine };