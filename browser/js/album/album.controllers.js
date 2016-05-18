'use strict';
juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  AlbumFactory.fetchById(1)
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;

  return StatsFactory.totalTime(album)    
  }).then(function(dur) {
    console.log(dur);
    $scope.duration = dur;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound


  // main toggle
  $scope.toggle = function (song, listOSongs) {
    if (PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong().id === song.id) {
      PlayerFactory.pause()
      //$rootScope.$broadcast('pause'); 
    }
    else if(!PlayerFactory.isPlaying() && PlayerFactory.previousSong && PlayerFactory.previousSong.id === song.id){
      PlayerFactory.resume();
    }
    else
    {
      PlayerFactory.start(song, listOSongs);
    }
    $scope.playing = PlayerFactory.isPlaying();
    $scope.currentSong = PlayerFactory.getCurrentSong();
  };

  $scope.thisSongPlayingDawg = function(song){
    return PlayerFactory.getCurrentSong() && PlayerFactory.getCurrentSong().id === song.id 
  }
});
