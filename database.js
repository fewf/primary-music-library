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

module.exports = {artistToAlbums, albumsToArtistPlayed};
