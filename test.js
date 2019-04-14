const processInput = require('./commands');
const {artistToAlbums, albumsToArtistPlayed} = require('./database');

function assertTrue(assertion) {
  if (assertion) {
    console.log("pass");
  } else {
    console.trace();
    throw "Assertion not true";
  }
}

let output;
output = processInput('add "Ride the Lightning" "Metallica"');
assertTrue(output.length === 1);
assertTrue(output[0]) === 'added "Ride the Lightning" by Metallica';
assertTrue(artistToAlbums.Metallica[0] === 'Ride the Lightning');
assertTrue(albumsToArtistPlayed['Ride the Lightning'].artist === 'Metallica');
assertTrue(!albumsToArtistPlayed['Ride the Lightning'].played);

processInput('add "Licensed to Ill" "Beastie Boys"');
assertTrue(artistToAlbums['Beastie Boys'][0] === 'Licensed to Ill');
assertTrue(albumsToArtistPlayed['Licensed to Ill'].artist === 'Beastie Boys');
assertTrue(!albumsToArtistPlayed['Licensed to Ill'].played);

processInput('add "Pauls Boutique" "Beastie Boys"');
assertTrue(artistToAlbums['Beastie Boys'][1] === 'Pauls Boutique');
assertTrue(albumsToArtistPlayed['Pauls Boutique'].artist === 'Beastie Boys');
assertTrue(!albumsToArtistPlayed['Pauls Boutique'].played);

processInput('add "The Dark Side of the Moon" "Pink Floyd"');
assertTrue(artistToAlbums['Pink Floyd'][0] === 'The Dark Side of the Moon');
assertTrue(albumsToArtistPlayed['The Dark Side of the Moon'].artist === 'Pink Floyd');
assertTrue(!albumsToArtistPlayed['The Dark Side of the Moon'].played);

output = processInput('show all');
assertTrue(output.length === 4);
assertTrue(output[0] === '"Ride the Lightning" by Metallica (unplayed)');
assertTrue(output[1] === '"Licensed to Ill" by Beastie Boys (unplayed)');
assertTrue(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)');
assertTrue(output[3] === '"The Dark Side of the Moon" by Pink Floyd (unplayed)');

output = processInput('play "Licensed to Ill"');
assertTrue(output.length === 1);
assertTrue(output[0] === 'You\'re listening to "Licensed to Ill"');
assertTrue(albumsToArtistPlayed['Licensed to Ill'].played);

output = processInput('play "The Dark Side of the Moon"');
assertTrue(output.length === 1);
assertTrue(output[0] === 'You\'re listening to "The Dark Side of the Moon"');
assertTrue(albumsToArtistPlayed['The Dark Side of the Moon'].played);

output = processInput('show all');
assertTrue(output.length === 4);
assertTrue(output[0] === '"Ride the Lightning" by Metallica (unplayed)');
assertTrue(output[1] === '"Licensed to Ill" by Beastie Boys (played)');
assertTrue(output[2] === '"Pauls Boutique" by Beastie Boys (unplayed)');
assertTrue(output[3] === '"The Dark Side of the Moon" by Pink Floyd (played)');

output = processInput('show unplayed');
assertTrue(output[0] === '"Ride the Lightning" by Metallica');
assertTrue(output[1] === '"Pauls Boutique" by Beastie Boys');

output = processInput('show all by "Beastie Boys"');
assertTrue(output[0] === '"Licensed to Ill" by Beastie Boys (played)');
assertTrue(output[1] === '"Pauls Boutique" by Beastie Boys (unplayed)');

output = processInput('show unplayed by "Beastie Boys"');
assertTrue(output[0] === '"Pauls Boutique" by Beastie Boys');

output = processInput('add "The Dark Side of the Moon" "The Flaming Lips"');
assertTrue(output[0] === 'Whoops, an album by that name has already been entered.');
