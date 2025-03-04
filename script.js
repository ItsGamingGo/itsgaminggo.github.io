let currentSongIndex = 0;
let isPlaying = false;
const songs = ["Song 1", "Song 2", "Song 3"];
const playlists = {};

function playSong(songName) {
    currentSongIndex = songs.indexOf(songName);
    document.getElementById("now-playing").innerText = "Now Playing: " + songName;
    isPlaying = true;
}

function togglePlayPause() {
    isPlaying = !isPlaying;
    document.querySelector(".controls button:nth-child(2)").innerText = isPlaying ? "⏸" : "▶️";
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

function searchSong() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = "";
    songs.filter(song => song.toLowerCase().includes(query)).forEach(song => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerText = song;
        div.onclick = () => playSong(song);
        resultsDiv.appendChild(div);
    });
}

function createPlaylist() {
    const name = document.getElementById("playlist-name").value;
    if (name && !playlists[name]) {
        playlists[name] = [];
        updatePlaylistUI();
    }
}

function addSongToPlaylist(songName, playlistName) {
    if (playlists[playlistName] && !playlists[playlistName].includes(songName)) {
        playlists[playlistName].push(songName);
        updatePlaylistUI();
    }
}

function updatePlaylistUI() {
    const playlistDiv = document.getElementById("playlists");
    playlistDiv.innerHTML = "";
    Object.keys(playlists).forEach(name => {
        const div = document.createElement("div");
        div.className = "playlist";
        div.innerText = name;
        div.onclick = () => openPlaylist(name);
        playlistDiv.appendChild(div);
    });
}

function openPlaylist(name) {
    const playlistDiv = document.getElementById("playlists");
    playlistDiv.innerHTML = `<h2>${name}</h2>`;
    playlists[name].forEach(song => {
        const div = document.createElement("div");
        div.className = "song";
        div.innerText = song;
        div.onclick = () => playSong(song);
        playlistDiv.appendChild(div);
    });
}
