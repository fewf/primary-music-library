const {promptReader, closePromptReader} = require('./promptReader');
const {commandRegExp, commandToFunction} = require('./commands');

async function main() {
  console.log('Welcome to your music library!');
  let match;
  let promptInput = await promptReader();
  while (promptInput !== 'quit') {
    match = promptInput.match(commandRegExp);
    if (!match) {
      console.log('Your input was not recognized, please try again.');
    } else {
      match = match.filter(m => m !== undefined);
      commandToFunction[match[1]](...match.slice(2));
    }
    promptInput = await promptReader();
  }
  console.log('Bye!');
  closePromptReader();
}

main();
