const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");

const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

const songs = [
  {
    title: "Phir Se Ud Chala",
    name: "Mohit Chauhan",
    source: "https://github.com/harshshallya/songs/raw/main/psuc.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Rockstar_%28soundtrack%29.jpg/220px-Rockstar_%28soundtrack%29.jpg",
  },
  {
    title: "Kya Hua Tera Wada",
    name: "Kishore Kumar",
    source: "https://github.com/harshshallya/songs/raw/main/128-Kya%20Hua%20Tera%20Vada%20-%20Hum%20Kisise%20Kum%20Naheen%20128%20Kbps.mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Kya_Hua_Tera_Vaada.jpg/220px-Kya_Hua_Tera_Vaada.jpg",
  },
  {
    title: "Aankhon Se Batana",
    name: "Dikshant",
    source: "https://github.com/harshshallya/songs/raw/main/Aankhon%20Se%20Batana_320(PagalWorld.com.sb).mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Gangastas Paradise",
    name: "Coolio x L.V",
    source: "https://github.com/harshshallya/songs/raw/main/Gangstas-Paradise(Pagal-World.Com.In).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Coolio_-_Gangsta%27s_Paradise.jpg/220px-Coolio_-_Gangsta%27s_Paradise.jpg",
  },
  {
    title: "Ranvijay Entry Medley",
    name: "A.R.Rahaman",
    source: "https://github.com/harshshallya/songs/raw/main/Ranvijay%20Entry%20Medley_320(PagalWorld.com.so).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Animal_Soundtrack_Album_Cover.jpg/220px-Animal_Soundtrack_Album_Cover.jpg",
  },
  {
    title: "Way Down We Go",
    name: "Kaleo",
    source: "https://github.com/harshshallya/songs/raw/main/Way-Down-We-Go(PagalNew.Com.Se).mp3",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a1/KaleoWayDownWeGo.jpg",
  },
];

let currentSongIndex = 0;

function startRotation() {
  if (!rotating) {
    rotating = true;
    rotationInterval = setInterval(rotateImage, 50);
  }
}

function pauseRotation() {
  clearInterval(rotationInterval);
  rotating = false;
}

function rotateImage() {
  currentRotation += 1;
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  rotatingImage.src = songs[currentSongIndex].cover;

  song.addEventListener("loadeddata", function () {});
}

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    pauseRotation();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  startRotation();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 100,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    click(swiper) {
      currentSongIndex = swiper.clickedIndex;
      updateSongInfo();
      playPause();
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
document.addEventListener('DOMContentLoaded', function() {
    const songElements = document.querySelectorAll('.recommended-songs .song');
    const audioElement = document.getElementById('song');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const albumCover = document.getElementById('rotatingImage');
  
    songElements.forEach(song => {
      song.addEventListener('click', function() {
        const songUrl = this.getAttribute('data-song-url');
        const songTitle = this.querySelector('.song-title h2').textContent;
        const songArtist = this.querySelector('.song-title p').textContent;
  
        // Update the audio source and player details
        audioElement.src = songUrl;
        playerTitle.textContent = songTitle;
        playerArtist.textContent = songArtist;
  
        // Optionally, trigger the audio to start playing
        audioElement.play();
  
        // Optionally, update the album cover image
        // albumCover.src = this.querySelector('.song-img img').src;
      });
    });
  });

  // Select all song elements in the recommended list
  
  // Select all song elements in the recommended list
  const songElements = document.querySelectorAll('.song');

  // Music player elements
  const playerImage = document.getElementById('rotatingImage');
  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const audioElement = document.getElementById('song');
  const controlIcon = document.getElementById('controlIcon'); // Play/Pause button icon
  
  // Track if the song is currently playing
  let isPlaying = false;

  songElements.forEach((song) => {
    song.addEventListener('click', () => {
      // Get the data attributes from the clicked song
      const songUrl = song.getAttribute('data-song-url');
      const songTitle = song.getAttribute('data-song-title');
      const songArtist = song.getAttribute('data-song-artist');
      const songImg = song.getAttribute('data-song-img');
      
      // Update the music player with the clicked song's details
      playerImage.src = songImg;
      playerTitle.textContent = songTitle;
      playerArtist.textContent = songArtist;
      audioElement.querySelector('source').src = songUrl;
      audioElement.load(); // Load the new song

      // Play the song and start rotating the image
      audioElement.play();
      isPlaying = true;
      controlIcon.classList.remove('fa-play');
      controlIcon.classList.add('fa-pause');
      playerImage.classList.add('rotating');
    });
  });

  // Play/pause button event listener
  document.querySelector('.play-pause-btn').addEventListener('click', () => {
    if (isPlaying) {
      audioElement.pause();
      isPlaying = false;
      controlIcon.classList.remove('fa-pause');
      controlIcon.classList.add('fa-play');
      playerImage.classList.remove('rotating');
    } else {
      audioElement.play();
      isPlaying = true;
      controlIcon.classList.remove('fa-play');
      controlIcon.classList.add('fa-pause');
      playerImage.classList.add('rotating');
    }
  });

  // Update the rotation when the song is manually paused/played
  audioElement.addEventListener('play', () => {
    playerImage.classList.add('rotating');
  });

  audioElement.addEventListener('pause', () => {
    playerImage.classList.remove('rotating');
  });
  
  const currentTimeElement = document.getElementById("current-time");
  const durationElement = document.getElementById("duration");
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;
    rotatingImage.src = songs[currentSongIndex].cover;
  
    song.addEventListener("loadeddata", function () {
      durationElement.textContent = formatTime(song.duration);
    });
  }
  
  song.addEventListener("loadedmetadata", function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationElement.textContent = formatTime(song.duration);
  });
  
  song.addEventListener("ended", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
  });
  
  song.addEventListener("timeupdate", function () {
    if (!song.paused) {
      progress.value = song.currentTime;
      currentTimeElement.textContent = formatTime(song.currentTime);
    }
  });
  
  function playPause() {
    if (song.paused) {
      song.play();
      controlIcon.classList.add("fa-pause");
      controlIcon.classList.remove("fa-play");
      startRotation();
    } else {
      song.pause();
      controlIcon.classList.remove("fa-pause");
      controlIcon.classList.add("fa-play");
      pauseRotation();
    }
  }
  
  playPauseButton.addEventListener("click", playPause);
  
  progress.addEventListener("input", function () {
    song.currentTime = progress.value;
  });
  
  progress.addEventListener("change", function () {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  });
  
  forwardButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
  });
  
  backwardButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
  });
  
  updateSongInfo();
  
