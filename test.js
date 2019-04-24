const processInput = require('./commands');
const {artists, albums} = require('./database');

// test adding
test('adds albums', () => {
  let output = processInput('add "Ride the Lightning" "Metallica"');
  expect(output.length === 1).toBeTruthy();
  expect(output[0] === 'Added "Ride the Lightning" by Metallica').toBeTruthy();
  expect(artists.Metallica[0] === 'Ride the Lightning').toBeTruthy();
  expect(albums['Ride the Lightning'].artist === 'Metallica').toBeTruthy();
  expect(!albums['Ride the Lightning'].played).toBeTruthy();

  processInput('add "Licensed to Ill" "Beastie Boys"');
  expect(artists['Beastie Boys'][0] === 'Licensed to Ill').toBeTruthy();
  expect(albums['Licensed to Ill'].artist === 'Beastie Boys').toBeTruthy();
  expect(!albums['Licensed to Ill'].played).toBeTruthy();

  processInput('add "Pauls Boutique" "Beastie Boys"');
  expect(artists['Beastie Boys'][1] === 'Pauls Boutique').toBeTruthy();
  expect(albums['Pauls Boutique'].artist === 'Beastie Boys').toBeTruthy();
  expect(!albums['Pauls Boutique'].played).toBeTruthy();

  processInput('add "The Dark Side of the Moon" "Pink Floyd"');
  expect(artists['Pink Floyd'][0] === 'The Dark Side of the Moon').toBeTruthy();
  expect(albums['The Dark Side of the Moon'].artist === 'Pink Floyd').toBeTruthy();
  expect(!albums['The Dark Side of the Moon'].played).toBeTruthy();
});

// test show all
test('shows all', () => {
  let output = processInput('show all');
  expect(output.length === 4).toBeTruthy();
  expect(output[0] === '"Ride the Lightning" by Metallica (unplayed)').toBeTruthy();
  expect(output[1] === '"Licensed to Ill" by Beastie Boys (unplayed)').toBeTruthy();
  expect(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)').toBeTruthy();
  expect(output[3] === '"The Dark Side of the Moon" by Pink Floyd (unplayed)').toBeTruthy();
});

// test playing
test('plays', () => {
  let output = processInput('play "Licensed to Ill"');
  expect(output.length === 1).toBeTruthy();
  expect(output[0] === 'You\'re listening to "Licensed to Ill"').toBeTruthy();
  expect(albums['Licensed to Ill'].played).toBeTruthy();

  output = processInput('play "The Dark Side of the Moon"');
  expect(output.length === 1).toBeTruthy();
  expect(output[0] === 'You\'re listening to "The Dark Side of the Moon"').toBeTruthy();
  expect(albums['The Dark Side of the Moon'].played).toBeTruthy();
});

// test show all after playing
test('shows all after playing', () => {
  let output = processInput('show all');
  expect(output.length === 4).toBeTruthy();
  expect(output[0] === '"Ride the Lightning" by Metallica (unplayed)').toBeTruthy();
  expect(output[1] === '"Licensed to Ill" by Beastie Boys (played)').toBeTruthy();
  expect(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)').toBeTruthy();
  expect(output[3] === '"The Dark Side of the Moon" by Pink Floyd (played)').toBeTruthy();
});

// test show unplayed
test('shows unplayed', () => {
  let output = processInput('show unplayed');
  expect(output[0] === '"Ride the Lightning" by Metallica').toBeTruthy();
  expect(output[1] === '"Pauls Boutique" by Beastie Boys').toBeTruthy();
});

// test show all by
test('shows all by artist', () => {
  let output = processInput('show all by "Beastie Boys"');
  expect(output[0] === '"Licensed to Ill" by Beastie Boys (played)').toBeTruthy();
  expect(output[1] === '"Pauls Boutique" by Beastie Boys (unplayed)').toBeTruthy();
});

// test show unplayed by
test('shows unplayed by artist', () => {
  let output = processInput('show unplayed by "Beastie Boys"');
  expect(output[0] === '"Pauls Boutique" by Beastie Boys').toBeTruthy();
});

// test disallows duplicate album names
test('does not allow repeated album', () => {
  let output = processInput('add "The Dark Side of the Moon" "The Flaming Lips"');
  expect(output[0] === 'Whoops, an album by that name has already been entered.').toBeTruthy();
});
