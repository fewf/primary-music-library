const {artists, albums} = require('./database');

function add(album, artist) {
  if (albums[album]) {
    return ['Whoops, an album by that name has already been entered.'];
  }
  if (artists[artist]) {
    artists[artist].push(album);
  } else {
    artists[artist] = [album];
  }
  albums[album] = {
    artist,
    played: false
  };
  return [`Added "${album}" by ${artist}`];
}

function play(albumName) {
  let album = albums[albumName];
  if (!album) {
    return ['Uh oh, that album does not exist'];
  }
  album.played = true;
  return [`You're listening to "${albumName}"`];
}

function showAll(artist, unplayedOnly=false) {
  albumNames = artist ? artists[artist] : Object.keys(albums);
  const messages = albumNames.map(
    albumName => [albumName, albums[albumName]]
  ).filter(
    ([albumName, album]) => !unplayedOnly || !album.played
  ).map(([albumName, album]) => `"${
    albumName
  }" by ${
    artist || album.artist
  }${
    unplayedOnly ? '' : album.played ? ' (played)' : ' (unplayed)'
  }`);
  return messages;
}

function showUnplayed(artist) {
  return showAll(artist, unplayed=true);
}

const SHOW_ALL_BY = 'show all by';
const SHOW_ALL = 'show all';
const SHOW_UNPLAYED_BY = 'show unplayed by';
const SHOW_UNPLAYED = 'show unplayed';
const ADD = 'add';
const PLAY = 'play';
const ARGUMENT = '"([\\w\\s]+)"';

const commandRegExp = new RegExp(
  `^(${
  SHOW_ALL_BY}) ${ARGUMENT}|(${
  SHOW_ALL})|(${
  SHOW_UNPLAYED_BY}) ${ARGUMENT}|(${
  SHOW_UNPLAYED})|(${
  ADD}) ${ARGUMENT} ${ARGUMENT}|(${
  PLAY}) ${ARGUMENT}$`
);

const commandToFunction = {
  [SHOW_ALL_BY]: showAll,
  [SHOW_ALL]: showAll,
  [SHOW_UNPLAYED_BY]: showUnplayed,
  [SHOW_UNPLAYED]: showUnplayed,
  [ADD]: add,
  [PLAY]: play
};

function processInput(input) {
  match = input.match(commandRegExp);
  if (!match) {
    return ['Your input was not recognized, please try again.'];
  } else {
    // this filter gets around the fact that the match array is
    // given length equal to the full number of capture groups
    // in the regexp, setting the ones that were not matched to undefined
    match = match.filter(m => m !== undefined);
    return commandToFunction[match[1]](...match.slice(2));
  }
}

module.exports = processInput;
