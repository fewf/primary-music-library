const {artistToAlbums, albumsToArtistPlayed} = require('./database');

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

const SHOW_ALL_BY = 'show all by';
const SHOW_ALL = 'show all';
const SHOW_UNPLAYED_BY = 'show unplayed by';
const SHOW_UNPLAYED = 'show unplayed';
const ADD = 'add';
const PLAY = 'play';
const ARGUMENT = '"([\\w\\s]+)"';

module.exports = {
  commandRegExp: new RegExp(`^(${
    SHOW_ALL_BY}) ${ARGUMENT}|(${
    SHOW_ALL})|(${
    SHOW_UNPLAYED_BY}) ${ARGUMENT}|(${
    SHOW_UNPLAYED})|(${
    ADD}) ${ARGUMENT} ${ARGUMENT}|(${
    PLAY}) ${ARGUMENT}$`),
  commandToFunction: {
    [SHOW_ALL_BY]: showAll,
    [SHOW_ALL]: showAll,
    [SHOW_UNPLAYED_BY]: showUnplayed,
    [SHOW_UNPLAYED]: showUnplayed,
    [ADD]: add,
    [PLAY]: play
  }
}
