(function () {
$(document).ready(() => {

  const player = $('#video')[0];
  const playerContainer = $('.player')

  let eventsInit = () => {

    $('.player__playback').on('click', (e) => {
      e.preventDefault();

      if (playerContainer.hasClass('playing')) {
        player.pause();
      } else {
        player.play();
      }
    })


    $('.player__timeline').on('click', (e) => {
      const bar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
      const newPlayBackPositionSec = (player.duration / 100) * newButtonPositionPercent;

      $('.player__timeline-point').css({
        left: `${newButtonPositionPercent}%`
      });

      player.currentTime = newPlayBackPositionSec;
    });


    $('#video').on('click', (e) => {
      if (playerContainer.hasClass('playing')) {
        player.pause();
      } else {
        player.play();
      }
    });


    $('#video').on('play', () => {
      playerContainer.addClass('playing');

      let interval;
      const durationSec = player.duration;

      if (typeof (interval) != 'undefined') {
        clearInterval(interval);
      };

      interval = setInterval(() => {
        const completedSec = player.currentTime;
        const completedPercent = (completedSec / durationSec) * 100;

        $('.player__timeline-point').css({
          left: `${completedPercent}%`
        })
      }, 1000);
    });

    $('#video').on('pause', () => {
      playerContainer.removeClass('playing');
    });

    $('.player__volume-btn').on('click', (e) => {
      e.preventDefault();

      video.muted = !video.muted;
      $('.player__volume-btn').toggleClass('muted');
    })

    $('.player__volume-line').on('click', (e) => {
      const volBar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      const newButtonPositionPercent = (clickedPosition / volBar.width()) * 100;
      const newVolume = newButtonPositionPercent / 100;

      $('.player__volume-point').css({
        left: `${newButtonPositionPercent}%`
      });

      player.volume = newVolume;
    });
    
    $('#video').on('volumechange', (e) => {
      currentVolume = e.target.volume;
      newButtonPositionPercent = currentVolume * 100;

      $('.player__volume-point').css({
        left: `${newButtonPositionPercent}%`
      });
    });

    $('#video').on('play', (e) => {
      currentVolume = e.target.volume;
      newButtonPositionPercent = currentVolume * 100;

      $('.player__volume-point').css({
        left: `${newButtonPositionPercent}%`
      });
    });
  }
  eventsInit();
})

}());