const song = document.querySelector('.song');
const play = document.querySelector('.play_icon');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');
const sounds = document.querySelectorAll('.sound-selector button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');
const circleLength = outline.getTotalLength();

// song.loop = true;

// console.log(song.duration);

// console.log(song, play, outline, video, sounds, timeDisplay, timeSelect);

let defaultDuration = 300;

outline.style.strokeDasharray = circleLength;
outline.style.strokeDashoffset = circleLength;
// timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(
//   defaultDuration % 60
// )}`;

const player = function () {
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      //   song.ontimeupdate();
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //play on click
  play.addEventListener('click', function () {
    checkPlaying(song);
  });

  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      defaultDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(
        defaultDuration / 60
      )}:${Math.floor(defaultDuration % 60)}`;
    });
  });

  //.paused -> html media property, returns true or false
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './assets/img/pause2.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './assets/img/play2.svg';
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime; // aka 0
    let elapsedTime = defaultDuration - currentTime;

    function fmtMSS(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }

    // let minutes = Math.floor(elapsedTime / 60);
    // let seconds = Math.floor(elapsedTime - minutes * 60);

    //circle values for animation
    let progress =
      circleLength - (currentTime / defaultDuration) * circleLength;
    outline.style.strokeDashoffset = progress;
    //text values for animation
    timeDisplay.textContent = `${fmtMSS(Math.floor(elapsedTime))}`;

    if (currentTime >= defaultDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './assets/img/play2.svg';
      video.pause();
    }
  };
};

player();
