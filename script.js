const audio = document.getElementById('audio');
const audioSource = document.getElementById('audioSource');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const songSelect = document.getElementById('songSelect');
const progressBar = document.getElementById('progress');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');
const queueDisplay = document.getElementById('queueDisplay');
const queueList = document.getElementById('queueList');

let isPlaying = false;
let queue = [];
let currentSongIndex = -1;

function loadSong(songUrl) {
  audioSource.src = songUrl;
  audio.load();
}

function playSong() {
  audio.play();
  playPauseBtn.textContent = 'Pause';
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playPauseBtn.textContent = 'Play';
  isPlaying = false;
}

function stopSong() {
  audio.pause();
  audio.currentTime = 0;
  playPauseBtn.textContent = 'Play';
  isPlaying = false;
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
}

function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex >= queue.length) {
    currentSongIndex = 0; // Loop back to the beginning of the queue
  }
  loadSong(queue[currentSongIndex]);
  playSong();
}

function playPreviousSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = queue.length - 1; // Go to the last song in the queue
  }
}
