'use strict';
juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function(albums){
    
    $scope.albums = albums; 
  })
});