const albums = {
  // Object used as a dictionary mapping album name
  // to relevant data
  // album1: {artist: artist1, played: false}
};

const artists = {
  // Object used as a dictionary mapping artist name
  // to an array of albums. Although this could be derived
  // from the `albums` object by running:
  // artists = Object.keys(albums).reduce(
  //   (artists, album) => {
  //     if (artists[album.artist]) {
  //       artists[album.artist].push(album);
  //     } else {
  //       artists[album.artist] = [album];
  //     }
  //     return artists
  //   },
  //   {}
  // )
  // this will become an increasingly expensive operation. This way
  // it will run in constant time always.
  // artist1: [album1, album2]
};

module.exports = {artists, albums};
