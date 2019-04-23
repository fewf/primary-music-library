const processInput = require('./commands');
const {artists, albums} = require('./database');

function assertTrue(assertion) {
  if (assertion) {
    console.log("pass");
  } else {
    console.trace();
    throw "Assertion not true";
  }
}

let output;

// test adding
output = processInput('add "Ride the Lightning" "Metallica"');
assertTrue(output.length === 1);
assertTrue(output[0] === 'Added "Ride the Lightning" by Metallica');
assertTrue(artists.Metallica[0] === 'Ride the Lightning');
assertTrue(albums['Ride the Lightning'].artist === 'Metallica');
assertTrue(!albums['Ride the Lightning'].played);

processInput('add "Licensed to Ill" "Beastie Boys"');
assertTrue(artists['Beastie Boys'][0] === 'Licensed to Ill');
assertTrue(albums['Licensed to Ill'].artist === 'Beastie Boys');
assertTrue(!albums['Licensed to Ill'].played);

processInput('add "Pauls Boutique" "Beastie Boys"');
assertTrue(artists['Beastie Boys'][1] === 'Pauls Boutique');
assertTrue(albums['Pauls Boutique'].artist === 'Beastie Boys');
assertTrue(!albums['Pauls Boutique'].played);

processInput('add "The Dark Side of the Moon" "Pink Floyd"');
assertTrue(artists['Pink Floyd'][0] === 'The Dark Side of the Moon');
assertTrue(albums['The Dark Side of the Moon'].artist === 'Pink Floyd');
assertTrue(!albums['The Dark Side of the Moon'].played);

// test show all
output = processInput('show all');
assertTrue(output.length === 4);
assertTrue(output[0] === '"Ride the Lightning" by Metallica (unplayed)');
assertTrue(output[1] === '"Licensed to Ill" by Beastie Boys (unplayed)');
assertTrue(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)');
assertTrue(output[3] === '"The Dark Side of the Moon" by Pink Floyd (unplayed)');

// test playing
output = processInput('play "Licensed to Ill"');
assertTrue(output.length === 1);
assertTrue(output[0] === 'You\'re listening to "Licensed to Ill"');
assertTrue(albums['Licensed to Ill'].played);

output = processInput('play "The Dark Side of the Moon"');
assertTrue(output.length === 1);
assertTrue(output[0] === 'You\'re listening to "The Dark Side of the Moon"');
assertTrue(albums['The Dark Side of the Moon'].played);

// test show all after playing
output = processInput('show all');
assertTrue(output.length === 4);
assertTrue(output[0] === '"Ride the Lightning" by Metallica (unplayed)');
assertTrue(output[1] === '"Licensed to Ill" by Beastie Boys (played)');
assertTrue(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)');
assertTrue(output[3] === '"The Dark Side of the Moon" by Pink Floyd (played)');

// test show unplayed
output = processInput('show unplayed');
assertTrue(output[0] === '"Ride the Lightning" by Metallica');
assertTrue(output[1] === '"Pauls Boutique" by Beastie Boys');

// test show all by
output = processInput('show all by "Beastie Boys"');
assertTrue(output[0] === '"Licensed to Ill" by Beastie Boys (played)');
assertTrue(output[1] === '"Pauls Boutique" by Beastie Boys (unplayed)');

// test show unplayed by
output = processInput('show unplayed by "Beastie Boys"');
assertTrue(output[0] === '"Pauls Boutique" by Beastie Boys');

// test disallows duplicate album names
output = processInput('add "The Dark Side of the Moon" "The Flaming Lips"');
assertTrue(output[0] === 'Whoops, an album by that name has already been entered.');
