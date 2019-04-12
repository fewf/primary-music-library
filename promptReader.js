// adapted from https://stackoverflow.com/questions/12042534/node-js-synchronous-prompt
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptReader() {
  return new Promise((resolve, reject) => {
    rl.question('>', (answer) => {
      resolve(answer);
    });
  });
}

function closePromptReader() {
  rl.close();
}

module.exports = {promptReader, closePromptReader};
