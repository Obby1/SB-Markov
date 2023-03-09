/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function generateText() {
  // Check if the input source is provided or exit with error
  if (process.argv.length !== 4) {
    console.error('Usage: node makeText.js [file|url] [content]');
    process.exit(1);
  }

  // Define inputs
  const inputType = process.argv[2];
  const content = process.argv[3];

  try {
    let mm;
    if (inputType === 'file') {
      // Read file and convert it to string
      const fileContent = fs.readFileSync(content, 'utf8');
      // Create new instance of MarkovMachine
      mm = new MarkovMachine(fileContent);
    } else if (inputType === 'url') {
      // Get text content from URL and convert it to string
      const response = await axios.get(content);
      // Create new instance of MarkovMachine
      mm = new MarkovMachine(response.data);
    } else {
      throw new Error(`Invalid input source: ${inputType}`);
    }
    // Generate random text using markov chains and log it to the console
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

generateText();
