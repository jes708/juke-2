'use strict';

juke.factory('PlayerFactory', function(){
  var currentSong = document.createElement('audio');
  var audioObject;
  var listOfSongs;
  // var playing;
  var obj = {
    playing: false,
    previousSong: null,
    start: function(audioObj, songList) {
      audioObject = audioObj;
      listOfSongs = songList;
      if (!currentSong.src.length) obj.pause();
      currentSong.src = audioObj.audioUrl
      currentSong.load();
      currentSong.play();
      obj.playing = true;
    },
    pause: function() {
      currentSong.pause();
      obj.playing = false;
      obj.previousSong = audioObject;
    },
    resume: function() {
      currentSong.play()
      obj.playing = true;
    },
    isPlaying: function() {
      return obj.playing;
    },
    getCurrentSong: function() {
      if (!currentSong.src.length) return null;
      return audioObject;
    },
    next: function() {
      var index = listOfSongs.indexOf(audioObject) + 1;
      if (!listOfSongs[index]) index = 0;
      obj.start(listOfSongs[index], listOfSongs)
    },
    previous: function() {
      var index = listOfSongs.indexOf(audioObject) - 1;
      if (!listOfSongs[index]) index = listOfSongs.length - 1;
      obj.start(listOfSongs[index], listOfSongs)
    },
    getProgress: function() {
      if (!currentSong.src.length) return 0;
      return currentSong.currentTime / currentSong.duration
    }
  }
  return obj;
});
