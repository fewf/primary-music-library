const {promptReader, closePromptReader} = require('./promptReader');
const processInput = require('./commands');

async function main() {
  console.log('Welcome to your music library!');
  let match;
  let promptInput = await promptReader();
  while (promptInput !== 'quit') {
    const output = processInput(promptInput);
    output.forEach(message => console.log(message));
    promptInput = await promptReader();
  }
  console.log('Bye!');
  closePromptReader();
}

main();
