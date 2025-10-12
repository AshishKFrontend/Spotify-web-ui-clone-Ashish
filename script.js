/* Demo data (titles approximate to screenshot) */

const trending = [
  { 
    title: "Animal",
    sub: "Sachin-Jigar, Rashmeet Kaur, Amitabh",
    img: "animal.jpg",
    audio: "Arjan Vailly Ne.mp3",
  },
  { 
    title: "Apa Fer Milaange",
    sub: "Tanishk Bagchi, Arijit Singh",
    img: "Apa Fer Milaange(MP3_160K).jpg",
    audio: "Apa Fer Milaange(MP3_160K).mp3",
  },
  { 
    title: "Pehle Bhi Main",
    sub: "Yo Yo Honey Singh",
    img: "animal.jpg",
    audio: "Pehle Bhi Main.mp3",
  },
  { 
    title: "Jale 2",
    sub: "Sachin-Jigar, Rashmeet Kaur, Amitabh",
    img: "jale.jpg",
    audio: "Jale 2.mp3",
  },
  { 
    title: "THE LAST RIDE",
    sub: "Tanishk Bagchi, Arijit Singh",
    img: "THE LAST RIDE - Offical Video _  Sidhu Moose Wala _ Wazir Patar(MP3_160K).jpg",
    audio: "THE LAST RIDE - Offical Video _  Sidhu Moose Wala _ Wazir Patar(MP3_160K).mp3",
  },
  { 
    title: "Ram Siya Ram",
    sub: "Yo Yo Honey Singh",
    img: "ram.jpg",
    audio: "Ram Siya Ram.mp3",
  }
];

const artists = [
  { name: "Pritam", role: "Artist", color: "#c75b5b", img: "Pritam.jpg" },
  { name: "A.R. Rahman", role: "Artist", color: "#4aa1ff", img: "A.R. Rahman.jpg" },
  { name: "Arijit Singh", role: "Artist", color: "#ffb86b", img: "Arijit Singh.jpg" },
  { name: "Sachin-Jigar", role: "Artist", color: "#9cefa8", img: "Sachin-Jigar.jpg" },
  { name: "Vishal-Shekhar", role: "Artist", color: "#d6d6d6", img: "Vishal-Shekhar.jpg" },
];

const albums = [
  { title: "Finding Her", sub: "OST", color: "#74b159", img: "1.jpg" },
  { title: "Young Heart", sub: "Single", color: "#f2a1a1", img: "2.jpg" },
  { title: "Soundtracks Vol. 1", sub: "Compilation", color: "#8db4ff", img: "3.jpg" },
  { title: "Bollywood Classics", sub: "Playlist", color: "#ffdf6b", img: "4.jpg" },
  { title: "Modern Love", sub: "Single", color: "#c08cff", img: "5.jpg" },
  { title: "Evening Melodies", sub: "Album", color: "#8ad5d5", img: "6.jpg" },
];


document.addEventListener('DOMContentLoaded', () => {
  /* Build trending song cards */
  const trendingRow = document.getElementById('trendingRow');
  trending.forEach((t, idx) => {
    const div = document.createElement('div');
    div.className = 'track-card';
    div.innerHTML = `
      <div class="cover" data-index="${idx}">
        <div class="art" style="background-image:url('${t.img}'); background-size:cover; background-position:center;"></div>
        <div class="play-overlay" role="button" aria-label="Play preview">
          <div class="circle" data-action="play" data-type="track" data-index="${idx}">▶</div>
        </div>
      </div>
      <div class="track-info">
        <div class="track-title">${t.title}</div>
        <div class="track-sub">${t.sub}</div>
      </div>
    `;
    trendingRow.appendChild(div);
  });

  /* Build artists row */
  const artistsRow = document.getElementById('artistsRow');
  artists.forEach((a, idx) => {
    const div = document.createElement('div');
    div.className = 'artist-card';
    div.innerHTML = `
      <div class="artist-avatar" data-index="${idx}">
        <img alt="${a.name}" src="${a.img}" />
        <div class="play-small">
          <div class="circle" data-action="play" data-type="artist" data-index="${idx}" style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,var(--accent),#0fa44b);color:white">▶</div>
        </div>
      </div>
      <div class="artist-name">${a.name}</div>
      <div class="artist-role">${a.role}</div>
    `;
    artistsRow.appendChild(div);
  });

  /* Build albums grid */
  const albumsGrid = document.getElementById('albumsGrid');
  albums.forEach((al) => {
    const div = document.createElement('div');
    div.className = 'album-card';
    div.innerHTML = `
      <div class="album-art" style="background-image:url('${al.img}'); background-size:cover; background-position:center;">
          <div class="play-overlay" role="button" aria-label="Play album/single">
              <div class="circle" style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:white;opacity:0;" data-action="play" data-type="album">▶</div>
          </div>
      </div>
      <div class="album-title">${al.title}</div>
      <div class="album-sub">${al.sub}</div>
    `;
    albumsGrid.appendChild(div);
  });

  /* ---------------- Real Audio Player System ---------------- */
  let currentAudio = null;
  const miniTitle = document.getElementById('miniTitle');
  const miniSub = document.getElementById('miniSub');
  const miniArt = document.getElementById('miniArt');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBarFill = document.getElementById('progressBarFill');

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="play"]');
    if (btn) {
      const type = btn.getAttribute('data-type');
      const index = Number(btn.getAttribute('data-index'));
      if (type === 'track') {
        playPreview('track', index);
      }
    }
  });

  function playPreview(kind, index) {
    const song = trending[index];

    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    currentAudio = new Audio(song.audio);
    currentAudio.play();

    miniTitle.textContent = song.title;
    miniSub.textContent = song.sub;
    miniArt.style.backgroundImage = `url('${song.img}')`;
    miniArt.style.backgroundSize = "cover";
    miniArt.style.backgroundPosition = "center";
    playPauseBtn.textContent = "⏸️";

    currentAudio.addEventListener("timeupdate", () => {
      const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
      progressBarFill.style.width = `${pct}%`;
    });

  currentAudio.addEventListener("ended", () => {
      lastPlayedIndex = (lastPlayedIndex + 1) % trending.length; 
      playPreview('track', lastPlayedIndex); 
    });
  }

  playPauseBtn.addEventListener("click", () => {
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        playPauseBtn.textContent = "⏸️";
      } else {
        currentAudio.pause();
        playPauseBtn.textContent = "▶️";
      }
    } else {
      playPreview('track', 0);
    }
  });

  let lastPlayedIndex = 0;
  prevBtn.addEventListener('click', () => {
    lastPlayedIndex = (lastPlayedIndex - 1 + trending.length) % trending.length;
    playPreview('track', lastPlayedIndex);
  });
  nextBtn.addEventListener('click', () => {
    lastPlayedIndex = (lastPlayedIndex + 1) % trending.length;
    playPreview('track', lastPlayedIndex);
  });

  // create playlist button (demo)
  document.getElementById('createPlaylistBtn').addEventListener('click', ()=> {
    alert('Playlist created (demo). Replace with your logic.');
  });

  // accessibility (keyboard play)
  document.addEventListener('keydown', (e)=>{
    if (e.key === ' ' || e.key === 'Enter'){
      const focused = document.activeElement;
      if (focused && focused.dataset && focused.dataset.action === 'play'){
        focused.click();
        e.preventDefault();
      }
    }
  });

  document.querySelectorAll('[data-action="play"]').forEach(el => {
    el.setAttribute('tabindex','0');
    el.style.cursor='pointer';
  });
});