const {promptReader, closePromptReader} = require('./promptReader');
const SHOW_ALL_BY = 'show all by';
const SHOW_ALL = 'show all';
const SHOW_UNPLAYED_BY = 'show unplayed by';
const SHOW_UNPLAYED = 'show unplayed';
const ADD = 'add';
const PLAY = 'play';
const ARGUMENT = '"([\\w\\s]+)"';

const commandRegExp = new RegExp(`^(${
  SHOW_ALL_BY}) ${ARGUMENT}|(${
  SHOW_ALL})|(${
  SHOW_UNPLAYED_BY}) ${ARGUMENT}|(${
  SHOW_UNPLAYED})|(${
  ADD}) ${ARGUMENT} ${ARGUMENT}|(${
  PLAY}) ${ARGUMENT}$`);

const commandToFunction = {
  [SHOW_ALL_BY]: showAll,
  [SHOW_ALL]: showAll,
  [SHOW_UNPLAYED_BY]: showUnplayed,
  [SHOW_UNPLAYED]: showUnplayed,
  [ADD]: add,
  [PLAY]: play
}

function add(album, artist) {
  if (albumsToArtistPlayed[album]) {
    console.log('Whoops, an album by that name has already been entered.')
    return false;
  }
  if (artistToAlbums[artist]) {
    artistToAlbums[artist].push(album);
  } else {
    artistToAlbums[artist] = [album];
  }
  albumsToArtistPlayed[album] = {
    artist,
    played: false
  };
  console.log(`Added "${album}" by ${artist}`);
  return true;
}

function play(albumName) {
  let album = albumsToArtistPlayed[albumName];
  if (!album) {
    console.log('Uh oh, that album does not exist');
    return false;
  }
  album.played = true;
  console.log(`You're listening to ${albumName}.`);
  return true;
}

function showAll(artist, unplayedOnly=false) {
  albumNames = artist ? artistToAlbums[artist] : Object.keys(albumsToArtistPlayed);
  albumNames.map(
    albumName => [albumName, albumsToArtistPlayed[albumName]]
  ).forEach(([albumName, album]) => unplayedOnly && album.played ? null : console.log(`"${
    albumName
  }" by ${
    artist || album.artist
  } (${
    album.played ? 'played' : 'unplayed'
  })`));
  return true;
}

function showUnplayed(artist) {
  showAll(artist, unplayed=true);
}

const artistToAlbums = {
  // initialized as an empty object, this will be filled
  // such that it maps artist name to an object that maps from
  // artist1: [album1, album2]
};

const albumsToArtistPlayed = {
  // initialized as an empty array, this will just keep track of
  // albums entered (denoted by occupying a key in the object)
  // even though that could be derived by running
  // Object(artistToAlbums).values().reduce((agg, item) => [...agg, ...item], [])
  // that would become an increasingly expensive operation.
  // the value of the key will be equal to whether it's been played
  // album1: {artist: artist1, played: false}
};

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
