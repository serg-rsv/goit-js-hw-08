import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

function onTimeUpdate(e) {
  localStorage.setItem(CURRENT_TIME_KEY, e.seconds);
}

player.setCurrentTime(
  localStorage.getItem(CURRENT_TIME_KEY) ? localStorage.getItem(CURRENT_TIME_KEY) : 0,
);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
