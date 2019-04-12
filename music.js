const {promptReader, closePromptReader} = require('./promptReader');
const SHOW_ALL_BY = 'show all by';
const SHOW_ALL = 'show all';
const SHOW_UNPLAYED_BY = 'show unplayed by';
const SHOW_UNPLAYED = 'show unplayed';
const ADD = 'add';
const PLAY = 'play';
const ARGUMENT = '"([\\w\\s]+)"';

const regex = new RegExp(`^(${
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
  albumsToArtistPlayed[album] = [artist, false];
  console.log(`Added "${album}" by ${artist}`);
  return true;
}

function play(album) {
  if (!albumsToArtistPlayed.hasOwnProperty(album)) {
    console.log('Uh oh, that album does not exist');
    return false;
  }
  albumsToArtistPlayed[album][1] = true;
  console.log(`You're listening to ${album}.`);
  return true;
}

function showAll(artist, unplayed) {
  albums = artist ? artistToAlbums[artist] : Object.keys(albumsToArtistPlayed);
  albums.map(album => unplayed && albumsToArtistPlayed[album][1] ? null : console.log(`"${
    album
  }" by ${
    artist || albumsToArtistPlayed[album][0]
  } (${
    albumsToArtistPlayed[album][1] ? 'played' : 'unplayed'
  })`));
  return true;
}

function showUnplayed(artist) {
  showAll(artist, true);
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
  // album1: [artist1, false]
};

async function main() {
  console.log('Welcome to your music library!');
  let match;
  let promptInput = await promptReader();
  while (promptInput !== 'quit') {
    match = promptInput.match(regex);
    if (!match) {
      console.log('Your input was not recognized, please try again.');
    } else {
      match = match.filter(x => x !== undefined);
      commandToFunction[match[1]](...match.slice(2));
    }
    promptInput = await promptReader();
  }
  console.log('Bye!');
  closePromptReader();
}

main();
