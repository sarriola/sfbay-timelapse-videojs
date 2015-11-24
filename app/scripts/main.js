console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
/*global videojs*/

var videoTimelapse = {

    
  playerInitSetup: function(baseurl) {

    videoTimelapse.baseURL = baseurl;
    videoTimelapse.vjplayer = videojs('myElement', {
      'controlBar': {
        'playToggle': false,
        'volumeMenuButton': false
      }
    });

    videoTimelapse.vjplayer.ready(function(){
      this.src(baseurl+'movies/today.mp4');
//      this.poster('poster2.png');
    });
  },

  calendarPlaylist: function() {
    $('#pickDate').datepicker({
      startDate: '5/22/2015',
      endDate: '0d',
      todayHighlight: 'true'
    }).on('changeDate', function(ev) {
      var todaysDate = new Date();
      var movieFilename = 'today.mp4';
      var buttonDateLabel = 'Today';
      if ( ev.date.toDateString() !== todaysDate.toDateString() ) {
        movieFilename = ev.date.toDateString().slice(4,15).replace(/ /g,'_')+'.mp4';
        buttonDateLabel = ev.date.toDateString();
      }
      var output = buttonDateLabel +
        '<span class="glyphicon glyphicon-play pull-right"></span>';
      $('#currentmovie').html(output);
      videoTimelapse.vjplayer.src(videoTimelapse.baseURL + 'movies/' + movieFilename );
//      videoTimelapse.vjplayer.play();
    });
  },

  playlistEventSetup: function() {
    var buttonChangeTo = function(glypicon) {
      var theButton = $('#currentmovie');
      theButton.find('span').remove();
      theButton.append('<span class="glyphicon glyphicon-' + glypicon + ' pull-right"></span>');
    };

    videoTimelapse.vjplayer.on('ended',function() {
      buttonChangeTo('repeat');
//      this.posterImage.show();
    });

    videoTimelapse.vjplayer.on('seeking', function() {
      buttonChangeTo('play');
      this.play();
    });

    videoTimelapse.vjplayer.on('playing', function() {
      buttonChangeTo('pause');
    });

    videoTimelapse.vjplayer.on('pause', function() {
      buttonChangeTo('play');
    });

    videoTimelapse.vjplayer.on('fullscreenchange', function() {
      console.log('clicked fullscreen'); // eslint-disable-line no-console
    });
 
    $(document).on('click', '.list-group-item', function(){
      if (videoTimelapse.vjplayer.paused()) {
        videoTimelapse.vjplayer.play();
        buttonChangeTo('pause');
      } else {
        videoTimelapse.vjplayer.pause();
        buttonChangeTo('play');
      }
    });
  }

}

//  Pass blank quotes for locally hosted files or full path to parent directory with a movies subdirectory 
videoTimelapse.playerInitSetup('/cam/');
videoTimelapse.calendarPlaylist();
videoTimelapse.playlistEventSetup();

