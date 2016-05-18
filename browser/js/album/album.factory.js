juke.factory('AlbumFactory', function ($http) {
  var obj = {
    fetchAll: function() {
      //var arrOfSongPromises = [];
      return $http.get('/api/albums/')
      .then(function (res) { 
          var arrOFAlbums = [];
          res.data.forEach(function(album, index){
            album.imageUrl = obj.getImage(album.id);
            obj.fetchById(album.id)
            .then(function(singleAlbum) {
              album.songCount = singleAlbum.songs.length;
              arrOFAlbums.push(album);
            });
          });
          return arrOFAlbums; 
      });

      

    },
    fetchById: function(id) {

      return $http.get('/api/albums/' + id)
      .then(function (res) { return res.data; })

    },

    getImage: function(albumID){
      return '/api/albums/' + albumID + '/image';
    }
  }
  return obj;
});