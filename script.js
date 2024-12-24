/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play/pause button text
function updateButton() {
  if (video.paused) {
    toggle.textContent = '►'; // Play button
  } else {
    toggle.textContent = '❚ ❚'; // Pause button
  }
}

// Function to handle progress bar update
function handleProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

// Function to scrub the video (clicking on the progress bar to seek)
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Function to skip forward or backward in the video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to handle volume changes
function handleVolumeChange() {
  video.volume = this.value;
}

// Function to handle playback speed changes
function handlePlaybackSpeedChange() {
  video.playbackRate = this.value;
}

// Add event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', function() {
  if (range.name === 'volume') {
    handleVolumeChange.call(range);
  } else if (range.name === 'playbackRate') {
    handlePlaybackSpeedChange.call(range);
  }
}));

