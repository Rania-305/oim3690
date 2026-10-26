// Grab references to DOM elements
const form = document.getElementById('song-form');
const input = document.getElementById('song-input');
const artistInput = document.getElementById('artist-input');
const resultText = document.getElementById('');
const playlistList = document.getElementById('playlist-list');
const shuffleButton = document.getElementById('shuffle-button');

const songs = [
    { title: 'Ima Boss', artist: 'Meek Mill (feat. Rick Ross)' },
    { title: 'expectations', artist: 'Olivia Rodrigo' },
    { title: 'It Was a Good Day', artist: 'Ice Cube' },
    { title: 'Lover Girl', artist: 'Laufey' },
    { title: 'All Falls Down', artist: 'Kanye West' },
];

function renderSongs() {
    playlistList.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');

        const songText = document.createElement('span');
        songText.textContent = `${song.title} — ${song.artist}`;

        if (song.title.includes('Remix')) {
            songText.textContent += ' (Remix)';
        }

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-button';
        removeButton.textContent = '×';
        removeButton.setAttribute('aria-label', 'Remove song');
        removeButton.addEventListener('click', () => {
            const confirmed = confirm(`Remove "${song.title}" from the playlist?`);

            if (confirmed) {
                songs.splice(index, 1);
                renderSongs();
            }
        });

        li.appendChild(songText);
        li.appendChild(removeButton);
        playlistList.appendChild(li);
    });
}

function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    renderSongs();
}

function handleLogic() {
    const title = input.value.trim();
    const artist = artistInput.value.trim();

    if (title === '' || artist === '') {
        alert('Please enter both a song title and an artist.');
        return;
    }

    const isDuplicate = songs.some((song) => song.title.toLowerCase() === title.toLowerCase());

    if (isDuplicate) {
        alert(`"${title}" is already in the playlist.`);
        return;
    }

    songs.push({ title, artist });
    renderSongs();
    input.value = '';
    artistInput.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    handleLogic();
});

shuffleButton.addEventListener('click', shuffleSongs);

renderSongs();
